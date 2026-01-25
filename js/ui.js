/**
 * Knight Rider - UI Controller
 * Handles rendering, animations, and user interactions
 */

class KnightRiderUI {
    constructor() {
        this.game = new KnightTourGame(8);
        this.isSpeedrunMode = false;
        this.timer = null;
        this.timeRemaining = 60;
        this.isGameStarted = false;

        this.initElements();
        this.initEventListeners();
        this.initLeaderboardListeners();
        this.showStartScreen();
    }

    initElements() {
        this.boardEl = document.getElementById('chess-board');
        this.statusEl = document.getElementById('game-status');
        this.knightSpeechEl = document.getElementById('knight-speech');
        this.moveCountEl = document.getElementById('move-count');
        this.visitedCountEl = document.getElementById('visited-count');
        this.timerEl = document.getElementById('timer');
        this.timerContainerEl = document.getElementById('timer-container');
        this.gameModeSelect = document.getElementById('game-mode');
        this.restartBtn = document.getElementById('restart-btn');
        this.muteBtn = document.getElementById('mute-btn');
        this.leaderboardBtn = document.getElementById('leaderboard-btn');

        // Leaderboard elements
        this.leaderboardModal = document.getElementById('leaderboard-modal');
        this.closeLeaderboardBtn = document.getElementById('close-leaderboard');
        this.saveScoreBtn = document.getElementById('save-score-btn');
        this.playerNameInput = document.getElementById('player-name-input');
        this.nameInputSection = document.getElementById('name-input-section');

        // Initialize sound manager
        this.sounds = new SoundManager();
    }

    initEventListeners() {
        this.restartBtn.addEventListener('click', () => {
            this.sounds.playClick();
            this.startNewGame();
        });

        this.gameModeSelect.addEventListener('change', (e) => {
            this.sounds.playClick();
            this.isSpeedrunMode = e.target.value === 'speedrun';
            this.startNewGame();
        });

        this.muteBtn.addEventListener('click', () => {
            const isMuted = this.sounds.toggleMute();
            this.muteBtn.textContent = isMuted ? '🔇' : '🔊';
            if (!isMuted) this.sounds.playClick();
        });

        this.leaderboardBtn.addEventListener('click', () => {
            this.sounds.playClick();
            this.openLeaderboard(false);
        });

        // Initialize audio on first interaction
        document.addEventListener('click', () => this.sounds.init(), { once: true });
    }

    initLeaderboardListeners() {
        this.closeLeaderboardBtn.addEventListener('click', () => this.closeLeaderboard());
        this.leaderboardModal.addEventListener('click', (e) => {
            if (e.target === this.leaderboardModal) this.closeLeaderboard();
        });
        this.saveScoreBtn.addEventListener('click', () => this.submitScore());
    }

    showStartScreen() {
        this.game.reset();
        this.game.placeObstacles();
        this.isGameStarted = false;
        this.stopTimer();

        this.updateStatus('start');
        this.setKnightSpeech(getKnightMessage('start'));
        this.renderBoard();
        this.updateStats();
    }

    startNewGame() {
        this.stopTimer();
        this.showStartScreen();
    }

    renderBoard() {
        this.boardEl.innerHTML = '';

        for (let row = this.game.SIZE - 1; row >= 0; row--) {
            for (let col = 0; col < this.game.SIZE; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.col = col;
                cell.dataset.row = row;

                // Chess board pattern
                const isLight = (col + row) % 2 === 1;
                cell.classList.add(isLight ? 'light' : 'dark');

                // Check for obstacle
                const obstacleType = this.game.getObstacleType(col, row);
                if (obstacleType) {
                    cell.classList.add('obstacle', obstacleType);
                    cell.innerHTML = obstacleType === 'pond' ? '🌊' : '🐺';
                }
                // Check for knight
                else if (this.game.knightPos &&
                    this.game.knightPos.col === col &&
                    this.game.knightPos.row === row) {
                    cell.classList.add('knight-cell');
                    cell.innerHTML = `<span class="knight">♞</span>`;
                }
                // Check for visited
                else if (this.game.isVisited(col, row)) {
                    cell.classList.add('visited');
                    const order = this.game.getVisitOrder(col, row);
                    const isLastVisited = (order === this.game.visitedCount);
                    const animClass = isLastVisited ? 'droppings animate' : 'droppings';
                    cell.innerHTML = `<span class="${animClass}">💩</span><span class="visit-order">${order}</span>`;
                }
                // Check for valid move - only show hints in Normal mode
                else if (this.isGameStarted && !this.isSpeedrunMode && this.isValidMoveTarget(col, row)) {
                    cell.classList.add('valid-move');
                    const accessibility = this.game.getAccessibility(col, row);
                    cell.innerHTML = `<span class="move-hint">${accessibility}</span>`;
                }

                // Click handler
                cell.addEventListener('click', () => this.handleCellClick(col, row));

                this.boardEl.appendChild(cell);
            }
        }
    }

    isValidMoveTarget(col, row) {
        const validMoves = this.game.getValidMoves();
        return validMoves.some(m => m.col === col && m.row === row);
    }

