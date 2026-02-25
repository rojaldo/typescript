namespace Tetris {

    /**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
interface Mediator {
    notify(sender: object, event: string): void;
}

/**
 * Concrete Mediators implement cooperative behavior by coordinating several
 * components.
 */
export class TetrisScoreMediator implements Mediator {
    private component1: TetrisCanvas;

    private component2: TetrisScore;

    private score: number;
    private linesCleared: number;
    private level: number;

    constructor(c1: TetrisCanvas, c2: TetrisScore) {
        this.component1 = c1;
        this.component1.setMediator(this);
        this.component2 = c2;
        this.component2.setMediator(this);
        this.score = 0;
        this.linesCleared = 0;
        this.level = 1;
    }

    public notify(sender: object, event: string): void {
            const num = parseInt(event, 10);
            console.log('Mediator reacts on A and triggers following operations:');
            // calculate score
            this.score += num * 100; // Incrementa el puntaje por ejemplo
            this.linesCleared += num;
            if (this.linesCleared >= this.level * 10) {
                this.level++;
                console.log(`Level up! Current level: ${this.level}`);
            }
            this.component2.updateScore(this.score);
    }
}
}