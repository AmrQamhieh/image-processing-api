import path from 'path';
import fs from 'fs/promises';
import { resizeToFile } from '../src/lib/resize';

describe('resizeToFile (unit)', () => {
  const src = path.resolve('assets/source', 'fjord.jpg');
  const outOk = path.resolve('assets/cache', 'unit_fjord_50x60.jpg');
  const outBad = path.resolve('assets/cache', 'unit_bad.jpg');

  beforeAll(async () => {
    await fs.mkdir(path.dirname(outOk), { recursive: true });
    await fs.rm(outOk, { force: true });
    await fs.rm(outBad, { force: true });
  });

  it('creates an output file with the requested size for valid inputs', async () => {
    await resizeToFile(src, outOk, 50, 60);
    await expectAsync(fs.access(outOk)).toBeResolved();
  });

  it('throws RangeError for invalid (non-positive) dimensions', async () => {
    await expectAsync(resizeToFile(src, outBad, -1, 0)).toBeRejectedWithError(RangeError);
  });
});
