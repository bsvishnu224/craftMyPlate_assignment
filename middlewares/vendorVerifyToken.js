const dotEnv=require("dotenv")
const jwt=require("jsonwebtoken")
const Vendor=require('../model/Vendor')

dotEnv.config()

const key=process.env.myKey

const verifyToken= async(req,res,next)=>{
    const token=req.headers.token
    if (!token){
        res.status(400).json({error:"invalid token"})
    }
    try {
        const decode= await jwt.verify(token,key)
        console.log(decode)
        const vendor= await Vendor.findById(decode.vendorId)
        console.log(vendor)
        
        if(!vendor){
            res.status(400).json({error:"vendor not Found1"})
        }
        else{
            req.vendorId=vendor._id
            next()
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }

}
module.exports=verifyToken
