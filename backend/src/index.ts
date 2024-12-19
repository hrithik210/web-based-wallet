import express from 'express';

const app = express();

app.use(express.json());



app.post("/api/v1/signup" ,  (req , res) => {
    res.json({
        message : "signup route"
    })
})

app.post("/api/v1/signin" ,  (req , res) => {

    res.json({
        message : "signin route"
    })
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