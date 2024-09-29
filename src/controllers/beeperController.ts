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
    console.log(id);
    const data = req.body;
  
    console.log(id);
    console.log(id);
    console.log(data['status']);
    const status = data['status'];
    const newbeeper:Beeper = {
        status : status
    }
    if(status === "deployed"){
        newbeeper.lat = data['lat'];
        newbeeper.lon = data['lon']
    }
    console.log(newbeeper);
  
    const beeper = await crud.update(id, newbeeper);
    if(beeper){
        res.status(StatusCodes.OK).json(beeper);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json("couldnt update the status")
    }
}

export const deleteBeeper = async (req: Request, res: Response) =>{
    const id = req.params['id']

    const keyId = id.toString();
    const newId = keyId.substring(1)
    try{
       await crud.remove(newId);
       const beeper = await crud.findOne(newId);
       if(!beeper){
        res.status(StatusCodes.OK).json("succesfully deleted");
       }
       else{
        res.status(StatusCodes.BAD_REQUEST).json("couldnt delete this beeper")
       }
        
    }
    catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}
 export const filteredBeepers = async (req: Request, res: Response) =>{
    try{
        const status = req.params['status']
        const newstatus = status.substring(1);
        console.log(newstatus);
        if(status){
        const allBeepers: Beeper[] = await crud.findAll()
        const filtered = allBeepers.filter(obj => obj.status === newstatus)
        console.log(filtered);

        if(filtered){
            res.status(StatusCodes.OK).json(filtered);
        }
    }

        }catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
        }
 }