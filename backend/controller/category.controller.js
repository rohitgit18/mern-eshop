import { validationResult } from "express-validator";
import { Category } from "../model/category.model.js"

export const saveInBulk = (request,response,next)=>{
    Category.insertMany(request.body)
    .then(result=>{
        return response.status(201).json({message: "All category saved"});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    });
}
export const save = async (request,response,next)=>{
 try{ 
    let errors = validationResult(request);
    if(!errors.isEmpty())
      return response.staus(401).json({error: "Bad request|Invalid data",errorMessages: errors.array()});

    let category = await Category.create(request.body);
    return response.status(201).json({message: "category saved",category});
  }
  catch(err){
    return response.status(500).json({error: "Internal Server Error"});
  }
}
export const getCategory = async (request,response,next)=>{
    let id = request.params.id;
    try{
       let category = await Category.findOne({_id: id});
       return category ? response.status(200).json({category}) : response.status(404).json({error: "Resource not found | id not found"});
    }
    catch(err){
        return response.status(500).json({error: "Internal Server Error"});
    }
}
export const getCategoryList = (request,response,next)=>{
    Category.find()
    .then(result=>{
        return response.status(200).json({categoryList: result});
    }).catch(err=>{
        return response.status(500).json({error: "Internal server error"});
    });
}
export const deleteCategory = (request,response,next)=>{
    let id = request.params.id;
    Category.deleteOne({_id:id})
    .then(result=>{
        return response.status(200).json({message: "Category deleted successfully"});
    }).catch(err=>{
        return response.status(500).json({error: "Server Error"});
    })
}