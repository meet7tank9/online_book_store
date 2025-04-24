import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from "../components/Loader/Loader"
import MobileNav from '../components/Profile/MobileNav'
const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const [profile, setProfile] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/user/user-info`, { headers: headers })
      setProfile(response.data.data)
    }
    getUser()
  }, [])
  
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex md:flex-row flex-col gap-4 w-full py-8 text-white'>
      {
        !profile ? <div className='flex items-center justify-center w-full'><Loader /></div>
          : <>
            <div className='w-full md:w-1/6 md:h-screen'>
              <Sidebar data={profile} />
              <MobileNav />
            </div>
            <div className='w-full md:w-5/6'>
              <Outlet />
            </div>
          </>
      }
    </div>
  )
}

export default Profile