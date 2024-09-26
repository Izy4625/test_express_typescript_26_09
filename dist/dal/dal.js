"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findOne = exports.findAll = void 0;
const fs_1 = __importDefault(require("fs"));
const bepperEnums_1 = require("../Enums/bepperEnums");
let beepers = loadUsers();
console.log(beepers);
function loadUsers() {
    try {
        const data = fs_1.default.readFileSync("./db.json", "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
function saveUsers() {
    try {
        fs_1.default.writeFileSync("./db.json", JSON.stringify(beepers), "utf-8");
        console.log(`User saved successfully!`);
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(beepers); });
exports.findAll = findAll;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () { return beepers[id]; });
exports.findOne = findOne;
const create = (beeperName) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new Date().getUTCMilliseconds();
    const date = new Date();
    const beeper = {
        id: id,
        name: beeperName,
        created_at: date,
        status: bepperEnums_1.Status.assembled
    };
    console.log(beeper);
    const idkey = id.toString();
    beepers[idkey] = beeper;
    saveUsers();
    return beeper;
});
exports.create = create;
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
