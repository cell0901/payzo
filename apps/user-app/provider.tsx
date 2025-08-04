"use client"
import { RecoilRoot } from 'recoil'
import { SessionProvider } from "next-auth/react"
import React from 'react'

export const Providers = ({children}:{children:React.ReactNode}) => {
    const RecoilRootComponent = RecoilRoot as any
    
    return (
        <RecoilRootComponent>
            <SessionProvider>
                {children}
            </SessionProvider> 
        </RecoilRootComponent>
    )
}