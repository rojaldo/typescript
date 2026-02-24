namespace Tetris {

export enum Colors {
    Cyan = 'cyan',
    Blue = 'blue',
    Orange = 'orange',
    Yellow = 'yellow',
    Green = 'green',
    Purple = 'purple',
    Red = 'red'
}

export enum TetrisPieceType {
    I,
    O,
    T,
    S,
    Z,
    J,
    L
}

interface ITetrisPiece {
    shape: number[][];
    color: Colors;
}

export abstract class TetrisPiece implements ITetrisPiece {
    abstract shape: number[][];
    abstract color: Colors;

    rotate() {
        // Rotate the piece clockwise
        const newShape = this.shape[0].map((_, index) =>
            this.shape.map(row => row[index]).reverse()
        );
        this.shape = newShape;
        }
}

export class TetrisPieceI extends TetrisPiece {
    shape = [[0,0,0,0,0],
             [0,0,0,0,0],
             [1,1,1,1,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
    color = Colors.Cyan;
}

export class TetrisPieceO extends TetrisPiece {
    shape = [[0,0,0,0,0],
             [0,1,1,0,0],
             [0,1,1,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
    color = Colors.Yellow;
}

export class TetrisPieceT extends TetrisPiece {
    shape = [[0,0,0,0,0],
             [0,1,1,1,0],
             [0,0,1,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
    color = Colors.Purple;
}

export class TetrisPieceS extends TetrisPiece {
    shape = [[0,0,0,0,0],
             [0,0,1,1,0],
             [0,1,1,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
    color = Colors.Green;
}

export class TetrisPieceZ extends TetrisPiece {
    shape = [[0,0,0,0,0],
             [0,1,1,0,0],
             [0,0,1,1,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
    color = Colors.Red;
}

export class TetrisPieceJ extends TetrisPiece {
    shape = [[0,0,1,0,0],
             [0,1,1,1,0],
             [0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
    color = Colors.Blue;
}

export class TetrisPieceL extends TetrisPiece {
    shape = [[0,1,0,0,0],
             [0,1,1,1,0],
             [0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
    color = Colors.Orange;
}

}
