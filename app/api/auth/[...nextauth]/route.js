import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: { // need call back to containing the object
    async session({ session }) {
        const sessionUser = await User.findOne({ email: session.user.email}) //get current user from session
    
        session.user.id = sessionUser._id.toString(); //update id
    
        return session;
      },
    
      async signIn({ profile }) { //automaticly sign in user if does not exist
        try {
          //serverless route is will open only when is get call
          await connectToDB();
    
          // check if user already exists
          const userExist = await User.findOne({
            email: profile.email,
          });
    
          // if not, create a new user and save to database
          if (!userExist) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(), // replace a space with no space
              image:profile.picture
            });
          }
    
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
  }

});

export { handler as GET, handler as POST };
