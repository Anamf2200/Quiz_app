import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectionString } from "../../../../../lib/database/db";
import User from "../../../../../lib/models/user";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'



const JWT_SECRET= process.env.JWT_SECRET;

export const POST=async(req)=>{
    const {email,password}= await req.json()
    await mongoose.connect(connectionString)
    const user = await User.findOne({email})
    if(!user) return NextResponse.json({error:"User not found"},{status:401})
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch) return NextResponse.json({error:"Invalid credentials"},{status:401})
            const token= jwt.sign({id:user._id,email:user.email,role:user.role},JWT_SECRET,{expiresIn:'1h'})
        return NextResponse.json({token,user,result:"Login successfull"})

}