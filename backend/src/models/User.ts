import mongoose  , {Document , Model} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    email:string , 
    username:string , 
    password:string , 
    profilePicture?:string ,
    bio?:string ,
    role:"user" | "admin" ,
    friends:mongoose.Types.ObjectId[] ,
    favouriteAnimes?:mongoose.Types.ObjectId[] ,
    blogs?:mongoose.Types.ObjectId[] ,
    community?:mongoose.Types.ObjectId[] ,
    badges:mongoose.Types.ObjectId[] ,
    notifications:string[], 
    watchList:mongoose.Types.ObjectId[]
}

const userSchema = new mongoose.Schema<IUser>({
    email:{
        type:String ,
        required:true ,
        unique:true
    } , 
    username:{
        type:String ,
        required:true , 
        unique:true , 
        minlength:5 ,
        maxlength:12
    } ,
    password:{
        type:String ,
        required:true ,
        minlength:4
    } , 
    profilePicture:{
        type:String , 
        default:""
    } , 
    bio:{
        type:String , 
        max:60
    } , 
    role:{
        type:String ,
        default:"user"
    } , 
    friends:[{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId
    }] ,
    favouriteAnimes:[{
        ref:"Anime" , 
        type:mongoose.Schema.Types.ObjectId
    }] , 
    blogs:[{
        ref:"Blog" ,
        type:mongoose.Schema.Types.ObjectId ,
        default:[]
    }] ,
    badges:[{
        ref:"Badge" , 
        type:mongoose.Schema.Types.ObjectId
    }] , 
    notifications:[{
        type:String , 
        message:String , 
        read:Boolean , 
        createdAt:Date
    }] , 
    watchList:[{
        ref:"Anime" , 
        type:mongoose.Schema.Types.ObjectId
    }]
} , {
    timestamps:true
});

userSchema.pre("save" , async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password , salt);
    next();
});

const User:Model<IUser> = mongoose.model("User" , userSchema);
export default User;