/**
 * Knight Rider - UI Controller
 * Handles rendering, animations, and user interactions
 */

const FILES = 'abcdefgh';
const PARTIAL_WIN_FIELDS = 40;
const SPEEDRUN_SECONDS = 60;
const IDLE_DELAY_MS = 15000;

// Classes that are toggled by animations and must survive a re-render
const TRANSIENT_CELL_CLASSES = ['shake', 'is-awaiting', 'is-landed'];

class KnightRiderUI {
    constructor() {
        this.game = new KnightTourGame(8);
        this.isSpeedrunMode = false;
        this.timer = null;
        this.timeRemaining = SPEEDRUN_SECONDS;
        this.elapsedSeconds = 0;
        this.isGameStarted = false;
        this.cells = [];
        this.flight = null;
        this.idleTimeout = null;
        this.endTimeout = null;
        this.lastMood = null;
        this.focusBeforeModal = null;

        this.initElements();
        this.initEventListeners();
        this.initLeaderboardListeners();
        this.buildBoard();
        this.showStartScreen();
    }

    initElements() {
        this.boardEl = document.getElementById('chess-board');
        this.boardFrameEl = document.getElementById('board-frame');
        this.boardStampEl = document.getElementById('board-stamp');
        this.statusEl = document.getElementById('game-status');
        this.knightCardEl = document.getElementById('knight-card');
        this.knightSpeechEl = document.getElementById('knight-speech');
        this.speechBubbleEl = document.getElementById('speech-bubble');
        this.knightMoodEl = document.getElementById('knight-mood');
        this.moveCountEl = document.getElementById('move-count');
        this.visitedCountEl = document.getElementById('visited-count');
        this.remainingCountEl = document.getElementById('remaining-count');
        this.timerEl = document.getElementById('timer');
        this.timerLabelEl = document.getElementById('timer-label');
        this.timerContainerEl = document.getElementById('timer-container');
        this.fuseEl = document.getElementById('fuse');
        this.fuseBarEl = document.getElementById('fuse-bar');
        this.journeyTrackEl = document.querySelector('.journey__track');
        this.journeyRunnerEl = document.getElementById('journey-runner');
        this.journeyPercentEl = document.getElementById('journey-percent');
        this.journeyMarkerEl = document.getElementById('journey-marker');
        this.legendEl = document.querySelector('.legend');
        this.modeSwitchEl = document.getElementById('mode-switch');
        this.modeButtons = Array.from(document.querySelectorAll('.mode-switch__btn'));
        this.restartBtn = document.getElementById('restart-btn');
        this.muteBtn = document.getElementById('mute-btn');
        this.leaderboardBtn = document.getElementById('leaderboard-btn');

        // Leaderboard elements
        this.leaderboardModal = document.getElementById('leaderboard-modal');
        this.closeLeaderboardBtn = document.getElementById('close-leaderboard');
        this.saveScoreBtn = document.getElementById('save-score-btn');
        this.playerNameInput = document.getElementById('player-name-input');
        this.nameInputSection = document.getElementById('name-input-section');
        this.scoreCalcEl = document.getElementById('score-calculation');

        // Initialize sound manager
        this.sounds = new SoundManager();
    }

