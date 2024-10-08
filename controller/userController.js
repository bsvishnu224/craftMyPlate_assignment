const User=require("../model/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const dotEnv=require("dotenv")

dotEnv.config()

const key=process.env.myname
console.log(key)

const userRegister= async (req, res)=>{
    const {username,email,password}=req.body
    try {
        const checkEmail= await User.findOne({email})
        
        if (checkEmail){
            res.status(400).json({error:"email already taken"})

        }

        else{
            const hashedPassword= await bcrypt.hash(password,10)
            const newUser= new User({
                username,email,password:hashedPassword
            })
            await newUser.save()
            
            res.status(200).json({success:"user registerd successfully"})
            }

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error"})
        
    }


}


const userLogin= async (req,res)=>{
    const {email,password}=req.body
    try {
        const isUserRegisterd= await User.findOne({email})
        console.log(email)
        console.log(isUserRegisterd)

        if (!isUserRegisterd || !await bcrypt.compare(password,isUserRegisterd.password)){
            res.status(400).json({error:"email or password wrong"})
        }

        else{
            const token=jwt.sign({userId:isUserRegisterd._id},key)
            console.log(token)
        
            res.status(200).json({success:"login successfull",token})
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error"})
        
    }
}

const userUpdate= async (req,res)=>{
    const {username,email,password}=req.body
    const userId=req.userId
    

    const userDetails= await User.findById(userId)
    const hashedPassword= await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const updates={username,email,password:hashedPassword}
    

    try {

        if (email===userDetails.email){
            
            const updateUSer=await User.findByIdAndUpdate(userId,updates,{new:true})
            if (!updateUSer){
                res.status(400).json({error:"user not found"})
            }
            res.status(200).json(updateUSer)
        }
        else{
            const checkEmail= await User.findOne({email})
            if(checkEmail){
                res.status(400).json({error:"email already taken"})
            }
            else{
                const updateUSer=await User.findByIdAndUpdate(userId,updates,{new:true})
                if (!updateUSer){
                    res.status(400).json({error:"user not found"})
                }
                res.status(200).json(updateUSer)
                }

        }

        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error"})
    }
}

const getProfile= async (req,res)=>{
    const userId=req.userId
    try {
        const user= await User.findById(userId)
        if(!user){
            res.status(400).json({error:"user not found"})
        }
        else{
            res.status(200).json(user)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }

}



module.exports={userRegister,userLogin,userUpdate,getProfile}