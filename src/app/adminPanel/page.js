"use client";
import { useGetQuizDataQuery } from "@/app/quizRedux/quizApi";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const AdminPanel = () => {
  const { data, isLoading, error } = useGetQuizDataQuery();
  const quizzes = data?.result || [];

  if (isLoading) return <p className="text-center text-gray-600">Loading quizzes...</p>;
  if (error) return <p className="text-center text-red-500">Error loading quizzes</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Available Quizzes</h1>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500">No quizzes available.</p>
        ) : (
          <div className="grid gap-6">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition duration-300"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{quiz.title}</h2>
                  <p className="text-gray-600">Total Marks: {quiz.totalMarks}</p>
                </div>
                <div className="flex gap-4 text-indigo-600">
                  <Link href={`adminPanel/${quiz._id}/view`} title="View Quiz">
                    <Eye className="w-5 h-5 hover:text-indigo-800 cursor-pointer" />
                  </Link>
                  <Link href={`adminPanel/${quiz._id}/edit`} title="Edit Quiz">
                    <Pencil className="w-5 h-5 hover:text-green-600 cursor-pointer" />
                  </Link>
                  <Link href={`adminPanel/${quiz._id}/delete`} title="Delete Quiz">
                    <Trash2 className="w-5 h-5 hover:text-red-600 cursor-pointer" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
