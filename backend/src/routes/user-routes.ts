import { Router } from "express";
import { getAlluser, userLogin, userSignup, verifyUser, userLogout } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validtors.js";
import { verifyToken } from "../utils/tokens-manager.js";

const useRouter = Router();

useRouter.get('/', getAlluser);
useRouter.post('/signup',validate(signupValidator), userSignup);
useRouter.post('/login',validate(loginValidator), userLogin);
useRouter.get('/auth-status', verifyToken, verifyUser);
useRouter.get("/logout", verifyToken, userLogout);


export default useRouter;