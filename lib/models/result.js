import mongoose from "mongoose";

const resultSchema= new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiz',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    correctAnswer:{
        type:String
    },
    wrongAnswer:{
        type:String
    },
    totalMarks:{
        type:Number
    },
    totalQuestions: {
        type:Number
    },

    status:{
        type:String,
        enum:['pass','fail']
    },
    submittedAt:{
        type:Date,
        default:Date.now()
    }

})

export default mongoose.models.Result||mongoose.model("Result",resultSchema)