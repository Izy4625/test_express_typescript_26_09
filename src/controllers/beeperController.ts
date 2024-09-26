import * as crud from "../dal/dal"
import { Request,Response } from "express"
import {StatusCodes} from "http-status-codes"
import { Beeper } from "../models/beepers";
// import { Status } from "../Enums/bepperEnums";



export const createBeeper = async (req: Request, res: Response)=>{
    try{
        const {name} = req.body
    
        if(!name){
           res.status(StatusCodes.BAD_REQUEST).json({error: "plese provide a name..."});
                   
        }
    
   
    const beeper  = await crud.create(name)

    if(beeper){
         res.status(StatusCodes.CREATED).json({beeper});
       
    }
  }
  catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  }
}
export const  getAll = async (req: Request, res: Response)=>{
    try{
   const allBeepers: Beeper[] = await crud.findAll()
   console.log(allBeepers);
   res.status(StatusCodes.OK).json(allBeepers);
    }
    catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }

}
export const getByID = async (req: Request, res: Response) =>{
    try{
        const keyId = req.params.id.toString();

        console.log(typeof keyId);
        const beeper: Beeper = await crud.findOne(keyId);
        console.log(beeper);
        res.status(StatusCodes.OK).json(beeper);}
        catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
        }
}
export const updateStatus = async (req: Request, res: Response) =>{
    const id = req.params['id']
    const data = req.body;
    const keyId = id.toString();
    const newId = keyId.substring(1)
    console.log(keyId);
    console.log(newId);
    console.log(data['status']);
    const status = data['status'];
    
   
    
    const beeper = await crud.update(newId, status);
    if(beeper){
        res.status(StatusCodes.OK).json(beeper);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json("couldnt update the status")
    }
}
          