    initEventListeners() {
        this.restartBtn.addEventListener('click', () => {
            this.sounds.playClick();
            this.startNewGame();
        });

        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sounds.init();
                this.sounds.playClick();
                this.setMode(btn.dataset.mode);
            });
        });

        this.muteBtn.addEventListener('click', () => {
            const isMuted = this.sounds.toggleMute();
            this.muteBtn.textContent = isMuted ? '🔇' : '🔊';
            this.muteBtn.setAttribute('aria-pressed', String(isMuted));
            if (!isMuted) this.sounds.playClick();
        });

        this.leaderboardBtn.addEventListener('click', () => {
            this.sounds.playClick();
            this.openLeaderboard(false);
        });

        this.boardEl.addEventListener('keydown', (e) => this.handleBoardKeydown(e));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.leaderboardModal.classList.contains('visible')) {
                this.closeLeaderboard();
            }
        });

        // Initialize audio on first interaction
        document.addEventListener('click', () => this.sounds.init(), { once: true });
    }

    initLeaderboardListeners() {
        this.closeLeaderboardBtn.addEventListener('click', () => this.closeLeaderboard());
        this.leaderboardModal.addEventListener('click', (e) => {
            if (e.target === this.leaderboardModal) this.closeLeaderboard();
        });
        this.nameInputSection.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitScore();
        });
    }

    // ===== Board construction =====

    buildBoard() {
        const size = this.game.SIZE;
        this.boardEl.innerHTML = '';

        // Route trail layer (SVG in board coordinates: 1 unit = 1 cell)
        this.trailEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.trailEl.setAttribute('class', 'trail-layer');
        this.trailEl.setAttribute('viewBox', `0 0 ${size} ${size}`);
        this.trailEl.setAttribute('preserveAspectRatio', 'none');
        this.trailEl.setAttribute('aria-hidden', 'true');
        this.boardEl.appendChild(this.trailEl);

        // Knight used for the jump animation
        this.flyerEl = document.createElement('span');
        this.flyerEl.className = 'flying-knight';
        this.flyerEl.setAttribute('aria-hidden', 'true');
        this.flyerEl.textContent = '🐴';
        this.boardEl.appendChild(this.flyerEl);

        this.cells = Array.from({ length: size }, () => []);

        for (let row = size - 1; row >= 0; row--) {
            for (let col = 0; col < size; col++) {
                const cell = document.createElement('button');
                cell.type = 'button';
                cell.tabIndex = -1;
                cell.dataset.col = col;
                cell.dataset.row = row;

                const base = ['cell', (col + row) % 2 === 1 ? 'light' : 'dark'];
                if (col === 0 && row === size - 1) base.push('corner-tl');
                if (col === size - 1 && row === size - 1) base.push('corner-tr');
                if (col === 0 && row === 0) base.push('corner-bl');
                if (col === size - 1 && row === 0) base.push('corner-br');
                cell.dataset.base = base.join(' ');
                cell.className = cell.dataset.base;

                // Diagonal wave delay for entry & invite animations
                cell.style.setProperty('--d', `${(col + (size - 1 - row)) * 45}ms`);

                cell.addEventListener('click', () => this.handleCellClick(col, row));

                this.cells[col][row] = cell;
                this.boardEl.appendChild(cell);
            }
        }

        // Roving tabindex: one focusable cell
        this.focusCol = 0;
        this.focusRow = size - 1;
        this.cells[this.focusCol][this.focusRow].tabIndex = 0;
    }

    cellName(col, row) {
        return `${FILES[col]}${row + 1}`;
    }

    cellCenter(col, row) {
        // Center in percent of the board
        const size = this.game.SIZE;
        return {
            x: (col + 0.5) / size * 100,
            y: (size - 1 - row + 0.5) / size * 100
        };
    }

    setCellClasses(cell, classes) {
        const keep = TRANSIENT_CELL_CLASSES.filter(c => cell.classList.contains(c));
        cell.className = [cell.dataset.base, ...classes, ...keep].join(' ');
    }

    // ===== Game flow =====

    showStartScreen() {
        this.game.reset();
        this.game.placeObstacles();
        this.isGameStarted = false;
        this.stopTimer();
        this.timeRemaining = SPEEDRUN_SECONDS;
        this.elapsedSeconds = 0;
        clearTimeout(this.idleTimeout);
        clearTimeout(this.endTimeout);
        this.cancelFlight();

        this.boardFrameEl.classList.remove('is-win', 'is-partialWin', 'is-lose');
        this.boardStampEl.innerHTML = '';
        this.restartBtn.classList.remove('btn--attention');
        this.cells.flat().forEach(cell => {
            TRANSIENT_CELL_CLASSES.forEach(c => cell.classList.remove(c));
        });

        this.updateStatus('start');
        this.setKnightSpeech(getKnightMessage('start'));
        this.renderBoard();
        this.updateStats();
        this.updateTimerDisplay();
        this.playBoardEntry();
    }

    startNewGame() {
        this.stopTimer();
        this.showStartScreen();
    }

    setMode(mode) {
        const isSpeedrun = mode === 'speedrun';
        this.modeSwitchEl.dataset.mode = isSpeedrun ? 'speedrun' : 'normal';
        this.modeButtons.forEach(btn => {
            btn.setAttribute('aria-pressed', String(btn.dataset.mode === this.modeSwitchEl.dataset.mode));
        });

        if (isSpeedrun === this.isSpeedrunMode) return;

        this.isSpeedrunMode = isSpeedrun;
        this.fuseEl.classList.toggle('is-visible', isSpeedrun);
        this.timerContainerEl.classList.toggle('is-speedrun', isSpeedrun);
        this.timerLabelEl.textContent = isSpeedrun ? 'Countdown' : 'Zeit';
        this.legendEl.classList.toggle('no-hints', isSpeedrun);
        this.startNewGame();
    }

    playBoardEntry() {
        if (Effects.reducedMotion) return;
        this.boardEl.classList.add('is-entering');
        clearTimeout(this.entryTimeout);
        this.entryTimeout = setTimeout(() => this.boardEl.classList.remove('is-entering'), 1300);
    }

    // ===== Rendering =====

    renderBoard({ animateTrail = false } = {}) {
        const size = this.game.SIZE;
        const isPlaying = this.isGameStarted && !this.game.gameOver;
        const showHints = isPlaying && !this.isSpeedrunMode;
        const validMoves = showHints ? this.game.getValidMoves() : [];
        const squaresLeftAfterMove = this.game.getVisitableCount() - this.game.visitedCount - 1;

        // Warnsdorff accessibility for each valid move
        const hints = new Map();
        validMoves.forEach(m => hints.set(`${m.col},${m.row}`, this.game.getAccessibility(m.col, m.row)));
        const positiveValues = [...hints.values()].filter(v => v > 0);
        const bestValue = positiveValues.length ? Math.min(...positiveValues) : null;

        for (let row = size - 1; row >= 0; row--) {
            for (let col = 0; col < size; col++) {
                const cell = this.cells[col][row];
                const name = this.cellName(col, row);
                const classes = [];
                let html = '';
                let label;

                const obstacleType = this.game.getObstacleType(col, row);
                const isKnight = this.game.knightPos &&
                    this.game.knightPos.col === col &&
                    this.game.knightPos.row === row;
                const hint = hints.get(`${col},${row}`);

                if (obstacleType) {
                    classes.push('obstacle', obstacleType);
                    html = `<span class="obstacle-icon">${obstacleType === 'pond' ? '🌊' : '🐺'}</span>`;
                    label = `${name}: ${obstacleType === 'pond' ? 'Teich' : 'Wolf'}`;
                } else if (isKnight) {
                    classes.push('knight-cell');
                    html = '<span class="knight">🐴</span>';
                    label = `${name}: Sir Galoppino`;
                } else if (this.game.isVisited(col, row)) {
                    const order = this.game.getVisitOrder(col, row);
                    classes.push('visited');
                    html = `<span class="droppings">💩</span><span class="visit-order">${order}</span>`;
                    label = `${name}: besucht (Sprung ${order})`;
                } else if (hint !== undefined) {
                    classes.push('valid-move');
                    if (squaresLeftAfterMove === 0) {
                        classes.push('finish');
                        html = '<span class="move-hint">🚽</span>';
                    } else if (hint === 0) {
                        classes.push('dead-end');
                        html = `<span class="move-hint">${hint}</span>`;
                    } else {
                        if (hint === bestValue) classes.push('best');
                        html = `<span class="move-hint">${hint}</span>`;
                    }
                    label = `${name}: springbar, ${hint} Folgezüge`;
                } else {
                    label = `${name}: frei`;
                }

                // Only touch the DOM when the content really changed
                const signature = classes.join(' ') + '|' + html;
                if (cell.dataset.sig !== signature) {
                    const becameVisited = classes.includes('visited') && !(cell.dataset.sig || '').startsWith('visited');
                    cell.innerHTML = html;
                    cell.dataset.sig = signature;
                    if (becameVisited) {
                        cell.querySelector('.droppings')?.classList.add('animate');
                    }
                }

                this.setCellClasses(cell, classes);
                cell.setAttribute('aria-label', label);
            }
        }

        this.boardEl.classList.toggle('is-placing', !this.isGameStarted);
        this.boardEl.classList.toggle('is-over', this.game.gameOver);
        this.renderTrail(animateTrail);
    }

    renderTrail(animateLatest = false) {
        const history = this.game.moveHistory;
        const size = this.game.SIZE;
        const point = (p) => ({ x: p.col + 0.5, y: size - 1 - p.row + 0.5 });
        let svg = '';

        for (let i = 1; i < history.length; i++) {
            const a = point(history[i - 1]);
            const b = point(history[i]);
            const isLatest = i === history.length - 1;
            const opacity = (0.3 + 0.6 * (i / (history.length - 1))).toFixed(2);
            const cls = `trail-seg${isLatest ? ' is-latest' : ''}${isLatest && animateLatest ? ' is-new' : ''}`;
            svg += `<line class="${cls}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" opacity="${opacity}" />`;
        }

        if (history.length > 1) {
            const s = point(history[0]);
            svg += `<circle class="trail-start" cx="${s.x}" cy="${s.y}" r="0.09" />`;
        }

        this.trailEl.innerHTML = svg;
    }

    isValidMoveTarget(col, row) {
        const validMoves = this.game.getValidMoves();
        return validMoves.some(m => m.col === col && m.row === row);
    }

    // ===== Interaction =====

    handleBoardKeydown(e) {
        const cell = e.target.closest('.cell');
        if (!cell) return;

        let col = Number(cell.dataset.col);
        let row = Number(cell.dataset.row);
        const max = this.game.SIZE - 1;

        switch (e.key) {
            case 'ArrowLeft': col = Math.max(0, col - 1); break;
            case 'ArrowRight': col = Math.min(max, col + 1); break;
            case 'ArrowUp': row = Math.min(max, row + 1); break;
            case 'ArrowDown': row = Math.max(0, row - 1); break;
            case 'Home': col = 0; break;
            case 'End': col = max; break;
            default: return;
        }

        e.preventDefault();
        this.moveFocus(col, row, true);
    }

    moveFocus(col, row, focus = false) {
        const prev = this.cells[this.focusCol]?.[this.focusRow];
        if (prev) prev.tabIndex = -1;
        this.focusCol = col;
        this.focusRow = row;
        const next = this.cells[col][row];
        next.tabIndex = 0;
        if (focus) next.focus();
    }

    handleCellClick(col, row) {
        this.sounds.init();
        this.moveFocus(col, row);

        if (this.game.gameOver) {
            this.shakeCell(col, row);
            this.restartBtn.classList.add('btn--attention');
            return;
        }

        this.resetIdleTimer();

        // If game not started, this is start position selection
        if (!this.isGameStarted) {
            const obstacleType = this.game.getObstacleType(col, row);
            if (obstacleType) {
                const msgType = obstacleType === 'pond' ? 'blockPond' : 'blockWolf';
                this.setKnightSpeech(getKnightMessage(msgType));
                this.sounds.playInvalid();
                this.shakeCell(col, row);
                return;
            }

            this.boardEl.classList.remove('is-entering');
            this.game.startAt(col, row);
            this.game.checkGameEnd(); // a start square without any jump ends the tour at once
            this.isGameStarted = true;
            this.startTimer();

            if (this.isSpeedrunMode) {
                this.setKnightSpeech(getKnightMessage('speedrun'));
            } else {
                this.setKnightSpeech(getKnightMessage('move'));
            }

            this.updateStatus('playing');
            this.sounds.playMove();
            this.renderBoard();
            this.landKnight(this.cells[col][row]);

            const c = this.cellCenter(col, row);
            Effects.puff(this.boardEl, c.x, c.y, { emoji: ['✨', '⭐', '💫'], count: 5, spread: 70, rise: 50 });

            this.updateStats();

            if (this.game.gameOver) {
                this.handleGameEnd();
            }
            return;
        }

        // Normal move - check why it's invalid
        if (!this.isValidMoveTarget(col, row)) {
            this.sounds.playInvalid();
            this.shakeCell(col, row);

            // Show specific message based on what's blocking
            const obstacleType = this.game.getObstacleType(col, row);
            if (obstacleType === 'pond') {
                this.setKnightSpeech(getKnightMessage('blockPond'));
            } else if (obstacleType === 'wolf') {
                this.setKnightSpeech(getKnightMessage('blockWolf'));
            } else if (this.game.isVisited(col, row)) {
                this.setKnightSpeech(getKnightMessage('blockVisited'));
            } else {
                // Not reachable by L-shaped move
                this.setKnightSpeech(getKnightMessage('blockNotL'));
            }
            return;
        }

        // Make move
        const from = { ...this.game.knightPos };
        this.game.makeMove(col, row);
        this.sounds.playMove();
        this.sayMoveComment(col, row);

        this.renderBoard({ animateTrail: true });
        this.animateKnightFlight(from, { col, row });
        this.updateStats();

        // Check game end
        if (this.game.gameOver) {
            this.handleGameEnd();
        }
    }

    sayMoveComment(col, row) {
        const roll = Math.random();
        const from = this.game.moveHistory[this.game.moveHistory.length - 2];
        const c = this.cellCenter(from.col, from.row);

        if (roll < 0.12) {
            this.setKnightSpeech(getKnightMessage('fart'));
            this.sounds.playFart();
            Effects.puff(this.boardEl, c.x, c.y, { emoji: '💨', count: 4, spread: 80, rise: 60, scale: 1.3 });
            return;
        }

        Effects.puff(this.boardEl, c.x, c.y, { emoji: '💨', count: 1, spread: 20, rise: 35 });

        if (roll < 0.45 && this.isNearObstacle(col, row, 'wolf')) {
            this.setKnightSpeech(getKnightMessage('nearWolf'));
        } else if (roll < 0.45 && this.isNearObstacle(col, row, 'pond')) {
            this.setKnightSpeech(getKnightMessage('nearPond'));
        } else {
            this.setKnightSpeech(getKnightMessage('move'));
        }
    }

    isNearObstacle(col, row, type) {
        return this.game.obstacles.some(o =>
            o.type === type && Math.abs(o.col - col) <= 1 && Math.abs(o.row - row) <= 1);
    }

    animateKnightFlight(from, to) {
        const targetCell = this.cells[to.col][to.row];

        if (Effects.reducedMotion || !this.flyerEl.animate) {
            this.landKnight(targetCell);
            return;
        }

        this.cancelFlight();

        const size = this.game.SIZE;
        const cellSize = this.boardEl.clientWidth / size;
        const pos = (p) => ({ x: p.col * cellSize, y: (size - 1 - p.row) * cellSize });
        const a = pos(from);
        const b = pos(to);
        const lift = cellSize * 0.9;
        const flip = b.x > a.x ? -1 : 1; // 🐴 looks left - mirror when jumping right

        targetCell.classList.add('is-awaiting');
        this.flyerEl.classList.add('is-flying');

        const anim = this.flyerEl.animate([
            { transform: `translate(${a.x}px, ${a.y}px) scale(${flip}, 1) rotate(0deg)` },
            { transform: `translate(${(a.x + b.x) / 2}px, ${(a.y + b.y) / 2 - lift}px) scale(${1.4 * flip}, 1.4) rotate(${-14 * flip}deg)`, offset: 0.5 },
            { transform: `translate(${b.x}px, ${b.y}px) scale(${flip}, 1) rotate(0deg)` }
        ], { duration: 380, easing: 'cubic-bezier(.45,.05,.35,1)' });

        this.flight = { anim, targetCell };

        const done = () => {
            if (this.flight && this.flight.anim === anim) {
                this.flight = null;
                this.flyerEl.classList.remove('is-flying');
                targetCell.classList.remove('is-awaiting');
                this.landKnight(targetCell);
            }
        };
        anim.onfinish = done;
    }

    cancelFlight() {
        if (!this.flight) return;
        const { anim, targetCell } = this.flight;
        this.flight = null;
        anim.cancel();
        targetCell.classList.remove('is-awaiting');
        this.flyerEl.classList.remove('is-flying');
    }

    landKnight(cell) {
        Effects.replayClass(cell, 'is-landed');
    }

    shakeCell(col, row) {
        const cell = this.cells[col]?.[row];
        if (!cell) return;
        Effects.replayClass(cell, 'shake');
        clearTimeout(cell._shakeTimeout);
        cell._shakeTimeout = setTimeout(() => cell.classList.remove('shake'), 450);
    }

    resetIdleTimer() {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(() => {
            if (this.isGameStarted && !this.game.gameOver) {
                this.setKnightSpeech(getKnightMessage('idle'));
                this.resetIdleTimer();
            }
        }, IDLE_DELAY_MS);
    }

    // ===== Timer =====

    startTimer() {
        this.stopTimer();
        this.timeRemaining = SPEEDRUN_SECONDS;
        this.elapsedSeconds = 0;
        this.updateTimerDisplay();
        if (this.isSpeedrunMode) this.fuseEl.classList.add('is-burning');

        this.timer = setInterval(() => this.tick(), 1000);
    }

    tick() {
        if (!this.isSpeedrunMode) {
            this.elapsedSeconds++;
            this.updateTimerDisplay();
            return;
        }

        this.timeRemaining--;
        this.updateTimerDisplay();

        if (this.timeRemaining <= 10) {
            this.setKnightSpeech(getKnightMessage('timeWarning'));
            this.timerContainerEl.classList.add('warning');
            this.fuseEl.classList.add('is-warning');
            if (this.timeRemaining > 0) this.sounds.playTick();
            this.updateMood();
        }

        if (this.timeRemaining <= 0) {
            this.stopTimer();
            this.game.gameOver = true;
            this.game.hasWon = false;
            this.handleGameEnd();
        }
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.timerContainerEl?.classList.remove('warning');
        this.fuseEl?.classList.remove('is-burning', 'is-warning');
    }

    updateTimerDisplay() {
        if (!this.timerEl) return;

        if (this.isSpeedrunMode) {
            this.timerEl.textContent = this.timeRemaining + 's';
            this.fuseBarEl.style.width = `${Math.max(0, this.timeRemaining / SPEEDRUN_SECONDS * 100)}%`;
        } else {
            const minutes = Math.floor(this.elapsedSeconds / 60);
            const seconds = String(this.elapsedSeconds % 60).padStart(2, '0');
            this.timerEl.textContent = `${minutes}:${seconds}`;
        }
    }

    // ===== Stats & HUD =====

    updateStats() {
        const visitable = this.game.getVisitableCount();
        const visited = this.game.visitedCount;

        this.setStat(this.moveCountEl, this.game.moveCount);
        this.setStat(this.visitedCountEl, `${visited}/${visitable}`);
        this.setStat(this.remainingCountEl, visitable - visited);

        // Journey to the golden toilet
        const progress = visitable ? visited / visitable : 0;
        this.journeyTrackEl.style.setProperty('--progress', progress.toFixed(4));
        this.journeyMarkerEl.style.setProperty('--at', (PARTIAL_WIN_FIELDS / visitable).toFixed(4));
        this.journeyMarkerEl.classList.toggle('reached', visited >= PARTIAL_WIN_FIELDS);
        this.journeyPercentEl.textContent = `${Math.round(progress * 100)}%`;
        if (visited > 0) Effects.replayClass(this.journeyRunnerEl, 'hop');

        this.updateMood();
    }

    setStat(el, value) {
        const text = String(value);
        if (el.textContent === text) return;
        el.textContent = text;
        Effects.replayClass(el.closest('.stat'), 'bump');
    }

    updateMood() {
        const visitable = this.game.getVisitableCount();
        const progress = visitable ? this.game.visitedCount / visitable : 0;
        let mood;

        if (this.game.gameOver) {
            if (this.game.hasWon) mood = '😌';
            else if (this.game.visitedCount >= PARTIAL_WIN_FIELDS) mood = '😅';
            else mood = '😵';
        } else if (!this.isGameStarted) {
            mood = '🙂';
        } else if (this.isSpeedrunMode && this.timeRemaining <= 10) {
            mood = '😱';
        } else if (progress < 0.25) {
            mood = '😬';
        } else if (progress < 0.5) {
            mood = '😣';
        } else if (progress < 0.75) {
            mood = '😰';
        } else {
            mood = '😱';
        }

        const urgency = this.game.gameOver ? 0 : progress;
        this.knightCardEl.style.setProperty('--urgency', urgency.toFixed(3));

        if (mood !== this.lastMood) {
            this.lastMood = mood;
            this.knightMoodEl.textContent = mood;
            Effects.replayClass(this.knightMoodEl, 'pop');
        }
    }

    updateStatus(state) {
        let statusText;

        if (state === 'start') {
            statusText = '🏇 Setze Sir Galoppino irgendwo auf\'s Brett!';
        } else if (state === 'playing') {
            statusText = `🥕 Spring auf alle ${this.game.getVisitableCount()} Felder – ohne Wiederholung!`;
        } else if (state === 'win') {
            statusText = getKnightMessage('win');
        } else if (state === 'partialWin') {
            statusText = getKnightMessage('partialWin');
        } else if (state === 'lose') {
            statusText = getKnightMessage('stuck');
        } else {
            statusText = `🥕 Spring auf alle ${this.game.getVisitableCount()} Felder!`;
        }

        // Format *text* as italic
        const formattedStatus = statusText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        this.statusEl.innerHTML = formattedStatus;
        this.statusEl.className = 'game-status area-status ' + state;
    }

    setKnightSpeech(text) {
        // Convert *text* to <em>text</em> for formatting
        const formattedText = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        this.knightSpeechEl.innerHTML = formattedText;
        Effects.replayClass(this.speechBubbleEl, 'pop');
    }

    showStamp(outcome, timedOut) {
        const visitable = this.game.getVisitableCount();
        const visited = this.game.visitedCount;
        const stamps = {
            win: { icon: '🚽', title: 'ERLEICHTERT!', text: `Alle ${visitable} Felder geschafft!` },
            partialWin: { icon: '🥈', title: 'RESPEKT!', text: `${visited} von ${visitable} Feldern` },
            lose: timedOut
                ? { icon: '⏰', title: 'ZEIT UM!', text: `${visited} von ${visitable} Feldern` }
                : { icon: '😱', title: 'SACKGASSE!', text: `${visited} von ${visitable} Feldern` }
        };
        const s = stamps[outcome];

        this.boardStampEl.innerHTML = `
            <div class="stamp stamp--${outcome}">
                <span class="stamp__icon">${s.icon}</span>
                <span class="stamp__title">${s.title}</span>
                <span class="stamp__text">${s.text}</span>
            </div>`;
    }

    // ===== Game end =====

    handleGameEnd() {
        this.stopTimer();
        clearTimeout(this.idleTimeout);

        const timedOut = this.isSpeedrunMode && this.timeRemaining <= 0 && !this.game.hasWon;
        let outcome;

        if (this.game.hasWon) {
            outcome = 'win';
            this.setKnightSpeech(getKnightMessage('win'));
            this.sounds.playWin();
            Effects.confetti({ amount: 180, rain: true, emojis: ['💩', '🚽', '✨', '🎉', '🏆', '👑'] });
        } else if (this.game.visitedCount >= PARTIAL_WIN_FIELDS) {
            // Partial win - 40+ fields is a respectable achievement!
            outcome = 'partialWin';
            this.setKnightSpeech(getKnightMessage('partialWin'));
            this.sounds.playPartialWin();
            Effects.confetti({ amount: 90, emojis: ['🥈', '✨', '💩'] });
        } else {
            outcome = 'lose';
            this.setKnightSpeech(getKnightMessage('stuck'));
            this.sounds.playLose();
        }

        this.updateStatus(outcome);
        this.boardFrameEl.classList.add(`is-${outcome}`);
        this.restartBtn.classList.add('btn--attention');
        this.showStamp(outcome, timedOut);
        this.renderBoard();
        this.updateMood();

        // Always allow score entry (win or lose)
        clearTimeout(this.endTimeout);
        this.endTimeout = setTimeout(() => this.handleWin(outcome), 1500);
    }

    handleWin(outcome) {
        const score = this.calculateScore();
        const mode = this.isSpeedrunMode ? 'Speedrun' : 'Normal';

        this.currentWinData = {
            score: score,
            moves: this.game.moveCount,
            mode: mode
        };

        // Show score visualization
        const details = this.isSpeedrunMode
            ? `${this.game.visitedCount} Felder + 10 Speedrun-Bonus`
            : `${this.game.visitedCount} Felder`;

        showScoreVisualization(mode, this.game.moveCount, score, details, {
            outcome,
            visited: this.game.visitedCount,
            visitable: this.game.getVisitableCount(),
            bonus: this.isSpeedrunMode ? 10 : 0
        });
        this.openLeaderboard(true);
    }

    calculateScore() {
        let score = this.game.visitedCount; // 1 point per field

        if (this.isSpeedrunMode) {
            score += 10; // Speedrun bonus
        }

        return score;
    }

    // ===== Leaderboard =====

    async submitScore() {
        const name = this.playerNameInput.value.trim();
        if (!name) {
            Effects.toast('✍️ Bitte gib einen Namen ein!', 'error');
            Effects.replayClass(this.playerNameInput, 'shake');
            this.playerNameInput.focus();
            return;
        }

        this.saveScoreBtn.disabled = true;
        this.saveScoreBtn.textContent = '⏳ Speichere...';

        const success = await saveHighscore(
            name,
            this.currentWinData.score,
            this.currentWinData.moves,
            this.currentWinData.mode
        );

        if (success) {
            try {
                localStorage.setItem('knightrider.playerName', name);
            } catch (e) { /* storage unavailable */ }

            this.nameInputSection.classList.add('hidden');
            Effects.toast('🏆 Gespeichert! Sir Galoppino ist stolz auf dich!', 'success');
            renderLeaderboardLoading();
            const entries = await loadLeaderboard();
            renderLeaderboard(entries);
        } else {
            Effects.toast('😵 Fehler beim Speichern. Bitte versuche es noch einmal.', 'error');
            this.saveScoreBtn.disabled = false;
            this.saveScoreBtn.textContent = '💾 Speichern';
        }
    }

    openLeaderboard(showInput = false) {
        if (!this.leaderboardModal.classList.contains('visible')) {
            this.focusBeforeModal = document.activeElement;
        }
        this.leaderboardModal.classList.add('visible');
        this.leaderboardModal.setAttribute('aria-hidden', 'false');

        renderLeaderboardLoading();
        loadLeaderboard().then(entries => renderLeaderboard(entries));

        if (showInput) {
            this.nameInputSection.classList.remove('hidden');
            let storedName = '';
            try {
                storedName = localStorage.getItem('knightrider.playerName') || '';
            } catch (e) { /* storage unavailable */ }
            this.playerNameInput.value = storedName;
            this.saveScoreBtn.disabled = false;
            this.saveScoreBtn.textContent = '💾 Speichern';
            this.scoreCalcEl.hidden = false;

            // Avoid popping up the on-screen keyboard on touch devices
            if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
                setTimeout(() => this.playerNameInput.focus(), 350);
            }
        } else {
            this.nameInputSection.classList.add('hidden');
            this.scoreCalcEl.hidden = true;
            setTimeout(() => this.closeLeaderboardBtn.focus(), 50);
        }
    }

    closeLeaderboard() {
        this.leaderboardModal.classList.remove('visible');
        this.leaderboardModal.setAttribute('aria-hidden', 'true');
        if (this.focusBeforeModal && this.focusBeforeModal.focus) {
            this.focusBeforeModal.focus();
        }
        this.focusBeforeModal = null;
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gameUI = new KnightRiderUI();
});
