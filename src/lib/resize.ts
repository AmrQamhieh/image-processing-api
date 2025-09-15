import sharp from 'sharp';

export async function resizeToFile(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    throw new RangeError('width and height must be positive integers');
  }
  await sharp(inputPath).resize({ width, height, fit: 'cover' }).toFile(outputPath);
}
