import BaseGame from './baseGame'
import StandardGame from './standardGame'
import MatchConfiguration from '../types/matchConfiguration';
import TieBreakerGame from './tieBreakerGame';

export default class Set {
    matchConfiguration: MatchConfiguration;

    p1games: number = 0;
    p2games: number = 0;

    private winner: string | null = null;

    currentGame: BaseGame | null = null;

    private minimumGamesToWin: number = 6;
    private minimumGamesMoreThanOpponent: number = 2;
    private maximumGamesToWin: number = 7;

    /**
     * Create a stndard set to score
     */
    constructor(config: MatchConfiguration) {
        this.matchConfiguration = config;
    }

    scorePoint(player: string) {
        if (this.winner) {
            return `The set has already been won by ${this.winner}`;
        }

        if (!this.currentGame) {
            this.currentGame = (this.p1games === this.minimumGamesToWin && this.p2games === this.minimumGamesToWin)
                ? new TieBreakerGame(this.matchConfiguration) // tied at 6 games each uses a single tie breaker game to complete the set
                : new StandardGame(this.matchConfiguration);
        }

        this.currentGame.scorePoint(player);

        if (this.currentGame.isComplete()) {
            if (this.currentGame.getWinner() === this.matchConfiguration.Player1) {
                this.p1games++;
                this.currentGame = null;
            } else if (this.currentGame.getWinner() === this.matchConfiguration.Player2) {
                this.p2games++;
                this.currentGame = null;
            } else {
                throw new Error("Invalid situation of a game won by someone not in the match")
            }

            this.isComplete(); // check and set the winner of the set only if the current game was just completed
        }
    }

    isComplete(): boolean {
        if (this.winner) {
            return true;
        }

        if (
            (this.p1games === this.maximumGamesToWin)
            || (
                (this.p1games >= this.minimumGamesToWin)
                &&
                ((this.p1games - this.p2games) >= this.minimumGamesMoreThanOpponent)
            )
        ) {
            this.winner = this.matchConfiguration.Player1;
            return true;
        }


        if (
            (this.p2games === this.maximumGamesToWin)
            || (
                (this.p2games >= this.minimumGamesToWin)
                &&
                ((this.p2games - this.p1games) >= this.minimumGamesMoreThanOpponent)
            )
        ) {
            this.winner = this.matchConfiguration.Player2;
            return true;
        }

        return false;
    }

    getWinner(): string | null {
        return this.winner;
    }

    // Return the current score of the current game and current game (if any)
    getScore(): string {
        return `${this.p1games}-${this.p2games}${(this.currentGame ? ", " + this.currentGame.getScore() : "")}`;
    }
}