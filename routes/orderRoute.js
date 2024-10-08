const express=require("express")
const orderController=require("../controller/orderController")
const verifyToken=require('../middlewares/verifytoken')
const vendorVerifyToken=require('../middlewares/vendorVerifyToken')

const router=express.Router()

router.post('/orders',verifyToken,orderController.addOrder)
router.get('/orders/:orderId',orderController.getOrdersByOrderId)
router.put('/orders/:orderId/status',vendorVerifyToken,orderController.updateOrderStatus)
router.get('/orders',verifyToken,orderController.getOrdersByUserId)

module.exports=router