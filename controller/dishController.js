const Dish=require("../model/Dish")
const Restaurant=require('../model/Restaurant')
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

const addDish= async(req,res)=>{
    const {itemName,price,category,description,bestseller,availability}=req.body
    const image=req.file?req.file.filename:undefined;
    const restaurantId=req.params.restaurantId
    try {
        const checkRestaurant= await Restaurant.findById(restaurantId)
        if (!checkRestaurant){
            res.status(400).json({error:"restaurant not found"})
        }
        else{
            const newItem=new Dish({
                itemName,price,category,description,bestseller,image,restaurant:restaurantId,availability
            })
            const saveItem=await newItem.save()
            checkRestaurant.items.push(saveItem)
            await checkRestaurant.save()

            res.status(200).json({success:"item added successfully",checkRestaurant})

        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
        
    }
}

const updateDish=async (req,res)=>{
    const {itemName,price,category,description,bestseller,availability}=req.body
    const {restaurantId,itemId}=req.params
    const updataDetails={itemName,price,category,description,bestseller,availability}
    try {
        const restaurant= await Restaurant.findById(restaurantId)
        if (!restaurant){
            res.status(400).json({error:"restaurant not found"})
        }
        else{
            
            const updateItem=await Dish.findByIdAndUpdate(itemId,updataDetails,{new:true})
                if (!updateItem){
                    res.status(400).json({error:"item not found"})
                }
                else{
                    res.status(200).json({success:"update successfully",updateItem})
                }
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
        
    }

}



module.exports={addDish,updateDish}