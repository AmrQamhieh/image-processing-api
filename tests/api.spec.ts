import request from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs/promises';

const cacheFile = path.resolve('assets/cache', 'fjord_100x100.jpg');
const sourceFile = path.resolve('assets/source', 'fjord.jpg');

describe('API /api/images (integration)', () => {
  beforeAll(async () => {
    await fs.access(sourceFile); // ensure source image exists
    await fs.rm(cacheFile, { force: true });
  });

  it('200 on valid request and writes cached image', async () => {
    const res = await request(app).get('/api/images?filename=fjord&width=100&height=100');
    expect(res.status).toBe(200);
    // proves real HTTP response with an image body
    expect(res.headers['content-type']).toMatch(/image\/jpeg/i);
    await expectAsync(fs.access(cacheFile)).toBeResolved();
  });

  it('400 on invalid dimensions', async () => {
    const res = await request(app).get('/api/images?filename=fjord&width=-1&height=0');
    expect(res.status).toBe(400);
  });

  it('404 on non-existent source image', async () => {
    const res = await request(app).get('/api/images?filename=notthere&width=100&height=100');
    expect(res.status).toBe(404);
  });

  it('400 when a required parameter is missing (height)', async () => {
    const res = await request(app).get('/api/images?filename=fjord&width=100');
    expect(res.status).toBe(400);
  });
});
