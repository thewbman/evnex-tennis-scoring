import StandardGame from "../src/classes/standardGame";


describe('StandardGame', () => {
    describe('#constructor', () => {
        test('unique player names are required', () => {
            expect(() =>
                new StandardGame({ Player1: "", Player2: "p2" })
            ).toThrow();
            expect(() =>
                new StandardGame({ Player1: "p1", Player2: "" })
            ).toThrow();
            expect(() =>
                new StandardGame({ Player1: "p1", Player2: "p1" })
            ).toThrow();
        });
    });

    describe('only first player scores', () => {
        const p1 = "p1", p2 = "p2";
        let game = new StandardGame({ Player1: p1, Player2: p2 });

        test('starting score', () => {
            expect(game.getScore()).toBe("0-0");
            expect(game.isComplete()).toBe(false);
        });

        test('first point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("15-0");
        });

        test('second point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("30-0");
        });

        test('third point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("40-0");
        });

        test('fourth point wins', () => {
            game.scorePoint(p1);
            expect(game.isComplete()).toBe(true);
            expect(game.getScore()).toBe(`${p1} won the game`);
        });
    });

    describe('alternating point scores', () => {
        const p1 = "p1", p2 = "p2";
        let game = new StandardGame({ Player1: p1, Player2: p2 });

        test('starting score', () => {
            expect(game.getScore()).toBe("0-0");
            expect(game.isComplete()).toBe(false);
        });

        test('first point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("15-15");
        });

        test('second point', () => {
            game.scorePoint(p1);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("30-30");
        });

        test('third point', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe("40-30");
            game.scorePoint(p2);
            expect(game.getScore()).toBe("Deuce");
        });

        test('fourth point starts advantage/deuce scoring', () => {
            game.scorePoint(p1);
            expect(game.getScore()).toBe(`Advantage ${p1}`);
            game.scorePoint(p2);
            expect(game.getScore()).toBe("Deuce");
            game.scorePoint(p2);
            expect(game.getScore()).toBe(`Advantage ${p2}`);
            game.scorePoint(p1);
            expect(game.getScore()).toBe("Deuce");
            game.scorePoint(p2);
            expect(game.getScore()).toBe(`Advantage ${p2}`);
        });

        test('point on advantage wins', () => {
            game.scorePoint(p2);
            expect(game.isComplete()).toBe(true);
            expect(game.getScore()).toBe(`${p2} won the game`);
        });
    });
});