import { logger } from '@lumi/log';
import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class DownloadService {
  downloadService: typeof jest;

  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async download(file: string, extension: string = '.pdf') {
    try {
      logger.info('loading storage bucket');

      const bucket = this.firebase.storage.bucket();
      const id = Math.random();

      const path = '/' + id + extension;
      const destination = __dirname + path;

      logger.info('downloading file', { file, destination });

      await bucket.file(file).download({ destination });

      logger.info('file has been downloaded', { file });

      return { path: destination, id };
    } catch (error) {
      logger.error(error);

      throw new Error('file not found');
    }
  }
}