    handleCellClick(col, row) {
        this.sounds.init();

        if (this.game.gameOver) return;

        // If game not started, this is start position selection
        if (!this.isGameStarted) {
            const obstacleType = this.game.getObstacleType(col, row);
            if (obstacleType) {
                const msgType = obstacleType === 'pond' ? 'blockPond' : 'blockWolf';
                this.setKnightSpeech(getKnightMessage(msgType));
                this.sounds.playInvalid();
                return;
            }

            this.game.startAt(col, row);
            this.isGameStarted = true;

            if (this.isSpeedrunMode) {
                this.startTimer();
                this.setKnightSpeech(getKnightMessage('speedrun'));
            } else {
                this.setKnightSpeech(getKnightMessage('move'));
            }

            this.updateStatus('playing');
            this.sounds.playMove();
            this.renderBoard();
            this.updateStats();
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
        this.game.makeMove(col, row);
        this.sounds.playMove();
        this.setKnightSpeech(getKnightMessage('move'));

        this.renderBoard();
        this.updateStats();

        // Check game end
        if (this.game.gameOver) {
            this.handleGameEnd();
        }
    }

    shakeCell(col, row) {
        const cell = this.boardEl.querySelector(`[data-col="${col}"][data-row="${row}"]`);
        if (cell) {
            cell.classList.add('shake');
            setTimeout(() => cell.classList.remove('shake'), 500);
        }
    }

    startTimer() {
        this.timeRemaining = 60;
        this.timerContainerEl.classList.add('visible');
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining <= 10) {
                this.setKnightSpeech(getKnightMessage('timeWarning'));
                this.timerContainerEl.classList.add('warning');
            }

            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.game.gameOver = true;
                this.game.hasWon = false;
                this.handleGameEnd();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.timerContainerEl?.classList.remove('visible', 'warning');
    }

    updateTimerDisplay() {
        if (this.timerEl) {
            this.timerEl.textContent = this.timeRemaining + 's';
        }
    }

    updateStats() {
        const visitable = this.game.getVisitableCount();
        this.moveCountEl.textContent = this.game.moveCount;
        this.visitedCountEl.textContent = `${this.game.visitedCount}/${visitable}`;
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
        this.statusEl.className = 'game-status ' + state;
    }

    setKnightSpeech(text) {
        // Convert *text* to <em>text</em> for formatting
        const formattedText = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        this.knightSpeechEl.innerHTML = formattedText;
    }

    handleGameEnd() {
        this.stopTimer();

        if (this.game.hasWon) {
            this.updateStatus('win');
            this.setKnightSpeech(getKnightMessage('win'));
            this.sounds.playWin();
        } else if (this.game.visitedCount >= 40) {
            // Partial win - 40+ fields is a respectable achievement!
            this.updateStatus('partialWin');
            this.setKnightSpeech(getKnightMessage('partialWin'));
            this.sounds.playPartialWin();
        } else {
            this.updateStatus('lose');
            this.setKnightSpeech(getKnightMessage('stuck'));
            this.sounds.playLose();
        }

        // Always allow score entry (win or lose)
        setTimeout(() => this.handleWin(), 1500);
    }

    handleWin() {
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

        showScoreVisualization(mode, this.game.moveCount, score, details);
        this.openLeaderboard(true);
    }

    calculateScore() {
        let score = this.game.visitedCount; // 1 point per field

        if (this.isSpeedrunMode) {
            score += 10; // Speedrun bonus
        }

        return score;
    }

    // Leaderboard Methods
    async submitScore() {
        const name = this.playerNameInput.value.trim();
        if (!name) {
            alert('Bitte gib einen Namen ein!');
            return;
        }

        this.saveScoreBtn.disabled = true;
        this.saveScoreBtn.textContent = 'Speichere...';

        const success = await saveHighscore(
            name,
            this.currentWinData.score,
            this.currentWinData.moves,
            this.currentWinData.mode
        );

        if (success) {
            this.nameInputSection.classList.add('hidden');
            const entries = await loadLeaderboard();
            renderLeaderboard(entries);
        } else {
            alert('Fehler beim Speichern. Bitte versuche es noch einmal.');
            this.saveScoreBtn.disabled = false;
            this.saveScoreBtn.textContent = 'Speichern';
        }
    }

    openLeaderboard(showInput = false) {
        this.leaderboardModal.classList.add('visible');
        loadLeaderboard().then(entries => renderLeaderboard(entries));

        if (showInput) {
            this.nameInputSection.classList.remove('hidden');
            this.playerNameInput.value = '';
            this.saveScoreBtn.disabled = false;
            this.saveScoreBtn.textContent = 'Speichern';
            document.getElementById('score-calculation').style.display = 'flex';
        } else {
            this.nameInputSection.classList.add('hidden');
            document.getElementById('score-calculation').style.display = 'none';
        }
    }

    closeLeaderboard() {
        this.leaderboardModal.classList.remove('visible');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gameUI = new KnightRiderUI();
});
