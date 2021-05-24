import Cell from './Cell';

type Seed = {
    name: string,
    info: string,
    value: Cell[]
};

const seeds: Seed[] = [
    {
        name: 'Glider',
        info: 'https://conwaylife.com/wiki/Glider',
        value: [
            new Cell(2, 1, 'alive'),
            new Cell(3, 2, 'alive'),
            new Cell(1, 3, 'alive'),
            new Cell(2, 3, 'alive'),
            new Cell(3, 3, 'alive'),
        ]
    },
];

export default seeds;
