/**
 * Knight Rider - Leaderboard Logic
 * Handles communication with Google Apps Script backend
 */

const LEADERBOARD_CONFIG = {
    url: 'https://script.google.com/macros/s/AKfycbxsiA6sGvHUupZTgYirJaurygBdG3cqvGS2JU3ib5vg6UGLc4vqoYs3vXxcHw5__BbX/exec',
    sheet: 'KnightRider_Leaderboard'
};

// Cache for leaderboard entries
let allLeaderboardEntries = [];

// Track the last saved entry to highlight it
let lastSavedEntry = null;

// Did the last load fail? (used for the empty state message)
let leaderboardLoadFailed = false;

// Initialize filter listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            setActiveFilter(pill.dataset.filter);
            filterAndRenderLeaderboard(pill.dataset.filter);
        });
    });
});

/**
 * Mark the active filter pill
 */
function setActiveFilter(filterMode) {
    document.querySelectorAll('.filter-pill').forEach(pill => {
        const isActive = pill.dataset.filter === filterMode;
        pill.classList.toggle('is-active', isActive);
        pill.setAttribute('aria-pressed', String(isActive));
    });
}

/**
 * Filter and re-render leaderboard
 */
function filterAndRenderLeaderboard(filterMode) {
    let filtered = allLeaderboardEntries;

    if (filterMode === 'speedrun') {
        filtered = filtered.filter(entry => String(entry.difficulty || entry.mode || '').toLowerCase() === 'speedrun');
    } else if (filterMode === 'normal') {
        filtered = filtered.filter(entry => String(entry.difficulty || entry.mode || '').toLowerCase() === 'normal');
    }

    renderLeaderboard(filtered);
}

/**
 * Load leaderboard entries
 */
async function loadLeaderboard() {
    try {
        const url = `${LEADERBOARD_CONFIG.url}?sheet=${LEADERBOARD_CONFIG.sheet}`;
        const response = await fetch(url);
        const data = await response.json();
        const entries = data.entries || [];

        allLeaderboardEntries = entries;
        leaderboardLoadFailed = false;

        // Reset filter
        setActiveFilter('');

        return entries;
    } catch (error) {
        console.error("Fehler beim Laden der Bestenliste:", error);
        leaderboardLoadFailed = true;
        return [];
    }
}

/**
 * Save a new highscore
 * Columns: Name, Score, Moves, Mode, Date
 */
async function saveHighscore(name, score, moves, mode) {
    const params = new URLSearchParams({
        action: 'add',
        sheet: LEADERBOARD_CONFIG.sheet,
        name: name,
        score: score,
        moves: moves,
        difficulty: mode // Using 'difficulty' param for compatibility with existing backend
    });

    try {
        await fetch(`${LEADERBOARD_CONFIG.url}?${params}`, {
            method: 'GET',
            mode: 'cors'
        });

        // Track the saved entry for highlighting
        lastSavedEntry = {
            name: name,
            score: score,
            mode: mode,
            timestamp: Date.now()
        };

        return true;
    } catch (error) {
        console.error("Fehler beim Speichern:", error);
        return false;
    }
}

/**
 * Show score visualization (result card above the leaderboard)
 */
