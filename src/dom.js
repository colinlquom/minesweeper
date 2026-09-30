class DOM {
  constructor(game) {
    this.game = game;
    this.gameBoard = document.querySelector("#game-board");
    this.message = document.querySelector("#message");
  }

  createBoard() {
    for (let row = 0; row < this.game.board.rows; row++) {
      for (let column = 0; column < this.game.board.columns; column++) {
        const cell = document.createElement("div");

        cell.classList.add("cell");

        // Left click → reveal cell
        cell.addEventListener("click", () => {
          this.handleCellClick(row, column);
        });

        // Right click → flag / unflag cell
        cell.addEventListener("contextmenu", (event) => {
          event.preventDefault();

          this.handleFlagClick(row, column);
        });

        this.gameBoard.appendChild(cell);
      }
    }
  }

  handleCellClick(row, column) {
    const cell = this.game.board.grid[row][column];

    // Game already ended
    if (this.game.gameStatus !== "playing") {
      this.message.textContent = "Game over!";
      return;
    }

    // Don't reveal flagged cell
    if (cell.isFlagged) {
      this.message.textContent = "Remove the flag first!";
      return;
    }

    // Don't reveal an already revealed cell
    if (cell.isRevealed) {
      this.message.textContent = "Already revealed!";
      return;
    }

    // Tell Game to reveal the cell
    this.game.revealCell(row, column);

    // Update the whole board
    this.renderBoard();

    // Show game result
    if (this.game.gameStatus === "lost") {
      this.revealAllMines();
      this.message.textContent = "💥 You hit a mine! You lose!";
    } else if (this.game.gameStatus === "win") {
      this.message.textContent = "🎉 You win!";
    } else {
      this.message.textContent = "Safe!";
    }
  }

  handleFlagClick(row, column) {
    // Don't allow flagging after game ends
    if (this.game.gameStatus !== "playing") {
      return;
    }

    // Tell Game to flag / unflag
    this.game.toggleFlag(row, column);

    // Update this cell on the screen
    this.renderCell(row, column);
  }

  renderBoard() {
    for (let row = 0; row < this.game.board.rows; row++) {
      for (let column = 0; column < this.game.board.columns; column++) {
        this.renderCell(row, column);
      }
    }
  }

  renderCell(row, column) {
    const cell = this.game.board.grid[row][column];

    // Convert row + column into the DOM cell's position
    const index = row * this.game.board.columns + column;

    const domCell = this.gameBoard.children[index];

    // Clear old text
    domCell.textContent = "";

    // Show flag first
    if (cell.isFlagged) {
      domCell.textContent = "🚩";
      return;
    }

    // Still hidden
    if (!cell.isRevealed) {
      return;
    }

    // Make revealed cell white
    domCell.classList.add("revealed");

    // Mine
    if (cell.isMine) {
      domCell.textContent = "💣";
    }

    // Number
    else if (cell.neighborMines > 0) {
      domCell.textContent = cell.neighborMines;
    }
  }

  revealAllMines() {
    for (let row = 0; row < this.game.board.rows; row++) {
      for (let column = 0; column < this.game.board.columns; column++) {
        const cell = this.game.board.grid[row][column];

        if (cell.isMine) {
          cell.isRevealed = true;
        }
      }
    }

    // Display all revealed mines
    this.renderBoard();
  }
}

export default DOM;
