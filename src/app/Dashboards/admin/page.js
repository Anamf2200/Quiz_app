"use client"
import { useGetUserProfileQuery } from "@/app/authRedux/authApi";
import { logout } from "@/app/authRedux/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useAddQuizDataMutation } from "@/app/quizRedux/quizApi";
import { useState } from "react";

const CreateQuiz = () => {



  const router = useRouter()

  const dispatch= useDispatch()


const token = useSelector((state) => state.auth.token);






const { data, isLoading, error } = useGetUserProfileQuery(undefined, {
  skip: !token,
    refetchOnMountOrArgChange: true,

});








  const handleLogout=async()=>{
    dispatch(logout())
    router.push('/')

  }

  const handleQuizzes=async()=>{
    router.push("/adminPanel")
  }
const [quizTitle, setquizTitle] = useState('')
const [totalMarks, settotalMarks] = useState(0)
const [questions, setqestions] = useState([])

const handleQuestion=async()=>{
setqestions([
  ...questions,
  {
    questionText:'',
    options:['','',''],
    correctAnswer:'',
    marks:10
  }
])

}





const [quizData]= useAddQuizDataMutation()


const handleSubmit=async()=>{
const quiz={
  title:quizTitle,
  totalMarks,
  questions,

}
try{
  await quizData(quiz).unwrap()
  alert("Quiz Created")

  setquizTitle("")
  settotalMarks(0)
setqestions([])  
router.push("/adminPanel")

 
}

catch(err){
  console.error(err.message)
  alert("Something went wrong")
}

}




if (isLoading || !data) return <p>Loading...</p>;

if (data?.userData?.role !== "admin") {
  return <p className="text-red-500 text-center">Access Denied: Not an Admin</p>;
}








  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
  <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-8">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-purple-700">Create a New Quiz</h1>
    <div className="flex space-x-0 gap-4">
  <button
    onClick={handleLogout}
    className="text-sm px-4 py-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition duration-300"
  >
    Logout
  </button>
  <button
    onClick={handleQuizzes}
    className="text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:from-red-600 hover:to-pink-600 transition duration-300"
  >
    View Quizzes
  </button>
</div>



    </div>

    {/* Quiz Info */}
    <div className="space-y-4">
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setquizTitle(e.target.value)}
        placeholder="Enter Quiz Title"
        className="w-full px-5 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <input
        type="number"
        value={totalMarks}
        onChange={(e) => settotalMarks(e.target.value)}
        placeholder="Enter Total Marks"
        className="w-full px-5 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
    </div>

    {questions.map((question, qId) => (
      <div key={qId} className="bg-gray-50 border rounded-2xl p-5 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold text-indigo-600">Question {qId + 1}</h2>
        <input
          type="text"
          value={question.questionText}
          onChange={(e) => {
            const newQuestion = [...questions];
            newQuestion[qId].questionText = e.target.value;
            setqestions(newQuestion);
          }}
          placeholder="Enter question text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {question.options.map((option, opId) => (
            <input
              key={opId}
              type="text"
              value={option}
              onChange={(e) => {
                const updated = [...questions];
                updated[qId].options[opId] = e.target.value;
                setqestions(updated);
              }}
              placeholder={`Option ${opId + 1}`}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          ))}
        </div>

        <input
          type="text"
          value={question.correctAnswer}
          onChange={(e) => {
            const answer = [...questions];
            answer[qId].correctAnswer = e.target.value;
            setqestions(answer);
          }}
          placeholder="Correct Answer"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <input
          type="number"
          value={question.marks}
          onChange={(e) => {
            const marks = [...questions];
            marks[qId].marks = Number(e.target.value);
            setqestions(marks);
          }}
          placeholder="Marks (default 10)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    ))}

    <div className="flex justify-between gap-4">
      <button
        onClick={handleQuestion}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
      >
        + Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        ✅ Create Quiz
      </button>
    </div>
  </div>
</div>

  );
};

export default CreateQuiz;