function showScoreVisualization(mode, moves, finalScore, details = '', extra = {}) {
    const calcDiv = document.getElementById('score-calculation');
    if (!calcDiv) return;

    const outcome = extra.outcome || 'win';
    const modeEmoji = mode === 'Speedrun' ? '⏱️' : '🎯';
    const headlines = {
        win: '🚽 Ziel erreicht – dein Score',
        partialWin: '🥈 Starke Tour – dein Score',
        lose: '💩 Tour beendet – dein Score'
    };

    const fieldsChip = extra.visitable
        ? `<span class="chip">💩 ${extra.visited}/${extra.visitable} Felder</span>`
        : '';
    const bonusChip = extra.bonus
        ? `<span class="chip chip--bonus">⚡ +${extra.bonus} Bonus</span>`
        : '';

    const formula = extra.visitable
        ? `${extra.visited} Felder${extra.bonus ? ` + ${extra.bonus} Speedrun-Bonus` : ''} = ${finalScore} Punkte`
        : details;

    calcDiv.className = `result-card result-card--${outcome}`;
    calcDiv.innerHTML = `
        <div class="result-card__headline">${headlines[outcome] || headlines.win}</div>
        <div class="result-card__score" id="result-score">0</div>
        <div class="result-card__chips">
            <span class="chip">${modeEmoji} ${escapeHtml(mode)}</span>
            <span class="chip">🐴 ${escapeHtml(moves)} Züge</span>
            ${fieldsChip}
            ${bonusChip}
        </div>
        ${formula ? `<div class="result-card__details">ℹ️ ${escapeHtml(formula)}</div>` : ''}
    `;

    calcDiv.hidden = false;
    Effects.countUp(document.getElementById('result-score'), finalScore, 1100);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (text === null || text === undefined) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Show a loading row while the leaderboard is fetched
 */
function renderLeaderboardLoading() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    tbody.innerHTML = `
        <tr class="lb-loading">
            <td colspan="6"><span class="lb-loading__horse">🐴</span><br>Sir Galoppino holt die Bestenliste...</td>
        </tr>
    `;
}

/**
 * Render the leaderboard table
 */
function renderLeaderboard(entries) {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    if (!entries.length) {
        const message = leaderboardLoadFailed
            ? '<span class="lb-empty__icon">📡</span>Die Bestenliste ist gerade nicht erreichbar. Versuch es später nochmal!'
            : '<span class="lb-empty__icon">🏇</span>Noch keine Einträge – sei der Erste!';
        tbody.innerHTML = `<tr class="lb-empty"><td colspan="6">${message}</td></tr>`;
        return;
    }

    const topEntries = entries.slice(0, 50);
    let alreadyHighlighted = false; // Track if we've already highlighted one entry

    tbody.innerHTML = topEntries.map((entry, index) => {
        const rank = index + 1;
        let isHighlighted = false;

        // Check if this is the just-saved entry (within last 30 seconds) - only highlight ONE entry
        if (!alreadyHighlighted &&
            lastSavedEntry &&
            (Date.now() - lastSavedEntry.timestamp) < 30000 &&
            entry.name === lastSavedEntry.name &&
            Number(entry.score) === Number(lastSavedEntry.score) &&
            (entry.difficulty || entry.mode || '').toLowerCase() === lastSavedEntry.mode.toLowerCase()) {
            isHighlighted = true;
            alreadyHighlighted = true; // Don't highlight any more entries
        }

        const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
        const rankDisplay = medals[rank] || rank;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';

        // Format date
        let dateStr = entry.date || '';
        try {
            if (dateStr) {
                const d = new Date(dateStr);
                dateStr = d.toLocaleDateString('de-DE', {
                    day: 'numeric', month: 'numeric', year: 'numeric'
                });
            }
        } catch (e) { /* ignore */ }

        const safeName = escapeHtml(entry.name || 'Anonym');
        const safeScore = escapeHtml(entry.score);
        const safeMoves = escapeHtml(entry.moves || '-');
        const safeDate = escapeHtml(dateStr);

        // Mode display (using difficulty field for now)
        const mode = entry.difficulty || entry.mode || '-';
        const modeIcon = String(mode).toLowerCase() === 'speedrun' ? '⏱️' : '🎯';
        const safeMode = `${modeIcon} ${escapeHtml(mode)}`;

        const rowClasses = [];
        if (rank <= 3) rowClasses.push(`podium-${rank}`);
        if (isHighlighted) rowClasses.push('highlighted-row');
        const delay = Math.min(index, 15) * 30;

        return `
            <tr class="${rowClasses.join(' ')}" style="animation-delay: ${delay}ms">
                <td class="${rankClass}"><span class="rank-badge">${rankDisplay}</span></td>
                <td class="lb-name" title="${safeName}">${safeName}</td>
                <td class="lb-score">${safeScore}</td>
                <td class="lb-moves">${safeMoves}</td>
                <td class="lb-mode">${safeMode}</td>
                <td class="lb-date col-date">${safeDate}</td>
            </tr>
        `;
    }).join('');

    const highlighted = tbody.querySelector('.highlighted-row');
    if (highlighted && highlighted.scrollIntoView) {
        highlighted.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}
