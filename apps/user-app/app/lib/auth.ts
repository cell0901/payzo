import  CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@repo/db/client"
import bcrypt from "bcrypt"; // libarary to convert usually for password into a hash that cannot be reverse engineered because thats how 
import { signIn } from "next-auth/react";
export const authOptions = {
  
    providers: [
        CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    
    credentials: {
      phone: { label: "Phone Number", type: "number", placeholder: "1212121121", required:true },
      password: { label: "Password", type: "password", required:true } 
    } ,
    
    async authorize(credentials:any) {
      const hashedPassword = await bcrypt.hash(credentials.password, 10) 

      const existingUser = await prisma.user.findFirst({where:{
        number:credentials.phone 
      }})

      // if user Exists
      if (existingUser){
        const passwordValidaiton = await bcrypt.compare(credentials.password, existingUser.password) // if user do password matching 
          if (passwordValidaiton) {
          return {
            id: existingUser.id.toString(),
            name:existingUser.name,
            email:existingUser.email
          }
        } 
      }
      // Return null if user data could not be retrieved
    return null
    } 
  })
    ],
    secret:process.env.JWT_SECRET || "secret",
    callbacks:{
     async session ({token,session}:any) {
      session.user.id = token.sub 
      return session
     }
    }
}