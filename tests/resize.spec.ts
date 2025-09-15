import path from 'path';
import fs from 'fs/promises';
import { resizeToFile } from '../src/lib/resize';

describe('resizeToFile', () => {
  const src = path.resolve('assets/source', 'fjord.jpg');
  const out = path.resolve('assets/cache', 'unit_fjord_50x60.jpg');

  beforeAll(async () => {
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.rm(out, { force: true });
  });

  it('creates an output file with the requested size', async () => {
    await resizeToFile(src, out, 50, 60);
    await expectAsync(fs.access(out)).toBeResolved();
  });
});
