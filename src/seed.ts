import Cell from './Cell';

export type Seed = {
    name: string,
    info?: string,
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
    {
        name: 'Gosper Glider Gun',
        info: 'https://conwaylife.com/wiki/Gosper_glider_gun',
        value: [
            new Cell(26, 2, 'alive'),
            new Cell(24, 3, 'alive'),
            new Cell(26, 3, 'alive'),
            new Cell(14, 4, 'alive'),
            new Cell(15, 4, 'alive'),
            new Cell(22, 4, 'alive'),
            new Cell(23, 4, 'alive'),
            new Cell(36, 4, 'alive'),
            new Cell(37, 4, 'alive'),
            new Cell(13, 5, 'alive'),
            new Cell(17, 5, 'alive'),
            new Cell(22, 5, 'alive'),
            new Cell(23, 5, 'alive'),
            new Cell(36, 5, 'alive'),
            new Cell(37, 5, 'alive'),
            new Cell(2, 6, 'alive'),
            new Cell(3, 6, 'alive'),
            new Cell(12, 6, 'alive'),
            new Cell(18, 6, 'alive'),
            new Cell(22, 6, 'alive'),
            new Cell(23, 6, 'alive'),
            new Cell(2, 7, 'alive'),
            new Cell(3, 7, 'alive'),
            new Cell(12, 7, 'alive'),
            new Cell(16, 7, 'alive'),
            new Cell(18, 7, 'alive'),
            new Cell(19, 7, 'alive'),
            new Cell(24, 7, 'alive'),
            new Cell(26, 7, 'alive'),
            new Cell(12, 8, 'alive'),
            new Cell(18, 8, 'alive'),
            new Cell(26, 8, 'alive'),
            new Cell(13, 9, 'alive'),
            new Cell(17, 9, 'alive'),
            new Cell(14, 10, 'alive'),
            new Cell(15, 10, 'alive'),
        ]
    },
    {
        name: 'Simkin Glider Gun',
        info: 'https://conwaylife.com/wiki/Simkin_glider_gun',
        value: [
            new Cell(7, 7, 'alive'),
            new Cell(8, 7, 'alive'),
            new Cell(14, 7, 'alive'),
            new Cell(15, 7, 'alive'),
            new Cell(7, 8, 'alive'),
            new Cell(8, 8, 'alive'),
            new Cell(14, 8, 'alive'),
            new Cell(15, 8, 'alive'),
            new Cell(11, 10, 'alive'),
            new Cell(12, 10, 'alive'),
            new Cell(11, 11, 'alive'),
            new Cell(12, 11, 'alive'),
            new Cell(29, 16, 'alive'),
            new Cell(33, 16, 'alive'),
            new Cell(28, 17, 'alive'),
            new Cell(33, 17, 'alive'),
            new Cell(34, 17, 'alive'),
            new Cell(27, 18, 'alive'),
            new Cell(28, 18, 'alive'),
            new Cell(34, 18, 'alive'),
            new Cell(35, 18, 'alive'),
            new Cell(38, 18, 'alive'),
            new Cell(39, 18, 'alive'),
            new Cell(28, 19, 'alive'),
            new Cell(29, 19, 'alive'),
            new Cell(34, 19, 'alive'),
            new Cell(38, 19, 'alive'),
            new Cell(39, 19, 'alive'),
            new Cell(29, 20, 'alive'),
        ]
    },
    {
        name: 'Empty',
        value: []
    }
];

export default seeds;
