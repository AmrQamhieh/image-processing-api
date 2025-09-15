import { Request, Response, NextFunction } from 'express';

export default function validateQuery(req: Request, res: Response, next: NextFunction) {
  const { filename, width, height } = req.query;

  if (!filename || typeof filename !== 'string') {
    return res.status(400).send('Missing filename parameter');
  }

  const w = Number(width);
  const h = Number(height);

  if (!Number.isInteger(w) || !Number.isInteger(h)) {
    return res.status(400).send('width and height must be integers');
  }
  if (w <= 0 || h <= 0) {
    return res.status(400).send('width and height must be positive');
  }
  if (w > 4000 || h > 4000) {
    return res.status(413).send('Requested dimensions are too large');
  }

  (req as any)._dims = { w, h }; // stash parsed numbers for handler
  return next();
}
