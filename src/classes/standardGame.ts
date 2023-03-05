import MatchConfiguration from '../types/matchConfiguration';
import BaseGame from './baseGame';

function pointDisplayValue(p: number): string {
    if (p === 0) {
        return "0";
    }
    if (p === 1) {
        return "15";
    }
    if (p === 2) {
        return "30";
    }
    if (p === 3) {
        return "40";
    }
    return `The score should be displayed with the deuce/advantage display rules`;
}


export default class StandardGame extends BaseGame {

    /**
     * Create a stndard game to score
     */
    constructor(config: MatchConfiguration) {
        super(
            config,
            4, //minimumPointsToWin
            2 //minimumPointsMoreThanOpponent
        );
    }

    // Return the current score of the current game
    getScore(): string {
        if (this.winner) {
            return `${this.winner} won the game`
        }

        // custom scoring text for scoring when both players have at least 3 points
        if (this.p1points >= 3 && this.p2points >= 3) {
            if (this.p1points === this.p2points) {
                return 'Deuce'
            }
            
            if (this.p1points > this.p2points) {
                return `Advantage ${this.matchConfiguration.Player1}`
            }

            return `Advantage ${this.matchConfiguration.Player2}`
        }

        return `${pointDisplayValue(this.p1points)}-${pointDisplayValue(this.p2points)}`;
    }
}