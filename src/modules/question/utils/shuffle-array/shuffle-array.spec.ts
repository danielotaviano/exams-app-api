import { shuffleArray } from './shuffle-array';
import { mockRandom } from 'jest-mock-random';

describe('ShuffleArray Util', () => {
  test('should return a shuffled array', () => {
    mockRandom(0.5);
    const array = [1, 2, 3, 4, 5];
    const sut = shuffleArray;
    expect(sut(array)).toEqual([1, 4, 2, 5, 3]);
  });
});
