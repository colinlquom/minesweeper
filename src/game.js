import Board from "./board.js";

// Creating the game class
class Game {
  constructor() {
    this.board = new Board();
    this.gameStatus = "playing";
    this.revealedSafeCells = 0;
  }

  toggleFlag(row, column) {
  const cell = this.board.grid[row][column];

  if (cell.isRevealed) {
    return;
  }

   cell.isFlagged = !cell.isFlagged;
  }

  revealCell(row, column) {
    const cell = this.board.grid[row][column];

    if (!cell.isRevealed) {
      this.gameOver(cell, row, column);
    } else {
      console.log("Already revealed");
    }
  }

  checkWin() {
    const safeCells = this.board.rows * this.board.columns - this.board.mines;

    if (this.revealedSafeCells === safeCells) {
      this.gameStatus = "win";
    }
  }

  gameOver(cell, row, column) {
    if (cell.isMine) {
      cell.isRevealed = true;
      this.gameStatus = "lost";
      return;
    }

    cell.isRevealed = true;
    this.revealedSafeCells++;

    if (cell.neighborMines === 0) {
      this.revealNeighbors(row, column);
    }

    this.checkWin();
  }

  revealNeighbors(row, column) {
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        }

        const neighborRow = row + rowOffset;
        const neighborColumn = column + colOffset;

        if (
          neighborRow >= 0 &&
          neighborRow < this.board.rows &&
          neighborColumn >= 0 &&
          neighborColumn < this.board.columns
        ) {
          const neighborCell =
            this.board.grid[neighborRow][neighborColumn];

          if (!neighborCell.isMine && !neighborCell.isRevealed) {
            this.revealCell(neighborRow, neighborColumn);
          }
        }
      }
    }
  }
}

export default Game;
