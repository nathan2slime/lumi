import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ParserFile } from '../app.dto';

describe('ParserFile', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', async () => {
    const data = { file_name: expect.anything() };

    const parserFile = plainToInstance(ParserFile, data);
    const errors = await validate(parserFile);

    expect(errors.length).toBe(0);
    expect(parserFile).not.toBeNull();
  });

  it('should return errors when it has invalid data', async () => {
    const data = {};

    const parserFile = plainToInstance(ParserFile, data);
    const errors = await validate(parserFile);

    expect(errors.length).not.toBe(0);
    expect(parserFile).not.toBeNull();
  });
});
