const jwt = require("jsonwebtoken")

//Tokenin hakeminen
const JWTToken1 = (request, response, next) => {
    const auth = request.get("authorization")

    if(auth && auth.startsWith("Bearer")){
        request.token = auth.replace("Bearer ", "")
    }

    else{
        return response.status(401).json({error: "Token is wrong or missing"})
        
    }
    next()
}

//Tokenin purkaminen 

const  JWTToken2 = async(request, response, next)=>{
    if(request.token){
        const decodeToken = jwt.verify(request.token, process.env.SECRET)

        if(!decodeToken.id){
            return response.status(401).json({error: "Token missing"})
        }
        request.user = decodeToken
    }
    next()
}

module.exports = {JWTToken1, JWTToken2}