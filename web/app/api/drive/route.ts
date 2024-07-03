import { google } from "googleapis";
export async function GET(request: any) {
    try {
        // const keyFile = './key.json';
        // const keyFile = require('./key.json');

        // const auth = new google.auth.GoogleAuth({
        //     keyFile: keyFile,
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly']
        // });
        // console.log('auth', auth);


        const drive = google.drive({ version: "v3", auth: request.token });
        try {
            const response = await drive.files.list({
                pageSize: 10,
                fields: 'nextPageToken, files(id, name)',
            });
            console.log('response', response);

        } catch (error) {
            console.error('Google API Client returned an error:', error);
        }

        // console.log('response', response);

        return new Response(JSON.stringify({ message: drive }));
    } catch (error) {
        console.log('error', error);

    }
    // const session: any = await getSession();
    // console.log('session3', session.drive);

}