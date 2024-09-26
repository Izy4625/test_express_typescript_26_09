"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredBeepers = exports.deleteBeeper = exports.updateStatus = exports.getByID = exports.getAll = exports.createBeeper = void 0;
const crud = __importStar(require("../dal/dal"));
const http_status_codes_1 = require("http-status-codes");
// import { Status } from "../Enums/bepperEnums";
const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "plese provide a name..." });
        }
        const beeper = yield crud.create(name);
        if (beeper) {
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ beeper });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.createBeeper = createBeeper;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBeepers = yield crud.findAll();
        console.log(allBeepers);
        res.status(http_status_codes_1.StatusCodes.OK).json(allBeepers);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.getAll = getAll;
const getByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyId = req.params.id.toString();
        console.log(typeof keyId);
        const beeper = yield crud.findOne(keyId);
        console.log(beeper);
        res.status(http_status_codes_1.StatusCodes.OK).json(beeper);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.getByID = getByID;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const data = req.body;
    const keyId = id.toString();
    const newId = keyId.substring(1);
    console.log(keyId);
    console.log(newId);
    console.log(data['status']);
    const status = data['status'];
    const newbeeper = {
        status: status
    };
    if (status === "deployed") {
        newbeeper.latitude = data['lat'];
        newbeeper.longitude = data['lon'];
    }
    const beeper = yield crud.update(newId, newbeeper);
    if (beeper) {
        res.status(http_status_codes_1.StatusCodes.OK).json(beeper);
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json("couldnt update the status");
    }
});
exports.updateStatus = updateStatus;
const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const keyId = id.toString();
    const newId = keyId.substring(1);
    try {
        yield crud.remove(newId);
        const beeper = yield crud.findOne(newId);
        if (!beeper) {
            res.status(http_status_codes_1.StatusCodes.OK).json("succesfully deleted");
        }
        else {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json("couldnt delete this beeper");
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.deleteBeeper = deleteBeeper;
const filteredBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params['status'];
        const newstatus = status.substring(1);
        console.log(newstatus);
        if (status) {
            const allBeepers = yield crud.findAll();
            const filtered = allBeepers.filter(obj => obj.status === newstatus);
            console.log(filtered);
            if (filtered) {
                res.status(http_status_codes_1.StatusCodes.OK).json(filtered);
            }
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.filteredBeepers = filteredBeepers;
