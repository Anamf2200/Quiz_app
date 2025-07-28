

const username=process.env.myusername
 const password= process.env.mypassword

if(!username||!password){
    throw new Error ("Database is not connected")
}

export const connectionString= `mongodb+srv://${username}:${password}@cluster0.fatxgox.mongodb.net/quizApp?retryWrites=true&w=majority&appName=Cluster0`