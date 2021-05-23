import { neighbourhood } from '../../src/player';

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
