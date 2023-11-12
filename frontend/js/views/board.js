// import { Chess } from 'chess.js';

function onDrop(newLocation, oldLocation, source, piece, position, orientation) {
    
    console.log("move end");
    //call backend
}

function restart() {
    board.start();
}

var config = {
    draggable: true,
    dropOffBoard: 'snapback', // this is the default
    position: 'start',
    onDrop: onDrop
}
var board = Chessboard('board', config)
$(window).resize(board.resize);

