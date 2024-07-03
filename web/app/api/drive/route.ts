export async function GET(request: Request, res: Response) {
    try {
        // const keyFile = './key.json';
        // const keyFile = require('./key.json');

        // const auth = new google.auth.GoogleAuth({
        //     keyFile: keyFile,
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly']
        // });
        // console.log('auth', auth);


        // const drive = google.drive({ version: "v3", auth: "ya29.a0AXooCgukeuQNlMgEvuoxQHlE87FqFld9Aby0Gr5wyyeG5rGjdQZTMR8WC8jpbd5FedRB7HCNBxOtc7csbHZWg5FNejjPHNlTl-j3j12ZKzyLdSCXS7SmOvDwf68pto8aATWYm2FCwmEWslt4fZgg_pUitqvDGgNed6DDaCgYKAeESARASFQHGX2MiRLm7JTNSmB8oqQJ49GM5SA0171" });
        // try {
        //     const response = await drive.files.list({
        //         pageSize: 10,
        //         fields: 'nextPageToken, files(id, name)',
        //     });
        //     console.log('response', response);

        // } catch (error) {
        //     console.error('Google API Client returned an error:', error);
        //     return new Response(JSON.stringify({ message: error.errors }));
        // }

        // console.log('response', response);

        return new Response(JSON.stringify({ message: 'drive' }));
    } catch (error) {
        console.log('error', error);

    }
    // const session: any = await getSession();
    // console.log('session3', session.drive);

}