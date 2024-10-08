const mongoose=require("mongoose")
const User=require("../model/User")


const orderSchema=new mongoose.Schema({
    orderItems:[
        {
            type:Object,
            required:true
        }
    ],
    deliveryAddress:{
        type:String,
        required:true
    },
    totalCost:{
        type:Number,
        required:true
    },
    estimatedDeliveryTime:{
        type:String,
        default:"40min"
    },
    status:{
        type:String,
        default:"pending"
    },
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

    ]

})

const Order=mongoose.model("Order",orderSchema)

module.exports=Order