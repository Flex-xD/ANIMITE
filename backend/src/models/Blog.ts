import mongoose, { Document , Model, Mongoose} from "mongoose";

interface Iblog {
    title:string, 
    description?:string ,
    body:string , 
    images?:string ,
    likes:number | mongoose.Types.ObjectId[] , 
    comment:mongoose.Types.ObjectId[] , 
}

const blogSchema = new mongoose.Schema<Iblog>({
    title:{
        type:String , 
        maxlength:30 , 
        minlength:5
    } , 
    description:{
        type:String ,
        maxlength:100
    } , 
    body:{
        type:String , 
        maxlength:200
    } , 
    images:{
        type:String , 
        default:""
    } , 
    likes:[{
        ref:"User" , 
        type:mongoose.Schema.Types.ObjectId
    }] ,
    comment:[{
        ref:"User" , 
        type:mongoose.Schema.Types.ObjectId
    }]
})

const Blog:Model<Iblog> = mongoose.model("Blog" , blogSchema);
export default Blog;