import { NextResponse } from "next/server"
import Quiz from "../../../../../lib/models/quiz"
import Result from "../../../../../lib/models/result"
import mongoose from "mongoose"
import { connectionString } from "../../../../../lib/database/db"
import result from "../../../../../lib/models/result"


export const POST=async(req)=>{
    try{
        await mongoose.connect(connectionString)
        const {userId,quizId,answers}= await req.json()
  


        const quiz= await Quiz.findById(quizId)
        // console.log(quiz.questions)
        if(!quiz)return NextResponse.json({error:"No quiz found"},{status:404})
            let correct=0
        let wrong=0
        let score=0
        quiz.questions.forEach((q,i)=>
        
         {
            const userAnswer= answers[i];
            if(userAnswer===q.correctAnswer){
                correct++;
                score+=q.marks
            }
            else{
                wrong++
            }
        })
        const status= score>=quiz.totalMarks/2?'pass':'fail';

        const result= await Result.create({
        userId,
        quizId,
        correctAnswer:correct,
        wrongAnswer:wrong,
         totalQuestions: quiz.questions.length,
        totalMarks:score,
        status
    });
    return NextResponse.json({message:"quiz submitted",resultId:result._id},{status:200})
    }
    catch(error){
       return NextResponse.json({message:error.message},{status:500})
    }
    
}

