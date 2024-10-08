const express= require("express");
const verifyToken=require('../middlewares/verifytoken')

const userCotroller=require('../controller/userController')

const router=express.Router()

router.post('/register',userCotroller.userRegister)
router.post('/login',userCotroller.userLogin)
router.put('/profile',verifyToken,userCotroller.userUpdate)
router.get('/profile',verifyToken,userCotroller.getProfile)


module.exports=router

