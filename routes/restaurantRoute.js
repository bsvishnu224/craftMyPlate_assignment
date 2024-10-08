

const rastaurantController=require("../controller/restaurantController")
const vendorVerifyToken=require('../middlewares/vendorVerifyToken')

const express=require('express')

const router=express.Router()

router.post('/restaurants',vendorVerifyToken,rastaurantController.addRestaurant)
router.put('/restaurants/:restaurantId',rastaurantController.updateRestaurant)


module.exports=router
