"use client";
import { useDeleteQuizDataMutation, useGetQuizDataByIdQuery } from "@/app/quizRedux/quizApi";
import { useParams, useRouter } from "next/navigation";

const Delete = () => {
  const { quizId } = useParams();
  const router = useRouter();

  const { data, isLoading: isFetching } = useGetQuizDataByIdQuery(quizId);
  const [deleteQuiz, { isLoading, isError, isSuccess }] = useDeleteQuizDataMutation();

  const quiz = data?.data;

  const handleDelete = async () => {
    try {
      await deleteQuiz(quizId).unwrap();
      router.push("/adminPanel");
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  if (isFetching) return <p className="text-center">Loading quiz details...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-red-600">Delete Confirmation</h2>
        <div className="bg-gray-50 p-4 rounded border">
          <p className="font-semibold text-gray-800">Title: {quiz?.title}</p>
          <p className="text-gray-600">Total Marks: {quiz?.totalMarks}</p>
        </div>

        <p className="text-center text-sm text-gray-600">
          Are you sure you want to permanently delete this quiz? This action cannot be undone.
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>

          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:underline hover:text-gray-800"
          >
            Cancel
          </button>
        </div>

        {isError && <p className="text-red-500 text-sm text-center">Something went wrong.</p>}
        {isSuccess && <p className="text-green-600 text-sm text-center">Quiz deleted successfully.</p>}
      </div>
    </div>
  );
};

export default Delete;
