import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi=createApi({
    reducerPath:"quizApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000',
        prepareHeaders:(header,{getState})=>{
            const token=getState().auth.token
            if(token){
                header.set("Authorization",`Bearer ${token}`)
            }
            return header
        }
    }),
    endpoints:(builder)=>({
        getQuizData:builder.query({
            query:()=>'/api/quiz'
        }),
        addQuizData:builder.mutation({
            query:(quizdata)=>({
             url:'/api/quiz',
             method:'POST',
             body:quizdata,
            }),
        }),
        editQuizData:builder.mutation({
            query:({quizId,quizChanges})=>({
                url:`/api/quiz/${quizId}`,
                method:'PUT',
                body:quizChanges,

            }),
        }),
        deleteQuizData:builder.mutation({
            query:(id)=>({
                url:`/api/quiz/${id}`,
                method:"DELETE",
            }),
        }),
        getQuizDataById:builder.query({
            query:(quizId)=>`/api/quiz/${quizId}`,
        }),
    }),
});

export const {useGetQuizDataQuery,useAddQuizDataMutation,useEditQuizDataMutation,useDeleteQuizDataMutation,useGetQuizDataByIdQuery}=quizApi;