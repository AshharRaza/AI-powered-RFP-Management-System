import { Router } from "express";
import { AiResponseData, GetAllRequest, UserResponse } from "../controllers/GenerateResponse.controller.js";
import { GetAnalysis } from "../controllers/GetAnalysis.controller.js";



const route = Router()


route.post("/chatbot",AiResponseData)
route.post("/send-rfp",UserResponse)
route.get("/getrfprequests",GetAllRequest)
route.post("/getanalysis",GetAnalysis)

export const routers = route