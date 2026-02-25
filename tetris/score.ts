namespace Tetris {

    export class TetrisScore {
        private mediator!: TetrisScoreMediator;
        private score: number;

        constructor() {
            this.score = 0;
        }

        setMediator(mediator: TetrisScoreMediator) {
            this.mediator = mediator;
        }

        updateScore(newScore: number) {
            this.score = newScore;
            console.log(`Score updated: ${this.score}`);
        }
    }
}