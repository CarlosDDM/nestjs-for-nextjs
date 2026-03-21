import path from 'path';
import { v4 as uuidV4 } from 'uuid';

export function generateImageFilename(filename: string) {
  const extension = path.extname(filename).toLowerCase();

  return `${uuidV4()}${extension}`;
}
