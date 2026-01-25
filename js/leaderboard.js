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

// Initialize filter listeners
document.addEventListener('DOMContentLoaded', () => {
    const modeFilter = document.getElementById('mode-filter');

    if (modeFilter) {
        modeFilter.addEventListener('change', () => {
            filterAndRenderLeaderboard(modeFilter.value);
        });
    }
});

/**
 * Filter and re-render leaderboard
 */
function filterAndRenderLeaderboard(filterMode) {
    let filtered = allLeaderboardEntries;

    if (filterMode === 'speedrun') {
        filtered = filtered.filter(entry => (entry.mode || '').toLowerCase() === 'speedrun');
    } else if (filterMode === 'normal') {
        filtered = filtered.filter(entry => (entry.mode || '').toLowerCase() === 'normal');
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

        // Reset filter
        const modeFilter = document.getElementById('mode-filter');
        if (modeFilter) modeFilter.value = '';

        return entries;
    } catch (error) {
        console.error("Fehler beim Laden der Bestenliste:", error);
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
 * Show score visualization
 */
function showScoreVisualization(mode, moves, finalScore, details = '') {
    const calcDiv = document.getElementById('score-calculation');
    if (!calcDiv) return;

    const modeEmoji = mode === 'Speedrun' ? '⏱️' : '🎯';

    calcDiv.innerHTML = `
        <div style="display:flex; gap:12px; align-items:center; width:100%; flex-wrap:wrap;">
            <span class="score-part base">
                <span>${modeEmoji}</span> Modus: ${mode}
            </span>
            
            <span class="score-part penalty">
                <span>🐴</span> Züge: ${moves}
            </span>
            
            <span class="score-part result">
                <span>🏆</span> Score: ${finalScore}
            </span>
        </div>
        ${details ? `<div style="width:100%; font-size:0.85em; color:#64748b; margin-top:8px; padding-left:4px;">ℹ️ ${details}</div>` : ''}
    `;

    calcDiv.style.display = 'flex';
    calcDiv.style.flexWrap = 'wrap';
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Render the leaderboard table
 */
function renderLeaderboard(entries) {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    const topEntries = entries.slice(0, 50);
    let alreadyHighlighted = false; // Track if we've already highlighted one entry

    tbody.innerHTML = topEntries.map((entry, index) => {
        const rank = index + 1;
        let rankDisplay = rank;
        let rankClass = '';
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

        if (rank === 1) {
            rankDisplay = `🥇 ${rank}`;
            rankClass = 'rank-1';
        } else if (rank === 2) {
            rankDisplay = `🥈 ${rank}`;
            rankClass = 'rank-2';
        } else if (rank === 3) {
            rankDisplay = `🥉 ${rank}`;
            rankClass = 'rank-3';
        }

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
        const modeIcon = mode.toLowerCase() === 'speedrun' ? '⏱️' : '🎯';
        const safeMode = `${modeIcon} ${escapeHtml(mode)}`;

        const rowClass = isHighlighted ? 'highlighted-row' : '';

        return `
            <tr class="${rowClass}">
                <td class="${rankClass}" style="font-size: 1.1em;">${rankDisplay}</td>
                <td style="font-weight: 500">${safeName}</td>
                <td style="font-weight: bold">${safeScore}</td>
                <td style="color: #6b7280">${safeMoves}</td>
                <td>${safeMode}</td>
                <td style="font-size: 0.85em; color: #9ca3af">${safeDate}</td>
            </tr>
        `;
    }).join('');
}
