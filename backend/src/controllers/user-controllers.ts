import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/tokens-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAlluser = async (
    req:Request,
    res:Response,
    next:NextFunction
) => { 
    // Get all users
    try {
        const users = await User.find();
        return res.status(200).json({message: "OK", users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
}

export const userSignup = async (
    req:Request,
    res:Response,
    next:NextFunction
) => { 
    // User Signup
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User already registered");
        const hashedPass = await hash(password,10);
        const user = new User({name,email,password: hashedPass});
        await user.save();

        // Create Token & Store Cookie

        res.clearCookie(COOKIE_NAME , {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
    
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path:"/",
            domain: "localhost", // Domain of deployment
            expires,
            httpOnly: true,
            signed: true,
        })

    return res.status(201).json({message: "OK", name:user.name, email: user.email});
    
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
}

export const userLogin = async (
    req:Request,
    res:Response,
    next:NextFunction
) => { 
    // User Login
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
        return res.status(403).send("Incorrect Password");
    }

    res.clearCookie(COOKIE_NAME , {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
        path:"/",
        domain: "localhost", // Domain of deployment
        expires,
        httpOnly: true,
        signed: true,
    })

    return res.status(200).json({message: "OK", name:user.name, email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
}