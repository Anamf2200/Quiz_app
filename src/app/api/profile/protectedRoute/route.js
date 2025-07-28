import { verifyToken } from "@/app/middleware/authmiddleware"
import { NextResponse } from "next/server"




export const GET=async(req)=>{

    try{
        const userData= await verifyToken(req)
        if(userData.role!="admin"){
        return NextResponse.json({message:'Forbidden access'},{status:403})

        }
     return NextResponse.json({ message: 'Welcome',userData })

        

    }
    catch(err){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
}