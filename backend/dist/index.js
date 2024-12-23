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
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const keypair = new web3_js_1.Keypair();
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
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
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
app.post("/api/v1/txn/sign", (req, res) => {
    res.json({
        message: "sign transaction route"
    });
});
app.get("/api/v1/txn", (req, res) => {
    const serializedTransaction = req.body.serializedTransaction;
    const transaction = web3_js_1.Transaction.from(serializedTransaction);
    transaction.sign();
    res.json({
        message: "sign transaction route"
    });
});
app.listen(3001, () => {
    console.log("Server is running on port 3000");
});
