import mongoose, { Model } from "mongoose";
import { string } from "zod";

export interface ICommunity extends Document {
    name:string
    description:string
    admin:string
    members:mongoose.Types.ObjectId[]
    communityBlogs:mongoose.Types.ObjectId[]
    id?:mongoose.Types.ObjectId
}

const communitySchema = new mongoose.Schema<ICommunity>({
    name:{
        type:String , 
        required:true ,
        unique:true
    } ,
    description:{
        type:String, 
        default:"Join Us !"
    } ,
    admin:{
        type:String ,
        required:true
    } ,
    members : [{
        ref:"User" ,
        type:mongoose.Schema.Types.ObjectId
    }] ,
    communityBlogs:[ {
        ref:"Blog" ,
        type:mongoose.Schema.Types.ObjectId
    }] , 
} , {
    timestamps:true
})

const Community :Model<ICommunity> = mongoose.model("Community" , communitySchema);
export default Community; 