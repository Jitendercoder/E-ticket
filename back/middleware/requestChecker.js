import jwt from  "jsonwebtoken"

const authenticateRequest = async(req , res , next)=>{

    const authHeader = req.headers['authorization']
    const token = authHeader 



    if(!token) return res.status(200).send({
        success:false,
        message:"not authorized for request ---"
    })

    jwt.verify(token ,  "abcdef12345" , (err,decoded)=>{
        if(err) return res.status(200).send({
        success:false,
        message:"not authorized for request in decoding"+err.message
    })

    req.userId = decoded.userId
    console.log("userid is "+decoded.userId)
    next()
    })
    
}


export default authenticateRequest