"use client";
import { useGetQuizDataByIdQuery } from "@/app/quizRedux/quizApi";
import { useParams } from "next/navigation";

const ViewQuiz = () => {
  const { quizId } = useParams();
  const { data, isLoading, error } = useGetQuizDataByIdQuery(quizId);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load quiz.</p>;
  if (!data) return <p className="text-center">No quiz found.</p>;

  const { title, totalMarks, questions } = data?.data;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">{title}</h1>
        <p className="text-center text-gray-600">Total Marks: {totalMarks}</p>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="border rounded-md p-4 bg-gray-50 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Q{qIndex + 1}. {question.questionText}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 border rounded-md ${
                    option === question.correctAnswer
                      ? "bg-green-100 border-green-500"
                      : "bg-white"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500">Marks: {question.marks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewQuiz;
