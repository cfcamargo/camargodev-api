import env from "#start/env";

export const CONFIG = {
    providers: {
      storage: {
        provider: 'MINIO',
        endpoint: env.get('MINIO_HOST') || '',
        bucket: env.get('MINIO_BUCKET_NAME'),
        accessKeyId: env.get('MINIO_ACCESS_KEY'),
        secretAccessKey: env.get('MINIO_SECRET_KEY'),
        signatureVersion: 'v4',
      }
    }
  }