// STILL NOT INTEGRATED. CREATE A PULL REQUEST IF AFTER CREATING CUSTOM SIGNIN NEXT AUTH PAGE.  
// AND ADD PLEASE SIGNUP BUTTON IF THE USER ISN'T SINGED UP 
"use client"
import axios from "axios"
import { useState } from "react"
export default function () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')

    return <div>

        <input type="number" placeholder="number" onChange={(e) => {
            setNumber(e.target.value)
        }} /> <br />
        <input type="text" placeholder="example@mail.com" onChange={(e) => {
            setEmail(e.target.value)
        }}></input><br />
        <input type="name" placeholder="john" onChange={(e) => {
            setName(e.target.value)
        }}></input><br />
        <input type="password" placeholder="password" onChange={(e) => {
            setPassword(e.target.value)
        }}></input>
        <button onClick={() => {
            axios.post("http://localhost:3000/api/auth/signup", { name: name, email: email, number: number, password: password }).then((response => {
                console.log(response.data)
            }))
        }} className="bg-cyan-200 rounded-full">Click here to signup</button>
    </div>
}