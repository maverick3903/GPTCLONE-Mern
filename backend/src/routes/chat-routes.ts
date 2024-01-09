import { Router } from "express";
import { verifyToken } from "../utils/tokens-manager.js";
import { chatCompletionValidator, validate } from "../utils/validtors.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router();

chatRoutes.post('/new',validate(chatCompletionValidator) ,verifyToken, generateChatCompletion);

export default chatRoutes;