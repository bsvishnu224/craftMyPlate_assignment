const dishController=require('../controller/dishController')

const express=require("express")
const router=express.Router()

router.post('/restaurants/:restaurantId/menu',dishController.addDish)
router.put('/restaurants/:restaurantId/menu/:itemId',dishController.updateDish)

module.exports=router