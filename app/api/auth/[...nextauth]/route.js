import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/user";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }),
    ],
    callbacks: {
        async session({ session }) {
             const sessionUser = await User.findOne({ email: session?.user.email });
            session.user.id = sessionUser?._id.toString();
             return session;
        },
        async signIn({ user, account, profile, email, credentials } ) {
             try {
                await connectDB();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                    });

                }
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
});
export { handler as GET,handler as POST };
