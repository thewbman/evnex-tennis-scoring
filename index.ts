import Match from './src/classes/match'

const p1 = "player 1";
const p2 = "player 2";

const match = new Match(p1, p2);
match.pointWonBy(p1);
match.pointWonBy(p2);
// this will return "0-0, 15-15"
match.score();

match.pointWonBy(p1);
match.pointWonBy(p1);
// this will return "0-0, 40-15"
match.score();

match.pointWonBy(p2);
match.pointWonBy(p2);
// this will return "0-0, Deuce"
match.score();

match.pointWonBy(p1);
// this will return "0-0, Advantage player 1"
match.score();

match.pointWonBy(p1);
// this will return "1-0"
match.score();

