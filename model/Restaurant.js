const mongoose=require("mongoose")

const restaurantSchema=new mongoose.Schema({
    restaurantName:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:["South-indian","North-indian","chinese","bakery"]
            }
        ]
    },
    image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor"
        }
    ],
    items:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Dish"
        }
    ]

})
const Restaurant=mongoose.model("Restaurant",restaurantSchema)
module.exports=Restaurant