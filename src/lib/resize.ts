import sharp from 'sharp';

export async function resizeToFile(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> {
  await sharp(inputPath).resize({ width, height, fit: 'cover' }).toFile(outputPath);
}
