import Github from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
 export const authOptions = {
    providers :[
        GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ||"", // the type is string and ee passing .env which is undefined
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "" // process.env.SOMETHING ereturns string or undefined if it is not present in .env thats why
  }),
  Github({
    clientId:process.env.GITHUB_CLIENT || "",
    clientSecret:process.env.GITHUB_SECRET || ""
  })
    ]    
}