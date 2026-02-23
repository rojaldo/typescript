import { TetrisPieceColor } from "./sample";

class TetrisPiece {
    shape: number[][];
    color: TetrisPieceColor;

    constructor(shape: number[][], color: TetrisPieceColor) {
        this.shape = shape;
        this.color = color;
    }

    rotate() {
        // Rotate the piece clockwise
        const newShape = this.shape[0].map((_, index) =>
            this.shape.map(row => row[index]).reverse()
        );
        this.shape = newShape;
    }
}

class TetrisBuilder {
    static createPiece(shape: number[][], color: TetrisPieceColor): TetrisPiece {
        return new TetrisPiece(shape, color);
    }
}


const pieceI = TetrisBuilder.createPiece([[0,0,0,0,0],
                                           [1,0,0,1,0],
                                           [1,1,1,1,0],
                                           [0,0,0,0,0],
                                           [0,0,0,0,0]], TetrisPieceColor.Cyan);
