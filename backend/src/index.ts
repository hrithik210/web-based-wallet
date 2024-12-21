import express from 'express';
import { UserModal } from './models';
import { Keypair } from '@solana/web3.js';
import Jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();



const app = express();

app.use(express.json());



app.post("/api/v1/signup" ,  async (req , res) => {

    const username = req.body.username;
    const password = req.body.password;

    const keypair = new Keypair();

    //checking if a user exists with the same username
    const exisitngUser = await UserModal.findOne({username});
    if(exisitngUser){
        res.status(400).json({
            message : "user already exists"
        })
    }

    await UserModal.create({
        username,
        password,
        publicKey : keypair.publicKey.toString(),
        privateKey : keypair.secretKey.toString(),
    })
    res.json({
        publicKey : keypair.publicKey.toString()
    })
})

app.post("/api/v1/signin" ,  async (req , res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModal.findOne({username , password});

    if(user){
       const token =  Jwt.sign({
            id : username
       }, process.env.jwt_secret!)

       res.json({
        msg : "authenticated",
        token
       })
    }else{
        res.status(404).json({
            message : "user not found"
        })
    }

})

app.post("/api/v1/tsx/sign" ,  (req , res) => {

    res.json({
        message : "sign transaction route"
    })
})

app.get("/api/v1/tsx" ,  (req , res) => {

    res.json({
        message : "sign transaction route"
    })
})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
});