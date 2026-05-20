
const user = require("../models/User")
const Cart = require("../models/Cart")


const CreateCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        let findCart = await Cart.findOne({ user: userId });

        if (!findCart) {
            findCart = await Cart.create({
                user: userId,
                items: [{ productId, quantity: quantity || 1 }] 
            });
        } 
        else {
            const itemIndex = findCart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                findCart.items[itemIndex].quantity += (quantity || 1);
            } else {
                findCart.items.push({ productId, quantity: quantity || 1 });
            }

            await findCart.save();
        }

        return res.status(200).json({
            success: true,
            msg: "Product added to cart successfully",
            data: findCart 
        });

    } 
    catch (error) {
        next(error); 
    }
};



const ReadCart = async (req,res,next) =>{
   try{
          const userId = req.user.id;
          const getCart = await Cart.findOne({ user: userId }).populate({
            path: "items.productId",
            select: "name price image"
        });


          if (!getCart){
            return res.status(401).json({msg:"the Cart not found"})}
            

            res.status(200).json({
                success:true,
                data:getCart
            })

        }

        catch(error){
               next(error) 
        }

}




const EditCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body; 

        const findCart = await Cart.findOne({ user: userId });

        if (!findCart) {
            return res.status(404).json({ success: false, msg: "Cart not found" });
        }

        const itemIndex = findCart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            findCart.items[itemIndex].quantity = quantity;
            
            if (findCart.items[itemIndex].quantity <= 0) {
                findCart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(404).json({ success: false, msg: "Product not found in this cart" });
        }

        await findCart.save();

        return res.status(200).json({
            success: true,
            msg: "Cart updated successfully",
            data: findCart
        });

    } catch (error) {
        next(error); 
    }
};



const DeleteCart = async (req,res,next) =>{
        try{
        const user= req.user.id
        const  daleteTheCard = await Cart.findOneAndUpdate({user:user}, { $set: { items: [] } } , {new:true})
        if (!daleteTheCard){
          return  res.status(401).json({msg:"There is no Cart "})

        }
          return res.status(200).json({
            success: true,
            msg: "Cart items cleared successfully",
            data: daleteTheCard 
        });
    }
        catch(error){
               next(error) 
        }


}


module.exports ={
    CreateCart,
    ReadCart,
    EditCart,
    DeleteCart
}