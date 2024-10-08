const express=require("express")
const vendorController=require('../controller/vendorController')

const router=express.Router()

router.post('/register',vendorController.vendorRegister)
router.post('/login',vendorController.vendorLogin)

module.exports=router