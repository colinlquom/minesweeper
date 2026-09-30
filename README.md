# Minesweeper

A browser-based **Minesweeper** game built with JavaScript.

The project demonstrates JavaScript modules, classes, DOM manipulation, game-state management, recursion, Webpack, and npm tooling.

## Features

* 10 × 10 Minesweeper board
* 20 randomly placed mines
* Random mine placement
* Automatic calculation of neighboring mine counts
* Cell revealing
* Recursive revealing of neighboring safe cells
* Mine detection
* Right-click flag/unflag functionality
* Win detection
* Lose detection
* Mine reveal when the game is lost
* Separate game logic and DOM manipulation
* Webpack development and production builds

## Tech Stack

* HTML
* CSS
* JavaScript
* Node.js
* npm
* Webpack
* Jest
* Babel

## How to Play

### Left Click

Click a hidden cell to reveal it.

* If the cell contains a mine, you lose.
* If the cell is safe, the number of neighboring mines is shown.
* If the cell has no neighboring mines, surrounding safe cells are revealed automatically.

### Right Click

Right-click a hidden cell to place a flag.

Right-click it again to remove the flag.

Flagged cells cannot be revealed until the flag is removed.

### Winning

You win when every safe cell has been revealed.

The board contains:

```text
100 total cells
20 mines
80 safe cells
```

Therefore, revealing all 80 safe cells results in a win.

## Project Structure

```text
minesweeper/
│
├── index.html
├── style.css
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
│
├── src/
│   ├── board.js
│   ├── cell.js
│   ├── constants.js
│   ├── dom.js
│   ├── game.js
│   ├── main.js
│   └── utils.js
│
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## JavaScript Architecture

### `cell.js`

Defines the `Cell` class.

Each cell stores:

* Whether it contains a mine
* Whether it has been revealed
* Whether it is flagged
* The number of neighboring mines

### `board.js`

Defines the `Board` class.

Responsible for:

* Creating the 10 × 10 grid
* Creating `Cell` objects
* Randomly placing mines
* Calculating the number of neighboring mines

### `constants.js`

Stores the board configuration:

```js
const ROWS = 10;
const COLUMNS = 10;
const MINES = 20;
```

Keeping these values in one module makes the board configuration easy to change.

### `game.js`

Defines the `Game` class and controls the game state.

Responsible for:

* Creating the board
* Tracking whether the game is playing, won, or lost
* Revealing cells
* Tracking revealed safe cells
* Checking the win condition
* Handling mines
* Recursively revealing neighboring safe cells
* Flagging and unflagging cells

### `dom.js`

Handles interaction between the game logic and the browser DOM.

Responsible for:

* Creating the visual board
* Handling left-click events
* Handling right-click events
* Preventing the browser context menu
* Rendering revealed cells
* Rendering flags
* Displaying mines
* Displaying neighboring mine counts
* Showing game messages

### `main.js`

The application entry point.

It:

1. Imports the stylesheet.
2. Creates a `Game`.
3. Creates the DOM controller.
4. Creates the visual board.

## Game Flow

```text
Create Game
     ↓
Create Board
     ↓
Create 10 × 10 Cells
     ↓
Place 20 Mines
     ↓
Calculate Neighbor Counts
     ↓
Create DOM Board
     ↓
Player Reveals Cell
     ↓
┌───────────────┐
│   Mine?       │
└───────┬───────┘
        │
   ┌────┴────┐
   │         │
  YES        NO
   │         │
 Lose    Reveal Cell
             │
             ↓
       Neighbor Mines = 0?
             │
          YES → Reveal Neighbors
             │
             ↓
        Check Win
```

## Webpack

Webpack is used to bundle the application.

### Development

Run:

```bash
npm run dev
```

This starts the Webpack development server with hot reload.

### Production Build

Run:

```bash
npm run build
```

This creates a production bundle.

## Testing

Tests are run with:

```bash
npm test
```

The project uses Jest for testing JavaScript functionality.

## Learning Goals

This project was built to practice:

* JavaScript classes
* ES Modules
* DOM manipulation
* Event listeners
* Recursion
* Two-dimensional arrays
* Randomized algorithms
* Game-state management
* Separation of game logic and UI
* npm
* Webpack
* Development vs. production builds
* Automated testing

## Future Improvements

Possible improvements include:

* Difficulty selection
* Timer
* Score tracking
* Restart button
* Multiple board sizes
* Improved visual styling
* Better flag indicators
* Automatic win/lose restart flow
* First-click safety
* More advanced Minesweeper rules
* Mobile-friendly controls

## Author

Built by **Colin** as a JavaScript learning project.
