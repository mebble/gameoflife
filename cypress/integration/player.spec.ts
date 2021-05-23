import { Cell } from '../../src/models';
import { neighbourhood, reconcile, Position } from '../../src/player';

describe('neighbourhood', () => {
    it('should return neighbours of an x,y pair and itself', () => {
        const neighbours = neighbourhood(3, 4);

        expect(neighbours).to.deep.equal([
            [[2, 3], [3, 3], [4, 3]],
            [[2, 4], [3, 4], [4, 4]],
            [[2, 5], [3, 5], [4, 5]]
        ]);
    });
});

describe('reconcile', () => {
    it('should return all dead cells when no cells are passed in', () => {
        const positions: Position[] = [
            [0, 0],
            [0, 1],
            [0, 2],
        ];

        const cells = reconcile(positions, []);

        expect(cells).to.deep.equal([
            new Cell(0, 0, 'dead'),
            new Cell(0, 1, 'dead'),
            new Cell(0, 2, 'dead'),
        ]);
    });

    it('should return no cells when no positions are passed in', () => {
        const cells: Cell[] = [
            new Cell(0, 0, 'dead'),
            new Cell(0, 1, 'alive'),
            new Cell(0, 2, 'dead'),
        ];

        const newCells = reconcile([], cells);

        expect(newCells).to.deep.equal([]);
    });


    it('should set the state of the position to the cell that it coincides with', () => {
        const positions: Position[] = [
            [0, 0],
            [0, 1],
            [0, 2],
        ];
        const cells: Cell[] = [
            new Cell(0, 1, 'alive'),
            new Cell(0, 2, 'dead'),
        ];

        const newCells = reconcile(positions, cells);

        expect(newCells).to.deep.equal([
            new Cell(0, 0, 'dead'),
            new Cell(0, 1, 'alive'),
            new Cell(0, 2, 'dead'),
        ]);
    });
});
