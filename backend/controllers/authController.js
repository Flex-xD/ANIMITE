import User from "../models/User.js"

export const registerController = async (req , res) => {
    try {
        const {email , password } = req.body;
        const existingUser = await User.find({email});
        if (existingUser) return res.status(400).json({message:"User already exists !"});
        const newUser = await new User({
            email, 
            password,
            
        })
        return res.status(201).json({newUser});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error});
    }
}