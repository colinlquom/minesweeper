class Cell {
  constructor() {
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.neighborMines = 0;
  }
}

export default Cell;
