"use server" // if u dont add server here the prisma call or db call will happen on button client mean on frontend
// but we want to it from server
// Server Actions are asynchronous functions that execute on the server and can 
// be called from client components. They're particularly useful for handling form submissions, data mutations, and other server-side operations.

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnrampTransactions(addAmount:number, provider:string){
   const token = Math.random().toString(); 
   const session = await getServerSession(authOptions)
   const userId = session.user.id
   if (!userId){
        return {
            msg:"user not logged in"
        }
   }
   await prisma.onRampTransactions.create({data:{
  userId:Number(userId),
 amount:addAmount, 
 provider,
 status:"Processing",
 token,
 startTime: new Date(),
   }})
   return {
    msg:"on Ramp txn done"
   }
}