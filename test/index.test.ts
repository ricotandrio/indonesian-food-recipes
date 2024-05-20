import { describe, it } from 'bun:test';
import { UtilTest } from './test-util';

describe('Fill Database with Recipe Category', () => {
  it('should fill Recipe Category table', async () => {
    try {
      await UtilTest.createCategory();
    } catch (error) {
      console.error(error);
    }
  });
})

describe('Fill Database with Recipe Data', () => {
  it('should fill Ayam Recipe', async () => {
    try {
      await UtilTest.readFrom('../dataset/dataset-ayam.csv', 'ayam');
    } catch (error) {
      console.error(error);
    }
  });
});