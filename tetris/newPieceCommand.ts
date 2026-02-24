namespace Tetris {
    /**
 * The Command interface declares a method for executing a command.
 */
interface Command {
    execute(): void;
}

/**
 * Some commands can implement simple operations on their own.
 */
export class NewPieceCommand implements Command {
    private payload = true;

    constructor() {
        this.payload = true;
    }

    public execute(): void {
        console.log(`NewPieceCommand: See, I can do simple things like printing (${this.payload})`);
    }
}


export class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}

/**
 * The Invoker is associated with one or several commands. It sends a request to
 * the command.
 */
export class Invoker {
    private onStart!: Command;

    /**
     * Initialize commands.
     */
    public setOnStart(command: Command): void {
        this.onStart = command;
    }


    private isCommand(object: any): object is Command {
        return object.execute !== undefined;
    }

    public askForNewPiece(): void {
        console.log("Invoker: Does anybody want something done before I begin?");
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }
    }
}



}