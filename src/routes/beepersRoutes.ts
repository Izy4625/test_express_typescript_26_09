import express from "express";
import * as controller from "../controllers/beeperController"

const beeperRouter = express.Router()

beeperRouter.post("/beeper" , controller.createBeeper)
beeperRouter.get("/", controller.getAll)

export default beeperRouter
