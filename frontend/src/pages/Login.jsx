import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { authActions } from "../store/auth"
import { useDispatch } from "react-redux"
import axios from "axios"

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required.")
      }
      else {
        const response = await axios.post(`http://localhost:3000/api/v1/user/login`, values)

        dispatch(authActions.login(true))
        dispatch(authActions.login(response.data.data.role))

        localStorage.setItem("id", response.data.data._id)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.data.role)

        navigate("/")
      }
    } catch (error) {
      if (error.message) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div className='h-[81.9vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-3xl'>Login</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>Username</label>
            <input type="text" name="username" placeholder='username' value={values.username} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleOnChange} autoFocus />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Password</label>
            <input type="password" name="password" placeholder='password' value={values.password} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleOnChange} />
          </div>

          <div className='mt-4 flex flex-col justify-center items-center'>
            <button type="submit" name="login" placeholder='' rows={5} value="Login" id="" className='outline-none w-full mt-2 bg-blue-600 rounded-md text-zinc-100 p-2' onClick={handleSubmit}>Login</button>
            <Link to='/forgot-password' className='text-blue-700 underline text-right w-full p-2'>Forgot Password</Link>
            <div className='text-xl text-zinc-100 mt-3'>Or</div>
            <div className='text-zinc-400 mt-3'>
              Don't have an account? &nbsp;
              <Link to='/signup' className='text-blue-700 underline'>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login