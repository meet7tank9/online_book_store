import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState()
  
  const headers = {
    user_id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/order/get-order-history`, { headers })

        setOrderHistory(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    getOrderHistory()
  }, [])

  return (
    <>
      {!orderHistory && <div className='w-full h-full flex justify-center items-center'> <Loader /> </div>}
      {
        orderHistory && orderHistory.length == 0 && <div className='bg-zinc-900 w-full h-screen flex items-center justify-center'>
          <div className='text-gray-400 text-5xl'>
            No Orders History
          </div>
        </div>
      }
      {
        orderHistory && orderHistory.length > 0 && <>

          <div className='flex justify-between items-center'>
            <h1 className='text-3xl text-gray-400 mb-6'>Order History</h1>
          </div>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='text-center'>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Order Date</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Rating</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-center'>Mode</h1>
            </div>
          </div>

          {orderHistory.map((item, i) => {
            return <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-700 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link to={`/view-book-details/${item.book?._id}`}>
                  <h1 className='text-center'>{item.book?.title}</h1>
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1 className='text-center'>{item.book?.description?.slice(0, 20)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className='text-center'>{item.book?.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='text-center'>{item.createdAt?.split("T")[0]}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='text-center'>
                  {item.status == "Order Placed" ? (
                    <div className='text-yellow-400'>{item.status}</div>
                  ) : item.status == "Cancelled" ? (
                    <div className='text-red-600'>{item.status}</div>
                  ) : item.status == "Delivered" ? (
                    <div className='text-green-700'>{item.status}</div>
                  ) : <div className='text-yellow-600'>{item.status}</div>
                  }
                </h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='text-center'><Link to={`/rating/${item.book?._id}`} >Give Rating</Link></h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-center'>COD</h1>
              </div>
            </div>
          })}
        </>
      }
    </>
  )
}

export default UserOrderHistory