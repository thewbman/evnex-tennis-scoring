import BaseGame from "../src/classes/baseGame";

describe('BaseGame', () => {
    test('constructor of BaseGame class throws error', () => {
        expect(() => 
            new BaseGame({ Player1: "p1", Player2: "p2" }, 1, 1)
        ).toThrow();
    });
});