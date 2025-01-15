import mongoose, { Mongoose } from "mongoose";

const userSchema = new Mongoose.Schema({
    email : {
        type:String , 
        required:[ , "Email is required !"] ,
        unique:true
    } , 
    userName : {
        lowercase : true ,
        required:true , 
        unique:true
    } , 
    password : {
        type:String ,
        required:true , 
        unique:true ,
    } , 
    favouriteAnimes : [String] ,
    TopFavouriteAnimes:{
        type:[String] ,
        validate : function (value) {
            return value.lenght <= 5
        } ,
        message:"You can only have upto 5 favourite animes !"
    } , 
    favouriteAnimeCharacter : {
        default:false ,
        reason: () => {
            
        }
    }
})