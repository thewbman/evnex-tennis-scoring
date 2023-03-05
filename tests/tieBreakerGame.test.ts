import TieBreakerGame from "../src/classes/tieBreakerGame";


describe('StandardGame', () => {
    describe('#constructor', () => {
        test('unique player names are required', () => {
            expect(() =>
                new TieBreakerGame({ Player1: "", Player2: "p2" })
            ).toThrow();
            expect(() =>
                new TieBreakerGame({ Player1: "p1", Player2: "" })
            ).toThrow();
            expect(() =>
                new TieBreakerGame({ Player1: "p1", Player2: "p1" })
            ).toThrow();
        });
    });

    describe('only first player scores', () => {
        const p1 = "p1", p2 = "p2";
        let game = new TieBreakerGame({ Player1: p1, Player2: p2 });

        test('starting score', () => {
            expect(game.getScore()).toBe("0-0");
            expect(game.isComplete()).toBe(false);
        });

        test('first point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("1-0");
        });

        test('second point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("2-0");
        });

        test('third point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("3-0");
        });

        test('fourth point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("4-0");
        });

        test('fifth point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("5-0");
        });

        test('sixth point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("6-0");
        });

        test('seventh point wins', () => {
            game.scorePoint(p1);
            expect(game.isComplete()).toBe(true);
            expect(game.getScore()).toBe(`${p1} won the game`);
        });
    });

    describe('alternating point scores', () => {
        const p1 = "p1", p2 = "p2";
        let game = new TieBreakerGame({ Player1: p1, Player2: p2 });

        test('starting score', () => {
            expect(game.getScore()).toBe("0-0");
            expect(game.isComplete()).toBe(false);
        });

        test('first point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("1-1");
        });

        test('second point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("2-2");
        });

        test('third point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("3-3");
        });

        test('fourth point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("4-4");
        });

        test('fifth point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("5-5");
        });

        test('sixth point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("6-6");
        });

        test('seventh point need to win by 2', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("7-6");
            game.scorePoint(p1);
            expect(game.isComplete()).toBe(true);
            expect(game.getScore()).toBe(`${p1} won the game`);
        });
    });
});