import express from "express";
import * as controller from "../controllers/beeperController"

const beeperRouter = express.Router()

beeperRouter.post("/beepers" , controller.createBeeper)
beeperRouter.get("/beepers", controller.getAll)
beeperRouter.get("/beepers/:id", controller.getByID)

export default beeperRouter
