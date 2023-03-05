import Match from "../src/classes/match";
import TieBreakerGame from "../src/classes/tieBreakerGame";

describe('Match', () => {
    describe('#constructor', () => {
        test('unique player names are required', () => {
            expect(() =>
                new Match("", "p2")
            ).toThrow();
            expect(() =>
                new Match("p1", "")
            ).toThrow();
            expect(() =>
                new Match("p2", "p2")
            ).toThrow();
        });
    });

    describe('only first player scores', () => {
        const p1 = "p1", p2 = "p2";
        const standardGamePointsToWin = 4;
        const minimumGamesToWin = 6;
        let match = new Match(p1, p2);

        test('starting score', () => {
            expect(match.getScore()).toBe("0-0");
            expect(match.isComplete()).toBe(false);
        });

        test('first player wins first game', () => {
            for (let p = 0; p < standardGamePointsToWin; p++) {
                if (p === 0) {
                    expect(match.getScore()).toBe("0-0");
                } else {
                    expect(match.getScore()).toContain("0-0, ");
                }
                match.pointWonBy(p1);
            }
            expect(match.getScore()).toBe("1-0");
            expect(match.isComplete()).toBe(false);
        });

        test('first player wins second through fifth game', () => {
            const gameNumbers: number[] = [1, 2, 3, 4]; // number of completed games at the beginning of the loop
            for (let completedGameNum of gameNumbers) {
                expect(match.getScore()).toBe(`${completedGameNum}-0`);

                for (let p = 0; p < standardGamePointsToWin; p++) {
                    if (p === 0) {
                        expect(match.getScore()).toBe(`${completedGameNum}-0`);
                    } else {
                        expect(match.getScore()).toContain(`${completedGameNum}-0, `);
                    }
                    match.pointWonBy(p1);
                }

                expect(match.getScore()).toBe(`${(completedGameNum + 1)}-0`);
                expect(match.isComplete()).toBe(false);
            }
        });

        test('first player wins sixth/final game', () => {
            for (let p = 0; p < standardGamePointsToWin; p++) {
                if (p === 0) {
                    expect(match.getScore()).toBe("5-0");
                } else {
                    expect(match.getScore()).toContain("5-0, ");
                }
                match.pointWonBy(p1);
            }
            expect(match.getScore()).toBe(`${p1} won the match`);
            expect(match.isComplete()).toBe(true);
        });
    });

    describe('alternating game wins', () => {
        const p1 = "p1", p2 = "p2";
        const standardGamePointsToWin = 4;
        const tieBreakerPointsToWin = 7;
        const minimumGamesToWin = 6;
        let match = new Match(p1, p2);

        test('starting score', () => {
            expect(match.getScore()).toBe("0-0");
            expect(match.isComplete()).toBe(false);
        });

        test('win one game each', () => {
            for (let p = 0; p < standardGamePointsToWin; p++) {
                match.pointWonBy(p1);
            }
            expect(match.getScore()).toBe("1-0");
            for (let p = 0; p < standardGamePointsToWin; p++) {
                match.pointWonBy(p2);
            }
            expect(match.getScore()).toBe("1-1");
        });

        test('win alternating games two through sixth', () => {
            const gameNumbers: number[] = [1, 2, 3, 4, 5]; // number of completed games at the beginning of the loop
            for (let completedGameNum of gameNumbers) {
                expect(match.getScore()).toBe(`${completedGameNum}-${completedGameNum}`);

                for (let p = 0; p < standardGamePointsToWin; p++) {
                    match.pointWonBy(p1);
                }
                expect(match.getScore()).toBe(`${(completedGameNum + 1)}-${completedGameNum}`);

                for (let p = 0; p < standardGamePointsToWin; p++) {
                    match.pointWonBy(p2);
                }
                expect(match.getScore()).toBe(`${(completedGameNum + 1)}-${(completedGameNum + 1)}`);
            }
        });

        test('tied at 6 games uses a tiebreaker game', () => {
            expect(match.getScore()).toBe(`6-6`);
            match.pointWonBy(p2); // setting the next current game only occurs after first point scored
            expect(match.currentSet?.currentGame).toBeInstanceOf(TieBreakerGame);
            for (let p = 1; p < tieBreakerPointsToWin; p++) { // already scored first point so start loop at 1
                match.pointWonBy(p2);
            }
            expect(match.getScore()).toBe(`${p2} won the match`);
            expect(match.isComplete()).toBe(true);
        });
    });
});