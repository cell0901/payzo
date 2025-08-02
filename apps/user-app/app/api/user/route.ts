import  prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../lib/auth"
export const GET = async () =>{
         const session = await getServerSession(authOptions) 
       if (session.user){
        return NextResponse.json({data:session.user})
       } 
        return NextResponse.json({msg:"user is not logged in"})
        }       