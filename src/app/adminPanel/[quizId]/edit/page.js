'use client'
import { useEditQuizDataMutation, useGetQuizDataByIdQuery } from "@/app/quizRedux/quizApi"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from 'react'

const Edit = () => {
  const { quizId } = useParams()
  const router = useRouter()
  if (!quizId) return <p>No quiz Id found</p>

  const { data, isLoading, error } = useGetQuizDataByIdQuery(quizId)
  const [updateData] = useEditQuizDataMutation()

  const [quiztitle, setTitle] = useState('')
  const [quiztotalMarks, settotalMarks] = useState(0)
  const [que, setque] = useState([
    {
      questionText: '',
      correctAnswer: '',
      marks: '',
      options: ['', '', '', '']
    }
  ])

  useEffect(() => {
    if (data?.data) {
      const { title, totalMarks, questions } = data.data
      setTitle(title || '')
      settotalMarks(totalMarks || 0)
      const clonedQuestions = questions.map(q => ({
        ...q,
        options: [...q.options]
      }))
      setque(clonedQuestions)
    }
  }, [data])

  const handleQueChange = async (index, field, value) => {
    const updatedQue = [...que]
    updatedQue[index][field] = value
    setque(updatedQue)
  }

  const handleOptionChange = async (qindex, oIndex, value) => {
    const updatedOption = [...que]
    updatedOption[qindex].options[oIndex] = value
    setque(updatedOption)
  }

  const handleUpdate = async () => {
    const quizChanges = {
      title: quiztitle,
      totalMarks: quiztotalMarks,
      questions: que
    }

    try {
      await updateData({ quizId, quizChanges }).unwrap()
      alert("Quiz updated successfully")
      router.push('/adminPanel')
    } catch (err) {
      console.error(err)
      alert("Failed to update quiz.")
    }
  }

  const handleAddQuestion = async () => {
    const newQuestion = {
      questionText: '',
      correctAnswer: '',
      marks: 10,
      options: ['', '', '', '']
    }
    setque([...que, newQuestion])
  }

  if (isLoading || !data || !quizId) return <p>Loading...</p>
  if (error) return <p>Error fetching quiz data.</p>

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Update Quiz</h1>

        {/* Quiz Info */}
        <div className="space-y-4">
          <input
            type="text"
            value={quiztitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Quiz Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            value={quiztotalMarks}
            onChange={(e) => settotalMarks(Number(e.target.value))}
            placeholder="Enter Total Marks"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Questions */}
        {que.length > 0 && que.map((question, qId) => (
          <div key={qId} className="border border-gray-200 rounded-lg p-6 bg-gray-50 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Question {qId + 1}</h2>

            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQueChange(qId, 'questionText', e.target.value)}
              placeholder="Enter question text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {question.options?.map((option, opId) => (
                <input
                  key={opId}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qId, opId, e.target.value)}
                  placeholder={`Option ${opId + 1}`}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              ))}
            </div>

            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) => handleQueChange(qId, 'correctAnswer', e.target.value)}
              placeholder="Correct Answer"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="number"
              value={question.marks}
              onChange={(e) => handleQueChange(qId, 'marks', Number(e.target.value))}
              placeholder="Marks (default 10)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          onClick={handleAddQuestion}
          className="w-full py-3 rounded-md bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:from-green-500 hover:to-emerald-600 transition"
        >
          + Add New Question
        </button>

        <button
          onClick={handleUpdate}
          className="w-full py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Edit
