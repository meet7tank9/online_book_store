import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: ""
  })

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (values.email === "") {
        alert("Please enter registered email.")
      }
      else {
        const response = await axios.post(`http://localhost:3000/api/v1/user/forgot-password`, values)
        if (response.status == 400) {
          alert(response.data.message)
        }

        if (response.status == 200) {
          navigate("/reset-password", { state: { email: values.email } })
        }
      }
    } catch (error) {
      if (error) {
        alert(error.response.data.message)
      }
    }
  }
  return (
    <div className='h-[81.9vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-3xl'>Forgot Password</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>Email</label>
            <input type="email" name="email" placeholder='Enter registered email' value={values.email} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleOnChange} autoFocus />
          </div>
          <div className='mt-4 flex flex-col justify-center items-center'>
            <button type="submit" className='outline-none w-full mt-2 bg-blue-600 rounded-md text-zinc-100 p-2' onClick={handleSubmit}>Send OTP</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword