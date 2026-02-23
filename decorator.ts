class TetrisPiece {
  shape: number[][];
  color: TetrisPieceColor;

  constructor(shape: number[][], color: TetrisPieceColor) {
    this.shape = shape;
    this.color = color;
  }
  
  rotate() {
    
  }
}

class TetrisPieceIDecorator extends TetrisPiece {
    constructor() { 
        super([[0,0,0,0,0],
               [0,0,0,0,0],
               [1,1,1,1,0],
               [0,0,0,0,0],
               [0,0,0,0,0]], TetrisPieceColor.Cyan);
    }

    //rotate with 2 positions instead of 4. This is just an example of how a decorator can modify the behavior of the original class.
    rotate() {
        const newShape = this.shape[0].map((_, index) =>
            this.shape.map(row => row[index]).reverse()
        );
        this.shape = newShape;
        // Rotate again to achieve 180 degree rotation
        const newShape2 = this.shape[0].map((_, index) =>
            this.shape.map(row => row[index]).reverse()
        );
        this.shape = newShape2;
        
    }
}