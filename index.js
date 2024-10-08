const express=require("express");
const mongoose=require("mongoose");
const dotEnv=require("dotenv");
const bodyParser=require("body-parser")
const userRoute=require('./routes/userRoute')
const restaurantRoute=require('./routes/restaurantRoute')
const dishRoute=require("./routes/dishRoute")
const orderRoute=require('./routes/orderRoute')
const vendorRoute=require('./routes/venderRoute')
const app=express()

dotEnv.config()

console.log(process.env.myUri)
app.use(bodyParser.json())
const PORT=3000;

app.use('/user',userRoute)
app.use('/',restaurantRoute)
app.use('/',dishRoute)
app.use('/',orderRoute)
app.use('/vendor',vendorRoute)


mongoose.connect(process.env.myUri)
.then(()=>console.log("MongooDb connected successfully"))
.catch((error)=>console.log(error))

app.listen(PORT,()=>{
     console.log(`server started and running at port ${PORT}`)
})

