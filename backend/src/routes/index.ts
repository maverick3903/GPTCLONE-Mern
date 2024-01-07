import { Router } from "express";
import useRouter from "./user-routes.js";
import chatRouter from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/user", useRouter) //domain/api/v1/user
appRouter.use("/chat", chatRouter) //domain/api/v1/chat


export default appRouter;