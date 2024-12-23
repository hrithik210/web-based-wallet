"use client";

import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const SubmitHandler = useCallback(async () => {

    try {
        const {data}  = await axios.post('http://localhost:3001/api/v1/signin', {
            username: username,
            password: password
        },{ withCredentials: true })

        console.log(data);

        const token = data.token;
        localStorage.setItem('authToken', token);

        toast({description : "signed in" })
        router.push('/')
        
    } catch (error) {
        console.log(error)
        toast({description : "error signing in" , variant: "destructive"})
    }

  },[username,password])

  return (
    <div className='flex justify-center h-screen'>
      <div className="flex flex-col items-center space-y-5 mt-20">
        <span>
          <label className="text-gray-300 font-medium mb-2">Username</label><br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text" 
            placeholder='Username' 
            className='py-2 px-9 rounded-md bg-gray-300 shadow'
          />
        </span>
        <span>
          <label className="text-gray-300 font-medium mb-2">Password</label><br />
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text" placeholder='Password' 
            className='py-2 px-9 rounded-md bg-gray-300 shadow'
          />
        </span>
        <div className='mt-2'>
            <button
              onClick={SubmitHandler}
              className="bg-white text-black 
              py-2 px-4 rounded-lg font-semibold
              hover:bg-gray-500">
               Submit
            </button>
        </div>

        <label className='text-white'>
            Dont have  a Account? <a href="/signup" className='underline text-white font-medium'>Sign Up</a>
        </label>

      </div>
    </div>
  )
}

export default SignIn