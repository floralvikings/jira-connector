import { Author } from './author';
import { Properties } from './properties';

export interface AttachmentMetadata {
  id: number;
  self: string;
  filename: string;
  author: Author;
  created: string;
  size: number;
  mimeType: string;
  properties: Properties;
  content: string;
  thumbnail: string;
}

export interface AttachmentSettings {
  enabled: boolean;
  uploadLimit: number;
}
