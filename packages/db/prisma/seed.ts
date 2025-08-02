// dont forget to update package.json to run this we need to do ts-node 
// creating sample data from seed.ts we use this for sample data as otherwise we would need to run the app the use the frontend to put the data
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

async function main() {
    const mohit = await prisma.user.upsert({
        where: { number: '1111111111' },
        update: {},
        create: {
            email: "mohit@gmail.com",
            number: '1111111111',
            password: await bcrypt.hash('mohit', 10),
            name: 'mohit',
            balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransactions: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000, 
                    token: "token__1",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    const bob = await prisma.user.upsert({
        where: { number: '2222222222' },
        update: {},
        create: {
            email: "bob@mail.com",
            number: '2222222222',
            password: await bcrypt.hash('bob', 10),
            name: 'bob',
            balance: {
                create: {
                    amount: 5000,
                    locked: 0
                }
            },
            OnRampTransactions: {
                create: {
                    startTime: new Date(),
                    status: "Failed",
                    amount: 5000,
                    token: "token__2",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    console.log({mohit, bob})
}

main()
    .then(async () => { 
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error("some error", e)
        await prisma.$disconnect() 
        process.exit(1)
    })