
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resultApi=createApi({
    reducerPath:"resultApi",
    baseQuery:fetchBaseQuery({
        baseUrl: `http://localhost:3000`,
         prepareheader:(header,{getState})=>{
        const token= getState().auth.token
        if(token){
            header.set('Authorization',`Bearer ${token}`)
        }
        return header
    }

    }),
   endpoints:(builder)=>({
    addResultData:builder.mutation({
        query:({quizId,quizBody})=>({
       url:`/api/quiz/submit`,
       method:"POST",
       body:quizBody,

        }),
    }),
    getResultByIdData:builder.query({
        query:(id)=>`/api/quiz/submit/${id}`
    }),
   }),
});


export const{useAddResultDataMutation,useGetResultByIdDataQuery}=resultApi