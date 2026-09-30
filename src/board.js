import { ROWS, COLUMNS, MINES } from "./constants.js";
import Cell from "./cell.js";

class Board {
  constructor() {
    this.rows = ROWS;
    this.columns = COLUMNS;
    this.mines = MINES;
    this.minesPlaced = 0;
    this.grid = [];

    this.createBoard();
    this.placeMine();
    this.calculateNeighborMines();
  }

  createBoard() {
    for (let row = 0; row < this.rows; row++) {
      const currentRow = [];

      for (let column = 0; column < this.columns; column++) {
        const cell = new Cell();
        currentRow.push(cell);
      }

      this.grid.push(currentRow);
    }
  }

  placeMine() {
    const randomRow = Math.floor(Math.random() * this.rows);
    const randomColumn = Math.floor(Math.random() * this.columns);

    const cell = this.grid[randomRow][randomColumn];

    if (cell.isMine) {
      this.placeMine();
    } else {
      cell.isMine = true;
      this.minesPlaced++;

      if (this.minesPlaced < this.mines) {
        this.placeMine();
      }
    }
  }

  calculateNeighborMines() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const cell = this.grid[row][column];

        if (cell.isMine) {
          continue;
        }

        let mineCount = 0;

        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
          for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
            if (rowOffset === 0 && columnOffset === 0) {
              continue;
            }

            const neighborRow = row + rowOffset;
            const neighborColumn = column + columnOffset;

            if (
              neighborRow >= 0 &&
              neighborRow < this.rows &&
              neighborColumn >= 0 &&
              neighborColumn < this.columns
            ) {
              if (this.grid[neighborRow][neighborColumn].isMine) {
                mineCount++;
              }
            }
          }
        }

        cell.neighborMines = mineCount;
      }
    }
  }
}

export default Board;
