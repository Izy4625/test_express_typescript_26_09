import * as crud from "../dal/dal"
import { Request,Response } from "express"
import {StatusCodes} from "http-status-codes"



export  async function createBeeper(req: Request, res: Response){
    try{
        const {name} = req.body
        if(!name){
            return res.status(StatusCodes.BAD_REQUEST).json({error: "plese provide a name..."});
            
        }
    
   
    const beeper  = await crud.create(name)

    if(beeper){
        return res.status(StatusCodes.CREATED).json({beeper});
    }
  }
  catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
}
          