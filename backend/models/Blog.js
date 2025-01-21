import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String , 
        required:true
    } ,
    content : {
        type:String , 
        required:true
    } , 
    author : {
        type:mongoose.Schema.Types.ObjectId ,
        ref : "User" , 
        required:true
    } , 
    date : {
        type:Date , 
        default:Date.now
    } , 
    likes : {
        type:Number , 
        default:0
    } , 
    comment : [{
        author:{type:mongoose.Schema.Types.ObjectId , ref:"User"} ,
        content:{type:String , required:true} ,
        date:{type:Date  , default:Date.now}
    }]
} , {timestamps:true});

const Blog = mongoose.model("Blog" , blogSchema);
export default Blog;