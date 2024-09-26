import { Beeper, Beepers ,status} from "../models/beepers"
import fs from "fs";


let beepers: Beepers = loadUsers() 


console.log(beepers)
console.log(beepers["950"])

function loadUsers () : Beepers {
  try {
    const data = fs.readFileSync("./db.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(`Error ${error}`)
    return {}
  }
}

function saveUsers () {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(beepers), "utf-8")
    console.log(`User saved successfully!`)
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

export const findAll = async (): Promise<Beeper[]> => Object.values(beepers);


export const findOne = async (id: string): Promise<Beeper> => beepers[id];


export const create = async (beeperName: string): Promise<Beeper | null> => {

    const id: number = new Date().getUTCMilliseconds();

  

    const date: Date = new Date()
  const beeper : Beeper = {
    id : id,
   name: beeperName,
   created_at: date,
   status: "manufactured"
    
  };
  console.log(beeper);
  const idkey: string = id.toString()
  beepers[idkey] = beeper;

  saveUsers()

  return beeper;
};


export const update = async (id : string, upddatedBeeper: Beeper) : Promise<Beeper | null> => {

    const beeperExists = await findOne(id)
    console.log(beeperExists);
    console.log(upddatedBeeper);

    if (!beeperExists) {
        return null
    }
    if(upddatedBeeper){
        beepers[id] = {
            ...beeperExists,
            ...upddatedBeeper}
    }
    if(upddatedBeeper.status === "deployed"){
        
        ifdeployed(id,upddatedBeeper);
    }
    console.log(beepers[id]);
    saveUsers()

    return beepers[id]
}

export const remove = async (id : string) : Promise<null | void> => {

    const beeper = await findOne(id)

    if (!beeper) {
        return null
    }

    delete beepers[id]

    saveUsers()
}


function ifdeployed(id: string, upddatedBeeper: Beeper){
    
    upddatedBeeper.status = "detonated";
    update(id,upddatedBeeper);
    setTimeout(update, 10000)

    
}


