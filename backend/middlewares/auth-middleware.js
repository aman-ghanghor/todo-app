import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js"


const checkUserAuth = async (req, res, next) => {
   const { authorization } = req.headers ;

   if(authorization && authorization.startsWith("Bearer") ) { 
      try {
          // Get Token from Header
          const token = authorization.split(" ")[1] 
    
          // Verify Token 
          const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY) 
    
          // Get User from Token
          req.user = await UserModel.findById(userID).select('-password')
          next()
      }
      catch(error) {
         console.log(error)
         res.status(401).send({"status": "Unauthorized User", "message": "Unauthorized User"})
      }
   }
   else {
     res.status(401).send({"status": "failed", "message": "No Token"})
   }

}


export default checkUserAuth ;