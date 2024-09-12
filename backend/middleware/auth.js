import jwt from "jsonwebtoken";
export const verifyToken = async (request,response,next)=>{
   try{ 
    let tokenString = request.headers.authorization;
    let token = tokenString.split(" ")[1];
    jwt.verify(token,'sfkldsfeoreioreiocxznxnceoirierfkjdfdf');
    next();
   }
   catch(err){
    return response.status(401).json({error: "Unauthorized user"});
   } 
}