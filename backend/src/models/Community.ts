import mongoose from "mongoose";

interface ICommunity {
    admin:mongoose.Types.ObjectId
    users:mongoose.Types.ObjectId[]
    communityBlog:mongoose.Types.ObjectId[]
}

const communitySchema = new mongoose.Schema({
    name:{
        type:String , 
    } ,
    description:{
        type:String 
    } ,
    admin:{
        ref:"User" ,
        type:mongoose.Schema.Types.ObjectId
    } ,
    users : {
        ref:"User" ,
        type:mongoose.Schema.Types.ObjectId
    } ,
    communityBlogs: {
        ref:"Blog" ,
        type:mongoose.Schema.Types.ObjectId
    } , 
})