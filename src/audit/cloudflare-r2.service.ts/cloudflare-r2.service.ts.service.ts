// cloudflare-r2.service.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CloudflareR2Service {
    private s3Client: S3Client;
    private bucket: string;
    private accountId: string;

    constructor(private configService: ConfigService) {
        const accessKey = this.configService.get<string>('R2_ACCESS_KEY_ID')!;
        const secretKey = this.configService.get<string>('R2_SECRET_ACCESS_KEY')!;
        console.log(this.bucket, "accessKey");

        this.bucket = this.configService.get<string>('R2_BUCKET_NAME')!;
        this.accountId = this.configService.get<string>('R2_ACCOUNT_ID')!;

        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            },
            forcePathStyle: true,
        });
    }

    async uploadFile(fileBuffer: Buffer, key: string, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: 'sakksh',
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
            ACL: "public-read",
        });

        await this.s3Client.send(command);

        return `https://pub-f62426826f7c4cf493a3d47075f25372.r2.dev/${key}`;
    }
}
