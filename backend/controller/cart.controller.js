import { Cart } from "../model/cart.model.js";

export const addToCart = async (request,response,next)=>{
    let {userId,productId} = request.body;
    try{
        let cart = await Cart.findOne({userId});
        if(cart){
            // cart already exist || user second time performing add to cart
            // check product already exist or not
            const status = cart.cartItems.some((item)=>{return item.productId == productId})
                if(status)
                    return response.status(200).json({status: false,message:"Product is already added to cart."});
                cart.cartItems.push({productId});
                await cart.save();
                return response.status(201).json({status:true, message:"Product Successfully added to cart."});
        }
        else{
            // Very first time user performing add to cart
            cart = await Cart.create({userId,cartItems:[{productId}]});
            return response.status(201).json({status: true,message:"Product Successfully added to cart."});
        }
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal Server Error."});
    }
}
export const getCart = async (request,response,next)=>{
    try{
        let userId = request.params.userId;
        let cart = await Cart.findOne({userId}).populate("cartItems.productId");
        return response.status(200).json({cart});
    }
    catch(err){
        return response.status(500).json({error:"Internal Server Error."});
    }
}

export const deleteCartItem = async (request,response,next)=>{
    let productId = request.params.productId;
    let userId = request.params.userId;
    console.log(productId+" "+userId);
   try{
    Cart.updateOne({userId},{
        $pull:{cartItems:{productId}}
    }).then(result=>{
        console.log(result);
        return result.modifiedCount ? response.status(200).json({message: "Item removed from cart"}) : response.status(404).json({error: "Not found"});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    })
   }
   catch(err){
      console.log(err);
      return response.status(500).json({error: "Internal Server Error"});
   }
}
