import { google } from "googleapis";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
        scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file',
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code'
    });

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file email',
                    prompt: 'consent',
                    access_type: 'offline'
                },
                url: GOOGLE_AUTHORIZATION_URL
            }
        })
    ],
    // session: {
    //     strategy: 'jwt'
    // },
    callbacks: {
        async jwt({ token, account }: any) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        callbacks: {
            async signIn({ user, account, profile }: any) {
                console.log('account', account);


                return true;
            }
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            console.log('token', token);
            // console.log('session', session);


            // console.log('session', session);
            console.log('token.accessToken', token.accessToken);


            const drive = google.drive({ version: "v3", auth: token.accessToken })
            try {
                const response = await drive.files.list({
                    pageSize: 10,
                    fields: 'nextPageToken, files(id, name)',
                });
                console.log('response', response);

            } catch (error) {
                console.error('Google API Client returned an error:', error.errors);
                // return new Response(JSON.stringify({ message: error.errors }));
            }

            return session
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

