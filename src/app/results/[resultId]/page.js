'use client'

import { useGetResultByIdDataQuery } from "@/app/resultRedux/resultApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const { resultId } = useParams();
  const [isClient, setisClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setisClient(true);
  }, []);

  const { data, isLoading, error } = useGetResultByIdDataQuery(resultId, {
    skip: !isClient || !resultId,
  });

  if (!isClient) return null;
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching result</p>;

  const result = data?.result;
  const handleBack = () => {
    router.push('/Quizzes');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-indigo-700">🎯 Quiz Result</h1>

        <div className="text-left space-y-2">
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">👤 User:</span> {result.userId.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">📘 Quiz:</span> {result.quizId.title}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg mt-4">
          <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
            <p className="text-gray-500">Questions</p>
            <p className="text-indigo-700 font-bold text-xl">{result.totalQuestions}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 shadow-sm">
            <p className="text-gray-500">Correct</p>
            <p className="text-green-700 font-bold text-xl">{result.correctAnswer}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 shadow-sm">
            <p className="text-gray-500">Wrong</p>
            <p className="text-red-600 font-bold text-xl">{result.wrongAnswer}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
            <p className="text-gray-500">Score</p>
            <p className="text-yellow-600 font-bold text-xl">{result.totalMarks}</p>
          </div>
        </div>

        <div className={`mt-6 text-2xl font-semibold ${result.status === "pass" ? 'text-green-600' : 'text-red-600'}`}>
          {result.status === "pass" ? '🎉 You Passed!' : '❌ You Failed'}
        </div>

        <button
          onClick={handleBack}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white text-lg rounded-full hover:bg-indigo-700 transition"
        >
          🔙 Go to Quizzes
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
