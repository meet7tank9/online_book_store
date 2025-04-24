import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loader from '../Loader/Loader'

const Settings = () => {
  const [profileData, setProfileData] = useState()
  const [value, setValue] = useState({ address: "" })
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/user-info`, { headers })

        setProfileData(response.data.data);
        setValue({ address: response.data.data.address })
      } catch (error) {
        console.log(error);
      }
    }
    getUserData()
  }, [])

  const handleOnSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/user/update-address`, value, { headers })
      
      alert(response.data.message);
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <>
      {
        !profileData && (
          <div className='w-full h-full flex justify-center items-center'> <Loader /> </div >
        )
      }
      {profileData && (
        <>
          <div className='text-3xl text-gray-400'>Settings</div>
          <div className='h-[81vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
            <div className='bg-zinc-800 rounded-lg px-8 py-10 w-full md:w-3/6 lg:w-2/6'>
              <div className=''>
                <div className='mt-4'>
                  <label htmlFor="" className='text-zinc-400'>Username</label>
                  <input type="text" name="username" placeholder='username' value={profileData.username} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' readOnly />
                </div>
                <div className='mt-4'>
                  <label htmlFor="" className='text-zinc-400'>Email</label>
                  <input type="text" name="email" placeholder='email' value={profileData.email} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' readOnly />
                </div>
                <div className='mt-4'>
                  <label htmlFor="" className='text-zinc-400'>Address</label>
                  <input type="text" name="address" placeholder='address' value={value.address} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2' onChange={handleOnChange} />
                </div>

                <div className='mt-4 flex flex-col justify-center items-center'>
                  <button type="submit" name="login" placeholder='' rows={5} value="Login" id="" className='outline-none w-full mt-2 bg-yellow-400 rounded-md text-black font-semibold p-2' onClick={handleOnSubmit} >Update</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Settings