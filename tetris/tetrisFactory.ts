namespace Tetris {

export class TetrisFactory {
  static createPiece(type: TetrisPieceType): TetrisPiece {
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
        throw new Error('Tipo de pieza desconocido');
    }
  }
}

}