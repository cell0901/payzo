import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
import { Addmoney } from "../../../components/AddmoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";


async function updateBalance(){
}
async function getBalance() {
    const sesssion = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(sesssion?.user?.id) 
        },
    })
    return {
        amount: balance?.amount || 0, // balance could possibly null meaning NaN hence how can we find .amount on that
        locked: balance?.locked || 0
    }

}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions)
    const transactions = await prisma.onRampTransactions.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return transactions.map(t => ({ // will return an array of objects with these props
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))

}

export default async function () {
   const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
            <Addmoney></Addmoney>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                <OnRampTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    </div> 
}