import mongoose, { Document, Model, Mongoose, ObjectId } from "mongoose";

export interface Iblog {
    title: string,
    description?: string,
    body: string,
    images?: string,
    likes: number | mongoose.Types.ObjectId[],
    comment: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId , 
    author:mongoose.Types.ObjectId
}

const blogSchema = new mongoose.Schema<Iblog>({
    title: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 5,
        validate: {
            validator: function (value: any) {
                return value.length <= 60;
            },
            message: "Title length must be 60 or less ."
        }
    },
    description: {
        type: String,
        maxlength: 300
    },
    body: {
        type: String,
        required: true,
        maxlength: 400,
        validate: {
            validator: function (value: any) {
                return value.length <= 400;
            },
            message: "Blog body must be 400 or less ."
        }
    },
    images: {
        type: String,
        default: ""
    },
    likes: [{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    }],
    comment: [{
        ref: "Comment",
        type: mongoose.Schema.Types.ObjectId
    }] , 
    author:{
        ref:"User" , 
        type:mongoose.Schema.Types.ObjectId , 
        required:true
    }
}, {
    timestamps: true
})

const Blog: Model<Iblog> = mongoose.model<Iblog>("Blog", blogSchema);
export default Blog;