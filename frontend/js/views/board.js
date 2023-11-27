// import { Chess } from 'chess.js';
//code for onDragstart, onDrop, and onSnapEnd comes from https://chessboardjs.com/examples#5000

var board = null;
var game = new Chess();

function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
    console.log(source);
    console.log(game.moves({square: source})) 
    //highlight all legal moves for the selected piece
    for (move of game.moves({square: source, verbose: true})) {

      // console.log(move.to)
      document.querySelector(".square-" + move.to).classList.add("legal-move-highlight");
    }
  }
  
  function onDrop (source, target) {
    // see if the move is legal
    document.querySelectorAll(".legal-move-highlight").forEach(element => {
      element.classList.remove("legal-move-highlight");
    });
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  

    // updateStatus()
  }
  
  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  function onSnapEnd () {
    board.position(game.fen())
  }

function restart() {
    board.start();
    game = new Chess();
}

var config = {
    draggable: true,
    dropOffBoard: 'snapback', // this is the default
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
board = Chessboard('board', config)
$(window).resize(board.resize);

