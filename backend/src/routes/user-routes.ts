import { Router } from "express";
import { getAlluser, userLogin, userSignup } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validtors.js";

const useRouter = Router();

useRouter.get('/', getAlluser);

useRouter.post('/signup',validate(signupValidator), userSignup);

useRouter.post('/login',validate(loginValidator), userLogin);

export default useRouter;