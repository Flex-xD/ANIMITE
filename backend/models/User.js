import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required !"],
        unique: true,
        trim: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required !"],
        trim: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" ,
    }],
    favouriteAnimes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anime" ,
    }],
    favouriteAnimeCharacter: [{
        value: { type: Boolean, default: false },
    }],
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.pre("save", async function (next)  {
    try {
        if (this.isModified("password")) {
            const genSalt = await bcrypt.genSalt(10);
            this.password =  await bcrypt.hash(this.password, genSalt);
        }
        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model("User", userSchema);
export default User;