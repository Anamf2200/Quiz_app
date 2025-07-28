import mongoose, { mongo } from "mongoose"
import { connectionString } from "../../../../lib/database/db"
import Quiz from "../../../../lib/models/quiz"
import { NextResponse } from "next/server"



export const GET=async()=>{
    try{
await mongoose.connect(connectionString)
const quizData= await Quiz.find()
return (NextResponse.json({success:true,result:quizData}))
    }
    catch(error){
        console.error(error)
        return (NextResponse.json({error:error.message}))
    }
}


export const POST=async(req)=>{
    try{
await mongoose.connect(connectionString)
const questionData= await req.json()
const question= await new Quiz(questionData)
const response = await question.save()
return(NextResponse.json({result:response,success:true}))
    }

    catch(error){
      return (NextResponse.json({error:error.message}))

    }
}