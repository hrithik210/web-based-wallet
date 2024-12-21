"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.mongoUrl).then(() => {
    console.log(`connected to mongodb: ${process.env.mongoUrl}`);
}).catch((err) => {
    console.log(`error connecting to mongodb`, err);
});
const UserSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    publicKey: String,
    privateKey: String
});
exports.UserModal = mongoose_1.default.model("user", UserSchema);
