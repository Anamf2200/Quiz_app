'use client'
import { useLoginMutation,useSignUpMutation } from "@/app/authRedux/authApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCredentials } from "@/app/authRedux/authSlice";
import  {useRouter}  from "next/navigation";




const UserDashboard = () => {
  const router= useRouter()

  const [login]=useLoginMutation()
  const [signUpData]= useSignUpMutation()
const dispatch= useDispatch()

const [loginData, setloginData] = useState({email:'',password:''})
const [signup, setsignup] = useState({name:'',email:'',password:'',role:"user"})
const [message, setmessage] = useState({type:'',text:""})
const [loginMessage, setloginMessage] = useState({type:'',text:''})


const handleLogin=async(e)=>{
e.preventDefault();
setloginMessage({type:'',text:''})
try{
  const response= await login(loginData).unwrap()
  dispatch(setCredentials(({token:response.token,user:response.user})))
  // console.log(token)
  //   console.log(user)

  localStorage.setItem('token',response.token)
  localStorage.setItem("user",JSON.stringify(response.user))

  if(response.user.role==="admin"){
    setloginMessage({type:'success',text:response.result})
    router.push('/Dashboards/admin')
  
  }
   else if (response.user.role==='user'){
  setloginMessage({type:'success',text:response.result})
    router.push('/Quizzes')

}
  else{
    alert("invalid login")
    router.push('/')
  }
  
}
catch(err){
  const message= err?.data?.error
  setloginMessage({type:'error',text:message})
}

}

const handleSignup=async(e)=>{
  e.preventDefault()
  setmessage({type:'',text:''})
  try{
  const response =   await signUpData({...signup,role:'user'}).unwrap()
  setmessage({type:'success',text:response.result})
        setsignup({ name: '', email: '', password: '', role: 'user' });

  }


  catch(err){
   const errorMessage=  err?.data?.error||'Signup failed'
   setmessage({type:"error",text:errorMessage})
  }
  

}

useEffect(() => {
 const token= localStorage.getItem("token");
 const user= JSON.parse(localStorage.getItem("user"))

 if(token&&user){
  if(user.role=="admin"){
    router.replace("/Dashboards/admin")
  }
  else if(user.role=="user"){
    router.replace("Quizzes")
  }
 }
}, [])

  return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center px-4 py-10">
  <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-12 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Sign Up Form */}
    <form className="space-y-6" onSubmit={handleSignup}>
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 text-center">Create Account</h2>
      <input
        type="text"
        value={signup.name}
        onChange={(e) => setsignup({ ...signup, name: e.target.value })}
        placeholder="Your Name"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <input
        type="email"
        value={signup.email}
        onChange={(e) => setsignup({ ...signup, email: e.target.value })}
        placeholder="Email Address"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <input
        type="password"
        value={signup.password}
        onChange={(e) => setsignup({ ...signup, password: e.target.value })}
        placeholder="Password"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-300"
      >
        Sign Up
      </button>
      {message.text && (
        <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"} text-center`}>
          {message.text}
        </p>
      )}
    </form>

    {/* Login Form */}
    <form className="space-y-6" onSubmit={handleLogin}>
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email Address"
        value={loginData.email}
        onChange={(e) => setloginData({ ...loginData, email: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) => setloginData({ ...loginData, password: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 transition duration-300"
      >
        Login
      </button>
      {loginMessage && (
        <p className={`text-sm ${loginMessage.type === "success" ? "text-green-600" : "text-red-600"} text-center`}>
          {loginMessage.text}
        </p>
      )}
    </form>
  </div>
</div>

  );
};

export default UserDashboard;
