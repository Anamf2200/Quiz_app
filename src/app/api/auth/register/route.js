import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { connectionString } from "../../../../../lib/database/db"
import User from "../../../../../lib/models/user"



export const POST=async(req)=>{
    const {name,email,password,role}= await req.json()
    await mongoose.connect(connectionString)
    const hashedPassword = await bcrypt.hash(password,10)
    const existing = await User.findOne({email})
    if(existing) return NextResponse.json({error:"User already exists"},{status:400})
        const newUser= await User.create({name,email,password:hashedPassword,role})
    return NextResponse.json({result:'Signup successful. You can now login.',success:true})

}