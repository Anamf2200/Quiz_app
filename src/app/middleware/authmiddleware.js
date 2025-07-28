import  jwt  from "jsonwebtoken";



export const verifyToken=async (req)=>{

    const authHeader= req.headers.get('authorization')
    if(!authHeader||!authHeader.startsWith("Bearer ")) throw new Error("no token found")

        const token= authHeader.split(" ")[1];
        
        return jwt.verify(token,process.env.JWT_SECRET)
        

    
}