import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { CONFIG } from './config.js';
import { convertFileToBuffer } from './convertToBuffer.js';
import { MultipartFile } from '@adonisjs/core/bodyparser';

export class MinioStorageProvider {
  client: S3Client;

  constructor() {
    this.client = new S3Client({
      endpoint: CONFIG.providers.storage.endpoint,
      region: 'us-east-1',
      credentials: {
        accessKeyId: CONFIG.providers.storage.accessKeyId,
        secretAccessKey: CONFIG.providers.storage.secretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  async upload(file: MultipartFile): Promise<string> {
    const fileBuffer = await convertFileToBuffer(file);
    
    const params: any = {
      Bucket: CONFIG.providers.storage.bucket as string,
      Key: file.clientName,
      Body: fileBuffer,
    }

    try {
      const command = new PutObjectCommand(params)
      await this.client.send(command);

      const location = `${CONFIG.providers.storage.endpoint}/${CONFIG.providers.storage.bucket}/${encodeURIComponent(file.clientName)}`;
      return location;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Error uploading file');
    }
  }

  async delete(fileName: string): Promise<void> {
    const params: any = {
      Bucket: CONFIG.providers.storage.bucket as string,
      Key: fileName,
    }

    try {
      const command = new DeleteObjectCommand(params);
      await this.client.send(command);
      console.log(`File ${fileName} deleted successfully.`);
    } catch (error) {
      console.error('Delete error:', error);
      throw new Error('Error deleting file');
    }
  }
}
