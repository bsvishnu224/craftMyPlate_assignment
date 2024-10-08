
const bcrypt=require("bcryptjs")
const dotEnv=require("dotenv")
const jwt=require("jsonwebtoken")
const User=require('../model/User')

dotEnv.config()

const key=process.env.myname

const verifyToken= async(req,res,next)=>{
    const token=req.headers.token
    if (!token){
        res.status(400).json({error:"invalid token"})
    }
    try {
        const decode= await jwt.verify(token,key)
        const user= await User.findById(decode.userId)
        
        if(!user){
            res.status(400).json({error:"user not Found1"})
        }
        else{
            req.userId=user._id
            next()
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }

}
module.exports=verifyToken
