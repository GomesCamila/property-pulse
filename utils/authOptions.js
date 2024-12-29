import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        //On successful sign in
        async signIn({ profile }) {
            //Connect to database
            await connectDB();
            //Check if user exists
            const userExists = await User.findOne({ email: profile.email });
            //If not, create user
            if (!userExists) {
                // Truncate usernmame if it's too long
                const username = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    username: username,
                    image: profile.image,
                });
            }
            //Return true to allow sign in
            return true;
        },
        //Modifies the session object
        async session({ session }) {
            //Get user from database
            const user = await User.findOne({ email: session.user.email });
            //Assign the user id to the session
            session.user.id = user._id.toString();
            //Return session
            return session;
        },
    },
};
