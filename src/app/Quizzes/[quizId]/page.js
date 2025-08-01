'use client'
import { useGetQuizDataByIdQuery } from "@/app/quizRedux/quizApi"
import { useAddResultDataMutation } from "@/app/resultRedux/resultApi"
import { jwtDecode } from "jwt-decode"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"

const ShowQuiz = () => {
  const { quizId } = useParams()
  const router = useRouter()
  const token = useSelector((state) => state.auth.token)
  
  let userId;
  if (token) {
    const decode = jwtDecode(token)
    userId = decode.id
  }

  const { data, isLoading, error } = useGetQuizDataByIdQuery(quizId)
  const [submitResult, { isLoading: isSubmitting }] = useAddResultDataMutation()
  const [userAnswer, setUserAnswer] = useState([])

  if (isLoading) return <p className="text-center text-lg">Loading...</p>
  if (error) return <p className="text-red-500 text-center">Error loading quiz.</p>
  if (!data) return <p className="text-center">No quiz found.</p>

  const { title, totalMarks, questions } = data.data

  const handleSubmit = async () => {
    const quizBody = { quizId, userId, answers: userAnswer }

    try {
      const response = await submitResult({ quizId, quizBody }).unwrap()
      alert("Quiz submitted!")
      router.push(`/results/${response.resultId}`)
    } catch (err) {
      alert("Error submitting quiz!")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700">{title}</h1>
          <p className="text-gray-600 mt-1">Total Marks: {totalMarks}</p>
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="border rounded-lg p-5 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">
              Q{qIndex + 1}. {question.questionText}
            </h2>
            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 rounded-md border cursor-pointer transition ${
                    userAnswer[qIndex] === option ? "bg-indigo-100 border-indigo-500" : "bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    className="form-radio mr-3 text-indigo-600"
                    checked={userAnswer[qIndex] === option}
                    onChange={() => {
                      const updatedAnswers = [...userAnswer]
                      updatedAnswers[qIndex] = option
                      setUserAnswer(updatedAnswers)
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  )
}

export default ShowQuiz
