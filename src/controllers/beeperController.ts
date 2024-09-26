import * as crud from "../dal/dal"
import { Request,Response } from "express"
import {StatusCodes} from "http-status-codes"
import { Beeper } from "../models/beepers";



export const createBeeper = async (req: Request, res: Response)=>{
    try{
        const {name} = req.body
        console.log(name);
        if(!name){
           res.status(StatusCodes.BAD_REQUEST).json({error: "plese provide a name..."});
                   
        }
    
   
    const beeper  = await crud.create(name)
    console.log(beeper);

    if(beeper){
         res.status(StatusCodes.CREATED).json({beeper});
       
    }
  }
  catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
}
export const  getAll = async (req: Request, res: Response)=>{
   const allBeepers: Beeper[] = await crud.findAll()
   console.log(allBeepers);
   res.status(StatusCodes.OK).json(allBeepers);

}
          