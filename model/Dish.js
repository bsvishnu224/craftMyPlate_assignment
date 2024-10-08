const mongoose=require("mongoose")

const dishSchema=new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["starters","main course","beverages"]
            }
        ]
    },
    bestSeller:{
        type:Boolean
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    availability:{
        type:Boolean
    },
    restaurant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Restaurant"
        }
    ]

})

const Dish=mongoose.model("Dish",dishSchema)

module.exports=Dish