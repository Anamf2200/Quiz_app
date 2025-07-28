"use client"
import { useGetQuizDataQuery } from "@/app/quizRedux/quizApi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../authRedux/authSlice";
import { useRouter } from "next/navigation";

const QuizList = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, token } = useSelector((state) => state.auth)

  const { data, isLoading, error } = useGetQuizDataQuery();
  const quizzes = data?.result || [];

  if (isLoading) return <p className="text-center text-lg">Loading quizzes...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading quizzes.</p>;
  if (!user || user.role !== "user") {
    return <p className="text-red-500 text-center">Access Denied: Only users can view quizzes.</p>;
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">Available Quizzes</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-gray-600">No quizzes available.</p>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">{quiz.title}</h2>
                <p className="text-gray-600">Total Marks: {quiz.totalMarks}</p>
                <a
                  href={`Quizzes/${quiz._id}`}
                  className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
                >
                  Take Quiz →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizList
