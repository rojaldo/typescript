namespace Tetris {
    export class NextPieceGenerator {
        private nextPiece: TetrisPiece;
        private invoker: Invoker;
        private piecesIterator: piecesIterator;

        constructor() {
            this.nextPiece = TetrisFactory.createPiece(TetrisPieceType.I); // Pieza por defecto
            this.invoker = new Invoker();
            this.piecesIterator = new piecesIterator();
        }

        generateNextPiece(): TetrisPiece {
            // Genera la siguiente pieza usando el iterador
            const next = this.piecesIterator.next();
            if (next) {
                this.nextPiece = next;
            } else {
                // Si no hay más piezas, reinicia el iterador
                this.piecesIterator = new piecesIterator();
                this.nextPiece = this.piecesIterator.next()!;
            }
            this.invoker.setOnStart(new NewPieceCommand());
            this.invoker.askForNewPiece();
            return this.nextPiece;
        }
    }

    class piecesIterator {
        private pieces: TetrisPiece[];
        private index: number;

        constructor() {

            // genera 70 piezas , 10 de cada tipo
            const pieces: TetrisPiece[] = [];
            for (let i = 0; i < 10; i++) {
                pieces.push(TetrisFactory.createPiece(TetrisPieceType.I));
                pieces.push(TetrisFactory.createPiece(TetrisPieceType.O));
                pieces.push(TetrisFactory.createPiece(TetrisPieceType.T));
                pieces.push(TetrisFactory.createPiece(TetrisPieceType.S));
                pieces.push(TetrisFactory.createPiece(TetrisPieceType.Z));
                pieces.push(TetrisFactory.createPiece(TetrisPieceType.J));
                pieces.push(TetrisFactory.createPiece(TetrisPieceType.L));
            }   
            // mezcla las piezas
            for (let i = pieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
            }
            this.pieces = pieces;
            this.index = 0;
        }

        next(): TetrisPiece | null {
            if (this.index < this.pieces.length) {
                return this.pieces[this.index++];
            }
            return null; // No hay más piezas
        }
    }
}