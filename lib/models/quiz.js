import mongoose from "mongoose";

const questionSchema= new mongoose.Schema({
    questionText:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true
    },
    correctAnswer:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        default:10
    }

})

const quizSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
    questions:{
        type:[questionSchema],
        required:true
    }


},{timestamp:true})

export default mongoose.models.Quiz||mongoose.model("Quiz",quizSchema)