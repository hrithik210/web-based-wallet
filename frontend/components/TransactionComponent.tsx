"use client";
import { useCallback, useState } from "react"
import { Transaction , Connection , PublicKey, SystemProgram } from "@solana/web3.js"
import axios from "axios"
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { get } from "http";
import { toast } from "@/hooks/use-toast";

const connection = new Connection('https://api.devnet.solana.com');

const fromPubkey = new PublicKey("E6gZBUdyWJmLwisKq8yy5RxoYKXSwkqMjgzgZeF45vqD");

const TransactionComponent = () => {
  const [address ,setaddress] = useState('')
  const [amount ,setamount] = useState("")

  const username = useCurrentUser();
  console.log("user" ,username);

 const sendSol  = useCallback( async() => {
    const ix = SystemProgram.transfer({
      fromPubkey : fromPubkey,
      toPubkey: new PublicKey(address),
      lamports : Number(amount) * 1000000000
    })

    const transaction  = new Transaction().add(ix)
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubkey;



    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    })

    console.log(serializedTransaction);

    try {
      await axios.post("http://localhost:3001/api/v1/txn/sign" , {
        message : serializedTransaction,
        retry : false
      },{
        withCredentials: true
      })
      
      toast({description : "transaction successfull" })
    } catch (error) {
      console.log(error);
      toast({description : "error in transaction" , variant: "destructive"})
    }




 }, [address, amount])

  return (
    <div className='flex justify-center h-screen'>
      <div className="flex flex-col items-center space-y-5 mt-20">
        <span>
          <label className="text-gray-300 font-medium mb-2">Address</label><br />
          <input
            value={address} 
            onChange={(e) => setaddress(e.target.value)}
            type="text" 
            placeholder='address' 
            className='py-2 px-9 rounded-md bg-gray-300 shadow'
          />
        </span>
        <span>
          <label className="text-gray-300 font-medium mb-2">Amount</label><br />
          <input 
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            type="text" placeholder='amount' 
            className='py-2 px-9 rounded-md bg-gray-300 shadow'
          />
        </span>
        <div className='mt-2'>
            <button
              onClick={sendSol} 
              className="bg-white text-black 
              py-2 px-4 rounded-lg font-semibold
              hover:bg-gray-500">
               Submit
            </button>
        </div>

      </div>
    </div>
  )
}

export default TransactionComponent