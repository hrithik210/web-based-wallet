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
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const web3_js_1 = require("@solana/web3.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const keypair = new web3_js_1.Keypair();
    //checking if a user exists with the same username
    const exisitngUser = yield models_1.UserModal.findOne({ username });
    if (exisitngUser) {
        res.status(400).json({
            message: "user already exists"
        });
    }
    yield models_1.UserModal.create({
        username,
        password,
        publicKey: keypair.publicKey.toString(),
        privateKey: keypair.secretKey.toString(),
    });
    res.json({
        publicKey: keypair.publicKey.toString()
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield models_1.UserModal.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: username
        }, process.env.jwt_secret);
        res.json({
            msg: "authenticated",
            token
        });
    }
    else {
        res.status(404).json({
            message: "user not found"
        });
    }
}));
app.post("/api/v1/tsx/sign", (req, res) => {
    res.json({
        message: "sign transaction route"
    });
});
app.get("/api/v1/tsx", (req, res) => {
    res.json({
        message: "sign transaction route"
    });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
