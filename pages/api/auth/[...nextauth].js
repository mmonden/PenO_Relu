import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { verifyUser } from "../../../lib/users"


export default NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text", placeholder: "j.smith@email.com"},
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials, req) {
        const {authenticated, user} = await verifyUser(credentials);
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
    // EmailProvider({
    //     server: {
    //       host: process.env.EMAIL_SERVER_HOST,
    //       port: process.env.EMAIL_SERVER_PORT,
    //       auth: {
    //         user: process.env.EMAIL_SERVER_USER,
    //         pass: process.env.EMAIL_SERVER_PASSWORD
    //       }
    //     },
    //     from: process.env.EMAIL_FROM,
    //     sendVerificationRequest({
    //       identifier: email,
    //       url,
    //       provider: { server, from },
    //     }) {
    //       /* your function */
    //     },
    //   }),
    // // ...add more providers here
  ],
  secret: "m9UgdB9MZDBY91YZmqklmFEaJhAjHqiVah/AcDeDPmY=",
})