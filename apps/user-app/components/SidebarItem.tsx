"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";
 // this will be used in the side the change the color while and changing the page url while clicking on the icon in the side to transfer/dashboard 
 // etc
export const SidebarItem = ({href,title,icon}:{href:string, title:string, icon:React.ReactNode}) =>{
const router = useRouter();
const path = usePathname();
const selected = path === href; 
return <div className={`flex ${selected ? "text-[#7434f3]" : "text-slate-500"} cursor-pointer p-2 pl-8`} onClick={()=>{
    router.push(href) 
}}>
<div className="pr-2">
            {icon} {/** will show the passed icon */}
        </div>
        <div className={`font-bold ${selected ? "text-[#7434f3]" : "text-slate-500"}`}>
            {title} {/** wil show the passed title */}
        </div>
</div>

}