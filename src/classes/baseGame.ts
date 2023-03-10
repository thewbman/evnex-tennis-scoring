import MatchConfiguration from '../types/matchConfiguration';

/**
 * Abstract Class BaseGame.
 *
 * @class BaseGame
 */
export default class BaseGame {
    matchConfiguration: MatchConfiguration;

    p1points: number = 0;
    p2points: number = 0;

    winner: string | null = null;

    minimumPointsToWin: number;
    minimumPointsMoreThanOpponent: number;

    /**
     *
     */
    constructor(config: MatchConfiguration, minimumPointsToWin: number, minimumPointsMoreThanOpponent: number) {
        if (this.constructor == BaseGame) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        if (!config.Player1 || !config.Player2) {
            throw new Error("Valid values must be passed for the player names of the match");
        }

        if (config.Player1 === config.Player2) {
            throw new Error("Player names must be unique");
        }

        this.matchConfiguration = config;
        this.minimumPointsToWin = minimumPointsToWin;
        this.minimumPointsMoreThanOpponent = minimumPointsMoreThanOpponent;
    }


    scorePoint(player: string) {
        if (this.isComplete()) {
            throw new Error(`You cannot score additional points once a game is complete. The games has already been won by ${this.winner}`);
        }

        if (player === this.matchConfiguration.Player1) {
            this.p1points++;
        } else if (player === this.matchConfiguration.Player2) {
            this.p2points++;
        } else {
            throw new Error("The player name must match an existing player name of this game");
        }

        this.isComplete();  // check and set the winner of the game after each point is scored
        return;
    }

    isComplete(): boolean {
        if (this.winner) {
            return true;
        }

        if (
            (this.p1points >= this.minimumPointsToWin)
            &&
            ((this.p1points - this.p2points) >= this.minimumPointsMoreThanOpponent)
        ) {
            this.winner = this.matchConfiguration.Player1;
            return true;
        }


        if (
            (this.p2points >= this.minimumPointsToWin)
            &&
            ((this.p2points - this.p1points) >= this.minimumPointsMoreThanOpponent)
        ) {
            this.winner = this.matchConfiguration.Player2;
            return true;
        }

        return false;
    }

    getWinner(): string | null {
        return this.winner;
    }

    getScore(): string {
        throw new Error("Each class that extends this base class must overwrite the getScore function")
    }
}