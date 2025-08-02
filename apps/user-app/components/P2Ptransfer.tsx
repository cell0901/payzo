import { Card } from "@repo/ui/card"
export const P2Ptransfer = ({p2ps}:{p2ps:{
    time: Date,
    amount: number,
    fromUserEmail:string,
    toUserEmail:string,
    fromuserId:number,
    direction : string
}[],
}) =>{
        return <Card title="Recent Transaction">
        <div className="pt-2">
            {p2ps.map(t =><div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        INR
                    </div>
                    <div className="text-slate-600 text-xs">
                   {t.time.toDateString()} 
                    <div>
                        
                       from: {t.fromUserEmail}
                       <div>
                       to: {t.toUserEmail}
                       </div>
                       </div>
                    </div>
                </div>
                    <div className="flex flex-col justify-center">
                        {/* <div className="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                        </svg>
                        </div>  */} {
                            t.direction === "Sent" ? <div className="text-red-500">
                            - {t.amount / 100}
                        </div>
                        : <div className="text-green-500">
                                
                                + {t.amount / 100}
                        </div>
                        }
                        
                </div>
 

                </div>
            )}
           </div>


    </Card>


}