const jwt = require("jsonwebtoken")
const user = require("../models/user")
const { response } = require("../app")

module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
    const userId = decodedToken.userId
    
    // find the user with userId
    /// if exist
      user.findOne({_id:userId})
        .then((rolegett)=>{
           if(rolegett){
                req.auth ={
                    userId : userId,
                    role : rolegett.role
                }
              next()
           }
           else{
            res.status(401).json({error: "user dosen't exist"})
           }    
           
        })
  } catch (error) {
    res.status(401).json({ error: error.message})
  }
}