class Piece {

}

class Board {
    board: Piece[][] = Array(8).fill(Array(8).fill(Piece));
}

console.log(new Board());