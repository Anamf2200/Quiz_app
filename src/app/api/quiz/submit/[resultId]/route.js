import result from "../../../../../../lib/models/result"
import mongoose from "mongoose"
import { connectionString } from "../../../../../../lib/database/db"
import { NextResponse } from "next/server"



export const GET=async(req,value)=>{
    try{
        const id= await value.params.resultId
        const resultId={_id:id}
        await mongoose.connect(connectionString)
        const response= await result.findById(resultId).populate('quizId').populate('userId')
         if (!response) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }
        return (NextResponse.json({success:true,result: response}))
    }
     catch(error){
            console.error(error)
            return (NextResponse.json({error:error.message}))
        }
}