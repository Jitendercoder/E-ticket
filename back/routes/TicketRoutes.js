import express from "express"
import { addUser ,
         getUserById, 
         getUsers ,
        updateRole ,
        addUserInfo,
        login} from "../controllers/UserController.js"


import { addTicketRequest , 
         getTicketRequests,
         getTicketRequestByFlowPosition ,
         getTicketRequestsById,
         deleteTicket,
         updateTicket
} from "../controllers/TicketRequestController.js"

import {  getFlowByStepNumber ,addFlow ,getMaxFlow} from "../controllers/RequestFlowController.js"
import authenticateRequest from "../middleware/requestChecker.js"


const Router = express.Router()


Router.get("/user" , getUsers)
Router.get("/user/:id" , getUserById)
Router.post("/user/update" , updateRole)

Router.post("/adduser" , addUserInfo)
Router.post("/login" , login)

Router.post("/ticket/requests" , authenticateRequest , addTicketRequest)
Router.get("/ticket/requests" , authenticateRequest , getTicketRequests)
Router.get("/ticket/requests/:requestId" , authenticateRequest , getTicketRequestsById)
Router.post("/ticket/requests/:requestId" , authenticateRequest , updateTicket)
Router.delete("/ticket/requests/:requestId" , authenticateRequest , deleteTicket)
Router.get("/ticket/request-for-action",authenticateRequest, getTicketRequestByFlowPosition)


Router.post("/request-flow" , addFlow)
Router.get("/request-flow/:number" , getFlowByStepNumber)
Router.get("/max/flow"  ,getMaxFlow)



export default Router