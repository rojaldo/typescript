export enum TetrisPieceType {
  I = 'I',
  O = 'O',
  T = 'T',
  S = 'S',
  Z = 'Z',
  J = 'J',
  L = 'L'
}

export enum TetrisPieceColor {
  Cyan = 'Cyan',
  Yellow = 'Yellow',
  Purple = 'Purple',
  Green = 'Green',
  Red = 'Red',
  Blue = 'Blue',
  Orange = 'Orange'
}


abstract class TetrisPiece {
  abstract shape: number[][];
  abstract color: TetrisPieceColor;

  rotate() {
    // Rotate the piece clockwise
    const newShape = this.shape[0].map((_, index) =>
      this.shape.map(row => row[index]).reverse()
    );
    this.shape = newShape;
  }
}

class TetrisPieceI extends TetrisPiece {
  shape = [[0,0,0,0,0],
           [0,0,0,0,0],
           [1,1,1,1,0],
           [0,0,0,0,0],
           [0,0,0,0,0]];
  color = TetrisPieceColor.Cyan;
}

class TetrisPieceO extends TetrisPiece {
  shape = [[0,0,0,0,0],
           [0,1,1,0,0],
           [0,1,1,0,0],
           [0,0,0,0,0],
           [0,0,0,0,0]];
  color = TetrisPieceColor.Yellow;
}

class TetrisPieceT extends TetrisPiece {
  shape = [[0,0,0,0,0],
           [0,0,0,0,0],
           [0,1,1,1,0],
           [0,0,1,0,0],
           [0,0,0,0,0]];
  color = TetrisPieceColor.Purple;
}

// Similar classes can be created for S,Z,J,L pieces

class TetrisPieceS extends TetrisPiece {
  shape = [[0,0,0,0,0],
           [0,0,0,0,0],
           [0,0,1,1,0],
           [0,1,1,0,0],
           [0,0,0,0,0]];
  color = TetrisPieceColor.Green;
}

class TetrisPieceZ extends TetrisPiece {
  shape = [[0,0,0,0,0],
           [0,0,0,0,0],
           [0,1,1,0,0],
           [0,0,1,1,0],
           [0,0,0,0,0]];
  color = TetrisPieceColor.Red;
}

class TetrisPieceJ extends TetrisPiece {
  shape = [[0,0,0,0,0],
           [0,0,0,0,0],
           [0,1,1,1,0],
           [0,0,0,1,0],
           [0,0,0,0,0]];
  color = TetrisPieceColor.Blue;
}

class TetrisPieceL extends TetrisPiece {
  shape = [[0,0,0,0,0],
           [0,0,0,0,0],
           [0,1,1,1,0],
           [0,1,0,0,0],
           [0,0,0,0,0]];
  color = TetrisPieceColor.Orange;
}

const tetrisPieceFactory = (type: TetrisPieceType) => {
  switch (type) {
    case TetrisPieceType.I:
      return new TetrisPieceI();
    case TetrisPieceType.O:
      return new TetrisPieceO();
    case TetrisPieceType.T:
      return new TetrisPieceT();
    case TetrisPieceType.S:
      return new TetrisPieceS();
    case TetrisPieceType.Z:
      return new TetrisPieceZ();
    case TetrisPieceType.J:
      return new TetrisPieceJ();
    case TetrisPieceType.L:
      return new TetrisPieceL();
    default:
      throw new Error('Invalid Tetris piece type');
  }
};

const tetrisSingleton = (() => {
  let instance: TetrisPiece | null = null;

  return {
    getInstance: function(type: TetrisPieceType) {
      if (instance === null) {
        instance = tetrisPieceFactory(type);
      }
      return instance;
    }
  };
})();

// Example usage:
const pieceI = tetrisPieceFactory(TetrisPieceType.I);
const pieceO = tetrisPieceFactory(TetrisPieceType.O);