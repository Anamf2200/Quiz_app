

import {configureStore} from '@reduxjs/toolkit'
import { authApi } from '../authRedux/authApi'
import authSlice from '../authRedux/authSlice'
import { quizApi } from '../quizRedux/quizApi'
import { resultApi } from '../resultRedux/resultApi'

export const store=configureStore({
    reducer:{
        auth:authSlice,
        [authApi.reducerPath]:authApi.reducer,
        [quizApi.reducerPath]:quizApi.reducer,
        [resultApi.reducerPath]:resultApi.reducer,

    },

    
    middleware:(getDefaultMiddleware)=>{
       return getDefaultMiddleware()
       .concat(authApi.middleware)
       .concat(quizApi.middleware)
       .concat(resultApi.middleware)
    }
})