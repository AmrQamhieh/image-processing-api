import { Router } from 'express';
import path from 'path';
import fs from 'fs/promises';
import validateQuery from '../middleware/validateQuery';
import { resizeToFile } from '../lib/resize';

const router = Router();

router.get('/', validateQuery, async (req, res) => {
  const { w, h } = (req as any)._dims as { w: number; h: number };
  const name = (req.query.filename as string).trim();

  const source = path.resolve('assets/source', `${name}.jpg`);
  const cacheDir = path.resolve('assets/cache');
  const cached = path.join(cacheDir, `${name}_${w}x${h}.jpg`);

  // Ensure source exists
  try {
    await fs.access(source);
  } catch {
    return res.status(404).send('Image file not found');
  }

  // Serve from cache if exists
  try {
    await fs.access(cached);
    return res.sendFile(cached);
  } catch {
    // cache miss — continue
  }

  try {
    await fs.mkdir(cacheDir, { recursive: true });
    await resizeToFile(source, cached, w, h);
    return res.sendFile(cached);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).send('Failed to process image');
  }
});

export default router;
