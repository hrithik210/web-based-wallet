import express from 'express';
import { UserModal } from './models';
import { Keypair, Transaction , Connection } from '@solana/web3.js';
import Jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from 'cookie-parser';
import bs58 from 'bs58';


const connection = new Connection("https://api.devnet.solana.com");

dotenv.config();



const app = express();

const corsOptions = {
    origin: "http://localhost:3000", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };
  
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(cookieParser());



app.post("/api/v1/signup" ,  async (req , res) => {

    const username = req.body.username;
    const password = req.body.password;

    const keypair = new Keypair();
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

       res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });

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

interface TokenPayload extends JwtPayload {
    id: string;
}

app.post("/api/v1/txn/sign", async (req : any, res : any) => {

    try {
        const token = req.cookies.token;

        if (!token) {
          res.status(401).json({
            message: "unauthorized",
          });
        }
      
        const decoded = Jwt.verify(token, process.env.jwt_secret!) as TokenPayload;
      
        const username = decoded.id;
        console.log("username", username);
        const user = await UserModal.findOne({username});
        // const privateKeyString = user?.privateKey;
        // const privateKeyArray = privateKeyString!.split(',').map(Number);
      
        // const keypair = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
      
        const  demoPrivateKey = process.env.privateKey!;
        let secretKey = bs58.decode(demoPrivateKey);
        const demoKeyPair = Keypair.fromSecretKey(secretKey);

        console.log("no error");
        
    const serializedTransaction = req.body.message;

    const transaction = Transaction.from(Buffer.from(serializedTransaction));
    transaction.feePayer = demoKeyPair.publicKey;
    
    const blockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;
    
    transaction.sign(demoKeyPair);
    
    await connection.sendTransaction(transaction, [demoKeyPair]);
        
      res.json({
          message: "sign transaction route",
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "error"
        });
    }
  
});

app.get("/api/v1/txn" , async (req , res) => {
    
    

    res.json({
        message : "sign transaction route"
    })
})

app.listen(3001 , ()=>{
    console.log("Server is running on port 3000")
});