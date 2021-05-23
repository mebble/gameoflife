import { Cell, Generation } from '../../src/models';

describe('cell isAlive', () => {
    it('should be true when state is alive', () => {
        const cell = new Cell(10, 10, 'alive');

        expect(cell.isAlive()).to.be.true;
    });

    it('should be false when state is dead', () => {
        const cell = new Cell(10, 10, 'dead');

        expect(cell.isAlive()).to.be.false;
    });
});

describe('generation play', () => {
    it('should return an empty next generation when current one is empty', () => {
        const gen = new Generation([]);

        const nextGen = gen.play();

        expect(nextGen).to.deep.equal(new Generation([]));
    });

    it('should play the box pattern', () => {
        const gen = new Generation([
            new Cell(1, 1, 'alive'),
            new Cell(2, 1, 'alive'),
            new Cell(1, 2, 'alive'),
            new Cell(2, 2, 'alive'),
        ]);

        const nextGen = gen.play();

        expect(nextGen).to.deep.equal(gen);
    });

    it('should play the blinker pattern', () => {
        const gen = new Generation([
            new Cell(2, 1, 'alive'),
            new Cell(2, 2, 'alive'),
            new Cell(2, 3, 'alive'),
        ]);

        const nextGen = gen.play();

        expect(nextGen).to.deep.equal(new Generation([
            new Cell(1, 2, 'alive'),
            new Cell(2, 2, 'alive'),
            new Cell(3, 2, 'alive'),
        ]));
    });

    it('should play the glider pattern', () => {
        const gen = new Generation([
            new Cell(2, 1, 'alive'),
            new Cell(3, 2, 'alive'),
            new Cell(1, 3, 'alive'),
            new Cell(2, 3, 'alive'),
            new Cell(3, 3, 'alive'),
        ]);

        const nextGen = gen.play();

        expect(nextGen).to.deep.equal(new Generation([
            new Cell(1, 2, 'alive'),
            new Cell(3, 2, 'alive'),
            new Cell(2, 3, 'alive'),
            new Cell(3, 3, 'alive'),
            new Cell(2, 4, 'alive'),
        ]));
    });
});
