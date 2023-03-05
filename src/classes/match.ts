import Set from './set'
import MatchConfiguration from '../types/matchConfiguration';

export default class Match {
    matchConfiguration: MatchConfiguration;

    p1sets: number = 0;
    p2sets: number = 0;

    private winner: string | null = null;

    currentSet: Set | null = null;

    /**
     * Create new Match with both player names
     */
    constructor(player1: string, player2: string) {
        if (!player1 || !player2) {
            throw new Error("Valid values must be passed for the player names of the match");
        }

        this.matchConfiguration = {
            Player1: player1,
            Player2: player2,
        }
    }

    pointWonBy(player: string) {
        if (this.winner) {
            return `The match has already been won by ${this.winner}`;
        }

        if (!this.currentSet) {
            this.currentSet = new Set(this.matchConfiguration);
        }

        this.currentSet.scorePoint(player);

        if (this.currentSet.isComplete()) {
            if (this.currentSet.getWinner() === this.matchConfiguration.Player1) {
                this.p1sets++;
                this.currentSet = null;
            } else if (this.currentSet.getWinner() === this.matchConfiguration.Player2) {
                this.p2sets++;
                this.currentSet = null;
            } else {
                throw new Error("Invalid situation of a set won by someone not in the match")
            }
        }
    }

    // Display current score of the match and current game (if any)
    score() {
        //console.log(`${this.p1games}-${this.p2games}${(this.currentGame ? ", " + this.currentGame.score() : "")}`);
        console.log(this.currentSet?.getScore())
    }
}
