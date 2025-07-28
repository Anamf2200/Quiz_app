import mongoose, { connections } from "mongoose"
import { connectionString } from "../../../../../lib/database/db"
import Quiz from "../../../../../lib/models/quiz"
import { NextResponse } from "next/server"


export const PUT=async(req,value)=>{
    const question =  value.params.quizId
    console.log(question)
    const id= {_id:question}
    // console.log(id)

    const payload= await req.json()
    await mongoose.connect(connectionString)
    const updatedData= await Quiz.findOneAndUpdate(id,payload,{new:true})
    return(NextResponse.json({result:"question updated successfully",success:true}))

}

export const GET=async(req,value)=>{
    const question= await value.params.quizId
    const id= {_id:question}
    await mongoose.connect(connectionString)
    const data= await Quiz.findById(id)
    return (NextResponse.json({data,success:true}))
}

export const DELETE=async(req,value)=>{
    const question = value.params.quizId
    const id= {_id:question}
    await mongoose.connect(connectionString)
    const deletedData= await Quiz.findOneAndDelete(id)
    return(NextResponse.json({result:"user deleted successfully",success:true}))

}