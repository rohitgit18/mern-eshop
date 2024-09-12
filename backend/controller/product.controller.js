import { Product } from "../model/product.model.js";

export const saveInBulk = (request,response,next)=>{
    Product.insertMany(request.body)
    .then(result=>{
        return response.status(201).json({message:"Data saved.."});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:"Internal Server Error."});
    })
};
export const getProductList = (request,response,next)=>{
    Product.find()
    .then(result=>{
        return response.status(200).json({products: result});
    }).catch(err=>{
        return response.status(500).json({error:"Internal Server Error."});
    })
}
export const getProduct = async (request,response,next)=>{
    let id = request.params.id;
    try{
        let product = await Product.findOne({_id: id});
        return product ? response.status(200).json({product}) : response.status(404).json({error:"Resource not found | id not found."});
    }
    catch(err){
        return response.status(500).json({error:"Internal Server Error."});
    }
}

export const deleteProduct = async (request,response,next)=>{
    let id = request.params.id;
    try{
        let product = await Product.deleteOne({_id: id});
        return product ? response.status(200).json({message:"Product deleted from database.", product}) : response.status(404).json({error:"Resource not found | id Not found."});
    }
    catch(err){
        return response.status(500).json({error:"Internal Server Error."});
    }
}