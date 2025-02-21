import mongoose from "mongoose";

const productsSchema  = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true
    },
    quantity:
    {
        type:Number,
        required:true
    },
    description:
    {
        type:String,
        default:""
    }
}, 
    {timestamps: true});

export const Products = mongoose.model("Products" , productsSchema );