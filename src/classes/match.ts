import Set from './set'
import MatchConfiguration from '../types/matchConfiguration';

export default class Match {
    matchConfiguration: MatchConfiguration;

    p1sets: number = 0;
    p2sets: number = 0;

    private winner: string | null = null;

    currentSet: Set | null = null;

    private minimumSetsToWin: number = 1;
    private minimumSetsMoreThanOpponent: number = 1;

    /**
     * Create new Match with both player names
     */
    constructor(player1: string, player2: string) {
        if (!player1 || !player2) {
            throw new Error("Valid values must be passed for the player names of the match");
        }

        if (player1 === player2) {
            throw new Error("Player names must be unique");
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

            this.isComplete(); // check and set the winner of the match only if the current set was just completed
        }
    }

    isComplete(): boolean {
        if (this.winner) {
            return true;
        }

        if (
            (this.p1sets >= this.minimumSetsToWin)
            &&
            ((this.p1sets - this.p2sets) >= this.minimumSetsMoreThanOpponent)
        ) {
            this.winner = this.matchConfiguration.Player1;
            return true;
        }


        if (
            (this.p2sets >= this.minimumSetsToWin)
            &&
            ((this.p2sets - this.p1sets) >= this.minimumSetsMoreThanOpponent)
        ) {
            this.winner = this.matchConfiguration.Player2;
            return true;
        }

        return false;
    }

    getWinner(): string | null {
        return this.winner;
    }

    // Return the current score of the current set (since only 1 set in match we never display set counts)
    getScore(): string {
        if (this.winner) {
            return `${this.winner} won the match`
        }

        return this.currentSet?.getScore() || '0-0';
    }
    // Display current score of the match and current game (if any)
    score() {
        console.log(this.getScore());
    }
}
