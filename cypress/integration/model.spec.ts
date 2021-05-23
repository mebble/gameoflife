import { Cell } from '../../src/models';

describe('isAlive', () => {
    it('should be true when state is alive', () => {
        const cell = new Cell(10, 10, 'alive');

        expect(cell.isAlive()).to.be.true;
    });

    it('should be false when state is dead', () => {
        const cell = new Cell(10, 10, 'dead');

        expect(cell.isAlive()).to.be.false;
    });
});
