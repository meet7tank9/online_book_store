import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Loader from '../components/Loader/Loader'

const AllUsers = () => {
    const [userData, setUserData] = useState()

    const headers = {
        user_id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem('token')}`
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/get-users`, { headers })
                console.log(response.data.data);
                setUserData(response.data.data)
            } catch (error) {
                console.log(error);
            }
        }

        getUserData()
    }, [])

    return (
        <>
            {!userData && <div className='w-full h-full flex justify-center items-center'> <Loader /> </div>}
            {
                userData && userData.length == 0 && <div className='bg-zinc-900 w-full h-screen flex items-center justify-center'>
                    <div className='text-gray-400 text-5xl'>
                        No User Found
                    </div>
                </div>
            }
            {
                userData && userData.length > 0 && <>

                    <h1 className='text-3xl text-gray-400 mb-6'>User Details</h1>
                    <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>Sr.</h1>
                        </div>
                        <div className='w-[22%]'>
                            <h1 className='text-center'>Username</h1>
                        </div>
                        <div className='w-[35%]'>
                            <h1 className='text-center'>Email</h1>
                        </div>
                        <div className='w-[35%]'>
                            <h1 className='text-center'>Address</h1>
                        </div>
                        <div className='w-[16%]'>
                            <h1 className='text-center'>Role</h1>
                        </div>
                    </div>

                    {userData.map((item, i) => {
                        return <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-700 hover:cursor-pointer'>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>{i + 1}</h1>
                            </div>
                            <div className='w-[22%]'>
                                <h1 className='text-center'>{item.username}</h1>
                            </div>
                            <div className='w-[35%]'>
                                <h1 className='text-center'>{item.email}</h1>
                            </div>
                            <div className='w-[35%]'>
                                <h1 className='text-start'>{item.address?.slice(0, 20)}...</h1>
                            </div>
                            <div className='w-[16%]'>
                                <h1 className='text-center'>{item.role}</h1>
                            </div>
                        </div>
                    })}
                </>
            }
        </>
    )
}

export default AllUsers