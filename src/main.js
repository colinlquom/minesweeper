import "../style.css";
import Game from "./game.js";
import DOM from "./dom.js";

const game = new Game();
const dom = new DOM(game);

dom.createBoard();
