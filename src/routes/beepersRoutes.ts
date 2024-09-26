import express from "express";
import * as controller from "../controllers/beeperController"

const beeperRouter = express.Router()

beeperRouter.post("/beepers" , controller.createBeeper)
beeperRouter.get("/beepers", controller.getAll)
beeperRouter.get("/beepers/:id", controller.getByID)
beeperRouter.put("/beepers/:id/status", controller.updateStatus);
beeperRouter.delete("/beepers/:id", controller.deleteBeeper)
beeperRouter.get("/beepers/status/:status", controller.filteredBeepers);

export default beeperRouter
