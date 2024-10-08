const Vendor=require("../model/Vendor")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const dotEnv=require("dotenv")

dotEnv.config()

const key=process.env.myKey


const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const isVendorRegister=await Vendor.findOne({email})
        if(isVendorRegister){
            res.status(400).json({error:"email already taken"})
        }
        else{
            const hashedPassword=await bcrypt.hash(password,10)
            const newVendor=new Vendor({
                username,email,password:hashedPassword
            })
            await newVendor.save()
            res.status(200).json({success:"vendor register successfully",newVendor})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error",error})
        
    }

}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const isVendorRegister=await Vendor.findOne({email})
        if(!isVendorRegister || !await bcrypt.compare(password,isVendorRegister.password)){
            res.status(400).json({error:"Email or password wrong"})
        }
        else{
            const token=await jwt.sign({vendorId:isVendorRegister._id},key)
            res.status(200).json({success:"login successfull",token})

        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error",error})
        
    }
}

module.exports={vendorRegister,vendorLogin}