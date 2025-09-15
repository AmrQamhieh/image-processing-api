import request from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs/promises';

const cacheFile = path.resolve('assets/cache', 'fjord_100x100.jpg');
const sourceFile = path.resolve('assets/source', 'fjord.jpg');

describe('API /api/images', () => {
  beforeAll(async () => {
    await fs.access(sourceFile); // make sure you add assets/source/fjord.jpg
    await fs.rm(cacheFile, { force: true });
  });

  it('returns 200 and writes cached image for a valid request', async () => {
    const res = await request(app).get('/api/images?filename=fjord&width=100&height=100');
    expect(res.status).toBe(200);
    await expectAsync(fs.access(cacheFile)).toBeResolved();
  });

  it('returns 400 for invalid dimensions', async () => {
    const res = await request(app).get('/api/images?filename=fjord&width=-1&height=0');
    expect(res.status).toBe(400);
  });

  it('returns 404 for a non-existent source image', async () => {
    const res = await request(app).get('/api/images?filename=notthere&width=100&height=100');
    expect(res.status).toBe(404);
  });
});
