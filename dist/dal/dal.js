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
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const fs_1 = __importDefault(require("fs"));
let beepers = loadUsers();
console.log(beepers);
console.log(beepers["950"]);
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
        status: "assembled"
    };
    console.log(beeper);
    const idkey = id.toString();
    beepers[idkey] = beeper;
    saveUsers();
    return beeper;
});
exports.create = create;
const update = (id, upddatedBeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperExists = yield (0, exports.findOne)(id);
    console.log(beeperExists);
    console.log(upddatedBeeper);
    if (!beeperExists) {
        return null;
    }
    if (upddatedBeeper) {
        beepers[id] = Object.assign(Object.assign({}, beeperExists), upddatedBeeper);
    }
    console.log(beepers[id]);
    saveUsers();
    return beepers[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beeper = yield (0, exports.findOne)(id);
    if (!beeper) {
        return null;
    }
    delete beepers[id];
    saveUsers();
});
exports.remove = remove;
