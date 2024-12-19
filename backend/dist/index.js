"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => {
    res.json({
        message: "signup route"
    });
});
app.post("/api/v1/signin", (req, res) => {
    res.json({
        message: "signin route"
    });
});
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
