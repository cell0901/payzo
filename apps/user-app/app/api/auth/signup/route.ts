import prisma from "@repo/db/client"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
export const POST=async (req:NextRequest) =>{

    const body = await req.json();
   const existsUser = await prisma.user.findFirst({where:{
    number:body.number

   }}) 
   if (existsUser){
    return NextResponse.json({msg:"user already exits"})
   }

const hashedpassword = await bcrypt.hash(body.password, 10)
   const newuser = await prisma.user.create({data:{
    email:body.email ,
    name:body.name,
    number:body.number,
    password: hashedpassword
   }})
   
   try {
    if (newuser){
     return NextResponse.json({msg:"user created successfully"})
    } 
   } catch (error) {
   return NextResponse.json({msg:"some error occured or user already exists", error}) 
   }
}