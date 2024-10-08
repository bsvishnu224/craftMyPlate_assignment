const json = require("body-parser/lib/types/json")
const Order=require("../model/Order")
const User=require("../model/User")

const addOrder=async(req,res)=>{
    const {orderItems,deliveryAddress,totalCost,estimatedDeliveryTime,status}=req.body
    const userId=req.userId
    try {
        const user=await User.findById(userId)
        if(!user){
            res.status(400).json({error:"user not found"})
        }
        else{
            const newOrder=new Order({
                orderItems,deliveryAddress,totalCost,estimatedDeliveryTime,user:userId,status
            })
            const savedOrder= await newOrder.save()
            user.orders.push(savedOrder)
            await user.save()
            res.status(200).json({success:"order successfull",newOrder})
        }
    } catch (error) {
        console.error(error)
        res.status(500),json({error:"internal server error",error})
        
    }
}

const getOrdersByOrderId= async (req,res)=>{
    const {orderId}=req.params
    try {
        const order=await Order.findById(orderId) 
        if(!order){
            res.status(400).json({error:"order not found"})
        }
        else{
            res.status(200).json(order)
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error",error})
    }
}

const updateOrderStatus=async(req,res)=>{
    const {status}=req.body
    const {orderId}=req.params
    try {
        const updates={status}
        const updatestatus= await Order.findByIdAndUpdate(orderId,updates,{new:true});
        if(!updatestatus){
            res.status(400).json({error:"order not found"})
        }
        else{
            res.status(200).json({success:"status updated"})
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error",error})
        
    }

}

const getOrdersByUserId=async (req,res)=>{
    const userId=req.userId
    console.log(userId)
    try {
        const orders= await User.findById(userId).populate("orders")

        if(!orders){
            res.status(400).json({error:"user not found"})
        }
        else{
            res.status(200).json(orders.orders)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error",error})
    }
}
module.exports={addOrder,getOrdersByOrderId,updateOrderStatus,getOrdersByUserId}