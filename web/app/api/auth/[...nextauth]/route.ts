import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || ''
        })
    ],
    callbacks: {
        async jwt({ token, account }: any) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            // console.log('session', session);

            // const drive = google.drive({ version: "v3", auth: token.accessToken })
            // session.drive = drive

            return session
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

