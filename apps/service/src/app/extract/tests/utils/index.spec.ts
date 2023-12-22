import { fieldParserByRegex } from '../../utils';

describe('Extract', () => {
  describe('utils', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return decoded URL', () => {
      const uri = '%20%20%20434%20%2042342';
      const num = '42342';
      const regex = /[\s]*([\d]+)[^\d]*$/;

      const res = fieldParserByRegex(uri, regex);

      expect(res).toBe(num);
    });

    it('must return null when parser is invalid', () => {
      const uri = '%20%20%20%20';
      const regex = /[\s]*([\d]+)[^\d]*$/;

      const res = fieldParserByRegex(uri, regex);

      expect(res).toBeNull();
    });
  });
});
