import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (values.username === "" || values.email === "" || values.password === "" || values.address === "") {
        alert("All fields are required.")
      }
      else {
        const response = await axios.post(`http://localhost:3000/api/v1/user/register`, values)
        navigate("/login")
      }
    } catch (error) {
      if (error.message) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-3xl'>Register</p>
        <div className='mt-4'>
          <form action="" >
            <div>
              <label htmlFor="" className='text-zinc-400'>Username</label>
              <input type="text" name="username" placeholder='username' value={values.username} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleChange} autoFocus />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-zinc-400'>Email</label>
              <input type="email" name="email" placeholder='abc@example.com' value={values.email} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleChange} />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-zinc-400'>Password</label>
              <input type="password" name="password" placeholder='password' value={values.password} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleChange} />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-zinc-400'>Address</label>
              <textarea type="" name="address" placeholder='Address' rows={5} value={values.address} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleChange} />
            </div>
            <div className='mt-4 flex flex-col justify-center items-center'>
              <button name="register" placeholder='' rows={5} value="Register" id="" className='outline-none w-full mt-2 bg-blue-600 rounded-md text-zinc-100 p-2' onClick={handleSubmit}>Register</button>
              <div className='text-xl text-zinc-100 mt-3'>Or</div>
              <div className='text-zinc-400 mt-3'>
                Already have an account? &nbsp;
                <Link to='/login' className='text-blue-500 underline'>Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp