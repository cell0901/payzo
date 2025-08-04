"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2ptransfer(amount: number, to: string) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
   
    if (!userId) {
        return {
            msg: "user is logged int"
        }
    }

    const receiver = await prisma.user.findFirst({
        where: {
            number: to
        }

    })
    if (!receiver) {
        return {
            msg: "user not found"
        }
    }

    // since deductnig from one balance row to another we need to make sure all happens in one txn or nothing happens
    // so we use Txns
    prisma.$transaction(async (tx:any) => { 
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"= ${Number(userId)} FOR UPDATE`; 

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(userId) }

        })
        if (!fromBalance || fromBalance.amount < amount) { 
            throw new Error("insufficiet funds");
        }





        await tx.balance.update({

            where: {
                userId: Number(userId)
            },
            data: {
                amount: {
                    decrement: amount // needs to multiplied by 100 while using the passing the props
                }
            }
        })

        await tx.balance.update({
            where: {
                userId: receiver.id
            },
            data: {
                amount: {
                    increment: amount 
                }

            }
        })
    await tx.p2Ptransfer.create({data:{
        fromUserId:Number(userId),
        toUserId:receiver.id,
        amount,
        timeStamp:new Date()
    }})
    })
}