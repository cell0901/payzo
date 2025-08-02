import prisma from "@repo/db/client";
import { P2Ptransfer } from "../../../components/P2Ptransfer";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getp2ptransfer(){
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        const p2p = await prisma.p2Ptransfer.findMany({where:{
            OR:[
                {fromUserId:Number(userId)},
                {toUserId:Number(userId) 
                }
            ]
        },
        include:{
            fromUser:true,
            toUser:true
        }
    })
       return p2p.map(t =>({
            time:t.timeStamp,
            amount:t.amount,
            fromUserEmail:t.fromUser.email,
            toUserEmail:t.toUser.email,
            fromuserId:t.fromUserId,
            direction : t.fromUserId === Number(userId) ? "Sent" : "Received"
        }))
    }
export default async function (){
    const p2p = await getp2ptransfer()
    return <div className="w-full flex justify-between">
    P2P Transfer
    <SendCard ></SendCard>
    <P2Ptransfer p2ps={p2p}></P2Ptransfer>
    </div>
}