import { Beeper, Beepers } from "../models/beepers"
import fs from "fs";
import {Status} from "../Enums/bepperEnums"




let beepers: Beepers = loadUsers() 

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
   status: Status.assembled
    
  };
  const idkey: string = id.toString()
  beepers[idkey] = beeper;

  saveUsers()

  return beeper;
};

// export const findByEmail = async (user_email: string): Promise<null | UnitUser> => {

//   const allUsers = await findAll();

//   const getUser = allUsers.find(result => user_email === result.email);

//   if (!getUser) {
//     return null;
//   }

//   return getUser;
// };

// export const comparePassword  = async (email : string, supplied_password : string) : Promise<null | UnitUser> => {

//     const user = await findByEmail(email)

//     const decryptPassword = await bcrypt.compare(supplied_password, user!.password)

//     if (!decryptPassword) {
//         return null
//     }

//     return user
// }

// export const update = async (id : string, updateValues : User) : Promise<UnitUser | null> => {

//     const userExists = await findOne(id)

//     if (!userExists) {
//         return null
//     }

//     if(updateValues.password) {
//         const salt = await bcrypt.genSalt(10)
//         const newPass = await bcrypt.hash(updateValues.password, salt)

//         updateValues.password = newPass
//     }

//     users[id] = {
//         ...userExists,
//         ...updateValues
//     }

//     saveUsers()

//     return users[id]
// }

// export const remove = async (id : string) : Promise<null | void> => {

//     const user = await findOne(id)

//     if (!user) {
//         return null
//     }

//     delete users[id]

//     saveUsers()
// }
// export const addBook = async (id:string,book: UnitBook):Promise<UnitUser | null> =>{
//     const user =  await findOne(id);
//     console.log(id);
//     console.log(book);
//     if(!user){
//         return user
//     }
//     console.log(user)
    
//     user.bookList.push(book);
//     console.log(user);
//     users[id] = user
       
//     console.log(users[id])
//     saveUsers()
//     return users[id];
// }

