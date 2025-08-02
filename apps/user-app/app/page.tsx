// update this page so either the user goes to sign page if they arent logged using servers Session or dashbaord if they are logged in
// import {useBalance }from "@repo/store/balance"
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
// get server session is for if user logged in or not and useSession if user is logged and get the details
export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session?.user){
    redirect('/dashboard')
  } else {
    redirect('api/auth/signin')
  }
}
