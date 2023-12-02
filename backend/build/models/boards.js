"use strict";
class Piece {
}
class Board {
    constructor() {
        this.board = Array(8).fill(Array(8).fill(Piece));
    }
}
console.log(new Board());
