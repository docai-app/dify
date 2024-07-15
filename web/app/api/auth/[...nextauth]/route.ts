// import { OAuth2Client } from 'google-auth-library';
// import { google } from "googleapis";
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

async function refreshAccessToken(token: any) {
    try {
        const url =
            'https://oauth2.googleapis.com/token?' +
            new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID || '',
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken
            })

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: 'profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file email openid',
                    prompt: 'consent',
                    access_type: 'offline'
                },
                // url: GOOGLE_AUTHORIZATION_URL
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    // session: {
    //     strategy: 'jwt'
    // },
    callbacks: {
        async jwt({ token, user, account }: any) {
            // Persist the OAuth ,access_token to the token right after signin
            // console.log('account', account);

            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: account.refresh_token,
                    user
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            }
            // console.log('token', token);

            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
        async signIn({ user, account, profile }: any) {
            // console.log('account', account);
            // console.log('user', user);

            return true;
        }
        ,
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.user = token.user
            // console.log('token', token);
            // const oauth2Client = new OAuth2Client();
            // oauth2Client.setCredentials({ access_token: token.accessToken });
            // // 创建 Drive API 客户端
            // const drive = google.drive({ version: 'v3', auth: oauth2Client });
            // try {
            //     const response = await drive.files.list({
            //         pageSize: 10,
            //         fields: 'nextPageToken, files(id, name)',
            //     });
            //     console.log('files', response.data.files);

            // } catch (error: any) {
            //     console.error('Google API Client returned an error:', error.errors);
            // }

            return session
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

