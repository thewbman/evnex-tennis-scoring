import MatchConfiguration from '../types/matchConfiguration';
import BaseGame from './baseGame';

export default class TieBreakerGame extends BaseGame {

    /**
     * Create a tie-breaker game to score as the final game in a set (if players were tied at 6-6 games)
     */
    constructor(config: MatchConfiguration) {
        super(
            config,
            7, //minimumPointsToWin
            2 //miimumPointsMoreThanOpponent
        );
    }

    // Return the current score of the current game
    getScore(): string {
        if (this.winner) {
            return `${this.winner} won`
        }

        return `${this.p1points}-${this.p2points}`;
    }
}
