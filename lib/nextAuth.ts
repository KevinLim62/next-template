import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { encrypt } from "./cryptoUtils";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "login",
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Example of backend driven authorization
        // const res = await fetch(`${process.env.NEXT_API_URL}/auth/signIn`, {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { 'Content-Type': 'application/json' },
        // });
        // const user = await res.json();

        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: "1",
          username: "kevin",
          password: "admin123",
          role: "user",
          accessToken: "kevin480023",
          refreshToken: "kevin980602",
        };
        if (
          credentials?.username === "kevin" &&
          credentials?.password === "admin123"
        ) {
          // Encryption example
          // const encryptedToken = encrypt({
          //   accessToken: user.accessToken,
          //   refreshToken: user.refreshToken,
          // });

          cookies().set(
            "sessionToken",
            "cca1bad77907f4a42fbd2d41c0a50ca3:49e2f42da54f052e9e9e9d9e863fb9fd6a26868e73f44691b9ec044f010e0be62b3e1249a2667d84bc7252d70132588ad6480c94dfae75da60fc797f23266530",
            {
              httpOnly: true,
            }
          );
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id,
            username: user.username,
            role: user.role,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      // if (trigger === 'update' && session) {
      //   return { ...token, ...session?.user };
      // }
      return { ...token, ...user };
    },
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        ...token,
      };

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
    };
  }
}
