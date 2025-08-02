import express from "express";
import prisma from "@repo/db/client";
const app = express();
app.use(express.json())
app.post("/hdfcbank", async (req, res) => {
 
  const paymentinfo:{
    token:string,
    userId:string,
    amount:string
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,


  };
  // this will get the token and find the first transaction with this token if it have processing state then we stop the process else continue
  const isProcessing = await prisma.onRampTransactions.findFirst({where:{
  token:paymentinfo.token
  },
})

if (isProcessing?.status === "Success"){
  return {
    msg:"The balance is already updated "  // this will return since 
  }
}
  // update balance in db and txn
  // will use TRANSANCTIOns because what if first request goes then db went down and we return 500 status code then money will be refunded
  // but the db will be updated and the Onramp table will not be updated
  try {
    await prisma.$transaction([ // this will send either both calls or none
      prisma.balance.update({
        where: {
          userId: Number(paymentinfo.userId),
        },
        data: {
          amount: {
            increment: Number (paymentinfo.amount) , // this increment function in prisma allows us to increment the data field not just update
            // as we are storing money so we cant update instead add
          }
        }
      }),
      prisma.onRampTransactions.update({
        where: { token: paymentinfo.token },
        data: {
          status: "Success",
        }
      })
    ]);
  res.status(200).json({msg:"caputred"})
  } catch (e) {console.log(e)
   
  res.status(411).json({ msg: "error while parsing webhook" }); // the bank will refund the money
  }

  // but the money in db will be updated
});
// need balances table
//
app.listen(3003)