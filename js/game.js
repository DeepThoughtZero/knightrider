/**
 * Knight Rider - Springer-Tour Game Logic
 * Core game state management and knight movement
 */

class KnightTourGame {
    constructor(size = 8) {
        this.SIZE = size;
        this.TOTAL_SQUARES = size * size;
        this.reset();
    }

    reset() {
        // Create empty board (false = not visited)
        this.visited = Array(this.SIZE).fill(null).map(() => 
            Array(this.SIZE).fill(false)
        );
        this.obstacles = []; // {col, row, type}
        this.knightPos = null; // {col, row}
        this.moveCount = 0;
        this.visitedCount = 0;
        this.gameOver = false;
        this.hasWon = false;
        this.moveHistory = []; // Track visit order for numbers
        this.startTime = null;
        this.elapsedTime = 0;
    }

    /**
     * Place obstacles on the board
     * - 4 adjacent pond tiles (🌊)
     * - 2 separate wolf tiles (🐺)
     */
    placeObstacles() {
        this.obstacles = [];
        
        // Place 4 adjacent pond tiles
        const pondCluster = this.generatePondCluster();
        pondCluster.forEach(pos => {
            this.obstacles.push({ col: pos.col, row: pos.row, type: 'pond' });
        });
        
        // Place 2 individual wolf tiles
        for (let i = 0; i < 2; i++) {
            let pos;
            let attempts = 0;
            do {
                pos = this.getRandomPosition();
                attempts++;
            } while (this.isOccupied(pos.col, pos.row) && attempts < 100);
            
            if (!this.isOccupied(pos.col, pos.row)) {
                this.obstacles.push({ col: pos.col, row: pos.row, type: 'wolf' });
            }
        }
    }

    /**
     * Generate a cluster of 4 adjacent pond tiles
     */
    generatePondCluster() {
        const cluster = [];
        let attempts = 0;
        
        while (cluster.length < 4 && attempts < 100) {
            attempts++;
            cluster.length = 0;
            
            // Start with a random position (not on edges for better cluster formation)
            const startCol = 1 + Math.floor(Math.random() * (this.SIZE - 3));
            const startRow = 1 + Math.floor(Math.random() * (this.SIZE - 3));
            
            cluster.push({ col: startCol, row: startRow });
            
            // Grow cluster in random adjacent directions
            const directions = [
                [0, 1], [0, -1], [1, 0], [-1, 0]
            ];
            
            while (cluster.length < 4) {
                // Pick a random existing cluster tile
                const base = cluster[Math.floor(Math.random() * cluster.length)];
                
                // Shuffle directions
                const shuffled = directions.sort(() => Math.random() - 0.5);
                
                let added = false;
                for (const [dx, dy] of shuffled) {
                    const newCol = base.col + dx;
                    const newRow = base.row + dy;
                    
                    if (this.isInBounds(newCol, newRow) && 
                        !cluster.some(p => p.col === newCol && p.row === newRow)) {
                        cluster.push({ col: newCol, row: newRow });
                        added = true;
                        break;
                    }
                }
                
                if (!added) break; // Can't grow further
            }
        }
        
        return cluster.slice(0, 4);
    }

    getRandomPosition() {
        return {
            col: Math.floor(Math.random() * this.SIZE),
            row: Math.floor(Math.random() * this.SIZE)
        };
    }

    isInBounds(col, row) {
        return col >= 0 && col < this.SIZE && row >= 0 && row < this.SIZE;
    }

    isObstacle(col, row) {
        return this.obstacles.some(o => o.col === col && o.row === row);
    }

    getObstacleType(col, row) {
        const obs = this.obstacles.find(o => o.col === col && o.row === row);
        return obs ? obs.type : null;
    }

    isOccupied(col, row) {
        return this.isObstacle(col, row) || 
               (this.knightPos && this.knightPos.col === col && this.knightPos.row === row);
    }

    isVisited(col, row) {
        return this.visited[col][row];
    }

    /**
     * Start the game at given position
     */
    startAt(col, row) {
        if (this.isObstacle(col, row)) return false;
        
        this.knightPos = { col, row };
        this.visited[col][row] = true;
        this.visitedCount = 1;
        this.moveCount = 0;
        this.moveHistory = [{ col, row }];
        this.startTime = Date.now();
        
        return true;
    }

    /**
     * Get all valid L-shaped knight moves from current position
     */
    getValidMoves() {
        if (!this.knightPos || this.gameOver) return [];
        
        const moves = [];
        const knightDeltas = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        
        for (const [dx, dy] of knightDeltas) {
            const newCol = this.knightPos.col + dx;
            const newRow = this.knightPos.row + dy;
            
            if (this.isInBounds(newCol, newRow) && 
                !this.isVisited(newCol, newRow) && 
                !this.isObstacle(newCol, newRow)) {
                moves.push({ col: newCol, row: newRow });
            }
        }
        
        return moves;
    }

    /**
     * Get Warnsdorff accessibility for a position (number of onward moves)
     * Lower = harder to reach later, should go there first
     */
    getAccessibility(col, row) {
        const tempKnightPos = this.knightPos;
        this.knightPos = { col, row };
        
        // Temporarily mark as visited
        const wasVisited = this.visited[col][row];
        this.visited[col][row] = true;
        
        const count = this.getValidMoves().length;
        
        // Restore
        this.visited[col][row] = wasVisited;
        this.knightPos = tempKnightPos;
        
        return count;
    }

    /**
     * Make a move to the target position
     */
    makeMove(col, row) {
        if (this.gameOver) return false;
        
        const validMoves = this.getValidMoves();
        const isValid = validMoves.some(m => m.col === col && m.row === row);
        
        if (!isValid) return false;
        
        // Move knight
        this.knightPos = { col, row };
        this.visited[col][row] = true;
        this.visitedCount++;
        this.moveCount++;
        this.moveHistory.push({ col, row });
        
        // Check win/lose
        this.checkGameEnd();
        
        return true;
    }

    /**
     * Get total visitable squares (total - obstacles)
     */
    getVisitableCount() {
        return this.TOTAL_SQUARES - this.obstacles.length;
    }

    /**
     * Check if game has ended
     */
    checkGameEnd() {
        const visitableCount = this.getVisitableCount();
        
        // Win: All visitable squares visited
        if (this.visitedCount >= visitableCount) {
            this.gameOver = true;
            this.hasWon = true;
            this.elapsedTime = Date.now() - this.startTime;
            return;
        }
        
        // Lose: No valid moves but not all visited
        if (this.getValidMoves().length === 0) {
            this.gameOver = true;
            this.hasWon = false;
            this.elapsedTime = Date.now() - this.startTime;
        }
    }

    /**
     * Get visit order number for a position
     */
    getVisitOrder(col, row) {
        const index = this.moveHistory.findIndex(m => m.col === col && m.row === row);
        return index >= 0 ? index + 1 : null;
    }

    /**
     * Clone game state
     */
    clone() {
        const copy = new KnightTourGame(this.SIZE);
        copy.visited = this.visited.map(col => [...col]);
        copy.obstacles = this.obstacles.map(o => ({ ...o }));
        copy.knightPos = this.knightPos ? { ...this.knightPos } : null;
        copy.moveCount = this.moveCount;
        copy.visitedCount = this.visitedCount;
        copy.gameOver = this.gameOver;
        copy.hasWon = this.hasWon;
        copy.moveHistory = this.moveHistory.map(m => ({ ...m }));
        copy.startTime = this.startTime;
        copy.elapsedTime = this.elapsedTime;
        return copy;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KnightTourGame };
}
