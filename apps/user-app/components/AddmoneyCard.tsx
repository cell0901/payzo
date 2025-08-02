// the name of supported banks(need to create dummy server for all)
"use client"
import prisma from "@repo/db/client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/Select"
import { TextInput } from "@repo/ui/TextInput"
import { getServerSession } from "next-auth"
import { use, useState } from "react"
import { authOptions } from "../app/lib/auth"
import { createOnrampTransactions } from "../app/lib/actions/createOnRampTxn"

const SUPPORTED_BANKS = [{ name: "HDFC BANK", redirectUrl: "https://netbanking.hdfcbank.com/" },
{ name: "Axis Bank", redirectUrl: "https://www.axisbank.com" }]

export const Addmoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl) 
    const [addAmount , setAddAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput placeholder="Amount"  label="Amount" onChange={(value 
            ) => {
                setAddAmount(Number(value));
            }}></TextInput>
            <div className="py-4 text-left">
                <Select options={SUPPORTED_BANKS.map(x => ({ key: x.name, value: x.name }))} onSelect={(value) => { setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                 }}></Select>
                {/**
                 * This safely tries to get redirectUrl only if a matching bank was found. 
                 * If not found, it returns undefined, and the fallback (|| "") sets it to an empty string.
                 */}

            </div>
            <div className="flex justify-center pt-4"><Button onClick={async() => {
                await createOnrampTransactions(addAmount * 100, provider)
                window.location.href = redirectUrl || ""; // since window.location.href is string what if redirect url is undefined we cant assign that to
                // to string so use || 
            }} >
                Add Money
            </Button>
            </div>
        </div>

    </Card>
}