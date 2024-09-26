import * as crud from "../dal/dal"
import { Request,Response } from "express"
import {StatusCodes} from "http-status-codes"
import { Beeper } from "../models/beepers";



export  async function createBeeper(req: Request, res: Response): Promise<Beeper | any>{
    try{
        const {name} = req.body
        if(!name){
           res.status(StatusCodes.BAD_REQUEST).json({error: "plese provide a name..."});
           return 
            
        }
    
   
    const beeper  = await crud.create(name)

    if(beeper){
         res.status(StatusCodes.CREATED).json({beeper});
         return beeper
    }
  }
  catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
}
export async function getAll(): Promise<Beeper[]| any>{
   const allBeepers: Beeper[]  = await crud.findAll()
   return allBeepers

}
          