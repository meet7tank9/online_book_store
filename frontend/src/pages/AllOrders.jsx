import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const AllOrders = () => {

  const [orderData, setOrderData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const headers = {
    id: localStorage.getItem("id"),
    order_id: orderData?._id,
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/order/get-all-orders`, { headers })

        setOrderData(response.data.data)
        setFilteredData(response.data.data)
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getOrders()
  }, [])

  const handleDropdown = (event, i) => {
    try {
      // get order id from the index of the item
      const order_id = filteredData[i]._id
      console.log(order_id);

      setTimeout(async () => {
        const response = await axios.put(`http://localhost:3000/api/v1/order/update-status/${order_id}`, { status: event.target.value }, { headers })

        if (response.status == 200) {
          const response = await axios.get(`http://localhost:3000/api/v1/order/get-all-orders`, { headers })
          setFilteredData(response.data.data)
        }
      }, 300)

    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const handleOrderDetails = async (e) => {
    try {
      if (e.target.value == "Oldest") {
        setFilteredData([...filteredData].reverse())
      }
      if (e.target.value == "Newest") {
        setFilteredData(orderData)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!orderData && <div className='w-full h-full flex justify-center items-center'> <Loader /> </div>}
      {
        orderData && orderData.length == 0 && <div className='bg-zinc-900 w-full h-screen flex items-center justify-center'>
          <div className='text-gray-400 text-5xl'>
            No Orders History
          </div>
        </div>
      }
      {
        filteredData && filteredData.length > 0 && <>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl text-gray-400 mb-6'>All Orders</h1>
            <div className='flex gap-2 justify-center items-center'>
              <div>Sort: </div>
              <select className='text-center bg-transparent outline-none text-yellow-400 bg-zinc-700 p-1 rounded' onChange={handleOrderDetails}>
                <option value="" className='text-gray-600 bg-zinc-900 font-semibold outline-none'></option>
                <option value="Newest" className='text-yellow-600 bg-zinc-900 font-semibold'>Newest</option>
                <option value="Oldest" className='text-yellow-600 bg-zinc-900 font-semibold'>Oldest</option>
              </select>
            </div>
          </div>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Order Date</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className='text-center'>Book Title</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='text-center'>Username</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-[5%]'>
              <h1 className='text-center'>Price</h1>
            </div>
          </div>


          {filteredData.map((item, i) => {
            return <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-700 hover:cursor-pointer' key={i}>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='text-center'>{item.createdAt?.split("T")[0]}</h1>
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
                <h1 className='text-start'>{item.user?.username}</h1>
              </div>
              <div className='w-[16%]flex flex-col justify-centers items-center'>
                <div className={`${item.status == 'Order Placed' && 'text-zinc-300'}
                ${item.status == 'Out For Delivery' && 'text-yellow-600'}
                ${item.status == 'Delivered' && 'text-green-600'}
                ${item.status == 'Cancelled' && 'text-red-600'}`}>{item.status}</div>
                <select className='text-center bg-transparent outline-none text-yellow-400 bg-zinc-700' onChange={(event) => handleDropdown(event, i)}>
                  <option value="Order Placed" className='text-gray-600 bg-zinc-900 font-semibold outline-none'>Order Placed</option>
                  <option value="Out For Delivery" className='text-yellow-600 bg-zinc-900 font-semibold'>Out For Delivery</option>
                  <option value="Delivered" className='text-green-600 bg-zinc-900 font-semibold outline-none'>Delivered</option>
                  <option value="Cancelled" className='text-red-700 bg-zinc-900 font-semibold'>Cancelled</option>
                </select>
              </div>
              <div className='w-[5%]'>
                <h1 className='text-center'>{item.book?.price}</h1>
              </div>
            </div>
          })}
        </>
      }
    </>
  )
}

export default AllOrders