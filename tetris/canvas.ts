namespace Tetris {
    export class TetrisCanvas {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;

        // invoker para el comando de nueva pieza
        private invoker: Invoker;
        private mediator!: TetrisScoreMediator;

        constructor(canvasId: string) {
            this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
            this.context = this.canvas.getContext('2d')!;
            this.invoker = new Invoker();
        }

        drawPiece(piece: TetrisPiece, x: number, y: number) {
            const blockSize = 30; // Tamaño de cada bloque
            for (let row = 0; row < piece.shape.length; row++) {
                for (let col = 0; col < piece.shape[row].length; col++) {
                    if (piece.shape[row][col] === 1) {
                        this.context.fillStyle = piece.color;
                        this.context.fillRect(
                            (x + col) * blockSize,
                            (y + row) * blockSize,
                            blockSize,
                            blockSize
                        );
                    }
                }
            }
        }

        clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        pieceOnFloor(piece: TetrisPiece, x: number, y: number): boolean {
            // manda el comando para generar una nueva pieza
            this.invoker.setOnStart(new NewPieceCommand());
            this.invoker.askForNewPiece();
            return true;
        }

        setMediator(mediator: TetrisScoreMediator) {
            // Aquí podrías guardar una referencia al mediador si es necesario
            this.mediator = mediator;
        }

    }
}