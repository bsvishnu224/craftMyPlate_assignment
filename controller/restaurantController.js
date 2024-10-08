const Restaurant=require('../model/Restaurant')
const Vendor=require('../model/Vendor')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filename
    }
});
const upload = multer({ storage });

const addRestaurant= async (req,res)=>{
    const {restaurantName,location,region,category}=req.body
    console.log(restaurantName)
    const vendorId=req.vendorId
    
    const image= req.file?req.file.filename:undefined;
    
    try {
        
            const vendor=await Vendor.findById(vendorId)
            if(!vendor){
                res.status(400).json({error:"vendor not found"})
            }
            else{
                const checkRestaurant= await Restaurant.findOne({restaurantName})
                if (checkRestaurant){
                    res.status(400).json({error:"restaurantname already taken"})
                }
                else{
                    const newRestaurant= new Restaurant({
                        restaurantName,location,region,category,image,vendor:vendor._id
                    })
                    const saveRestaurant= await newRestaurant.save()
                    vendor.restaurants.push(saveRestaurant)
                    await vendor.save()
                    


            
                    
                    res.status(200).json({success:"restaurant added successfully"})
                }
            }
        
            
            
            



        
        
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
    

}

const updateRestaurant= async (req,res)=>{
    const {restaurantName,location,region,category}=req.body
    const restaurantId=req.params.restaurantId
    const image=req.file?req.file.filename:undefined;
    const updateDetails={restaurantName,location,region,category,image}

    try {
        const update=await Restaurant.findByIdAndUpdate(restaurantId,updateDetails,{new:true})
        if(!update){
            res.status(400).json({error:"restaurant not found"})
        }
        else{
            res.status(200).json({success:"updata successful",update})
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
        
    }



}



module.exports={addRestaurant,updateRestaurant}