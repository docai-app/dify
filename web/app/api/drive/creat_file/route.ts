import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { title, content, token } = await request.json();
        console.log('token', token);

        // 替换为您的访问令牌
        const accessToken = token;
        // 创建 OAuth2 客户端实例
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });
        // 创建 Drive API 客户端
        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const metadata = {
            name: title,
            mimeType: 'text/plain', // 根据内容类型设置 mimeType
        };

        const media = {
            mimeType: metadata.mimeType,
            body: content,
        };

        try {
            const res = await drive.files.create({
                requestBody: {
                    name: metadata.name,
                },
                media: media,
                fields: 'id',
            });

            console.log('File ID:', res.data.id);
            return NextResponse.json({ success: true });
        } catch (err) {
            console.error('Error creating file:', err);
            return NextResponse.json({ success: false, error: err });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: '保存出錯!' }, { status: 500 });
    }
}