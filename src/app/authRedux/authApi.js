import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'



const baseQuery= fetchBaseQuery({
    baseUrl:'http://localhost:3000',
    prepareHeaders:(headers,{getState})=>{
        const token= getState().auth.token
        if(token){
            headers.set("Authorization",`Bearer ${token}`)
        }
        return headers
    }
})

export const authApi=createApi({
    reducerPath:'authApi',
    baseQuery,
    endpoints:(builder)=>({
login:builder.mutation({
    query:(crendetials)=>({
        url:'/api/auth/login',
        method:'POST',
        body:crendetials,
    }),
}),

signUp:builder.mutation({
query:(newUser)=>({
    url:'/api/auth/register',
    method:'POST',
    body:newUser,
})

}),

getUserProfile:builder.query({
    query:()=>'/api/profile/protectedRoute',
})
    })
})


export const{useLoginMutation,useSignUpMutation,useGetUserProfileQuery}= authApi