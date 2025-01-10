import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js'

export const signup = async (req, res) => {
    try{
        const {username, fullname, email, password} = req.body;

        const emailrgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailrgx.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingUser = await User.findOne({username: username});

        if(existingUser){
            return res.status(400).json({error: "Username already exists"});
        }

        const existingEmail= await User.findOne({email: email});

        if(existingEmail){
            return res.status(400).json({error: "Email already exists"});
        }

        if(password.length<6){
            res.status(400).json({error: "Password must be of 6 letters"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname: fullname,
            username: username,
            email:email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }
        else{
            res.status(400).json({error: "Invalid user data"});
        }
        console.log("User created");
    }
    catch(error){
        console.log("Error in signup", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })

    }
    catch(error){
        console.log("Error in login", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {
            maxAge:0
        })
        res.status(200).json({message: "Logged out successfully"});
    }
    catch(error){
        console.log("Error in logout", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    }
    catch(error){
        console.log("Error in getMe", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}