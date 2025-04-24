import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()


  const [values, setValues] = useState({
    email: "",
    otp: "",
    newPassword: "",
    cPassword: ""
  })

  useEffect(() => {

    const emailFromLocation = location.state?.email || ""

    setValues((prevState) => {
      return { ...prevState, email: emailFromLocation }
    })

  }, [])

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (values.email === "" || values.otp === "" || values.newPassword === "" || values.cPassword === "") {
        alert("Please enter all fields.")
      }
      if (values.newPassword !== values.cPassword) {
        alert("New password and confirm password should be same.")
      }
      else {
        const response = await axios.post(`http://localhost:3000/api/v1/user/reset-password`, values)
        if (response.status == 400) {
          alert(response.data.message)
        }

        if (response.status == 200) {
          navigate("/login")
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
            <input type="email" name="email" placeholder='Enter registered email' value={values.email} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleOnChange} readOnly />
          </div>
          <div>
            <label htmlFor="" className='text-zinc-400'>OTP</label>
            <input type="text" name="otp" placeholder='Enter OTP' value={values.otp} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleOnChange} autoFocus />
          </div>
          <div>
            <label htmlFor="" className='text-zinc-400'>New Password</label>
            <input type="password" name="newPassword" placeholder='Enter new password' value={values.newPassword} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleOnChange} />
          </div>
          <div>
            <label htmlFor="" className='text-zinc-400'>Confirm Password</label>
            <input type="password" name="cPassword" placeholder='Enter confirm password' value={values.cPassword} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' required onChange={handleOnChange} />
          </div>

          <div className='mt-4 flex flex-col justify-center items-center'>
            <button type="submit" id="" className='outline-none w-full mt-2 bg-blue-600 rounded-md text-zinc-100 p-2' onClick={handleSubmit}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword