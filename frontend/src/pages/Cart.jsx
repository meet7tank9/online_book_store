import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader/Loader'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { CiCirclePlus, CiCircleMinus, CiParking1 } from "react-icons/ci";

const Cart = () => {
  const [data, setData] = useState()
  const [total, setTotal] = useState(0)
  const [totalBooks, setTotalBooks] = useState(0)
  const navigate = useNavigate()

  const headers = {
    user_id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/cart/get-cart`, { headers })
        const dataArray = response.data.data
        const dataAfterQuantityAdded = dataArray.map((item) => {
          return { ...item, quantity: 1 }
        })
        setData(dataAfterQuantityAdded);

      } catch (error) {
        console.log(error);
      }
    }
    getCart()
  }, [])

  useEffect(() => {
    if (data && data.length > 0) {
      // count total
      let total = 0
      data.forEach((item) => {
        total += Number(item.quantity * item.price)
      })

      // count quantity
      let quantity = 0;
      data.forEach((item) => {
        quantity += Number(item.quantity)
      })

      setTotalBooks(quantity)

      setTotal(total)
    }
  }, [data])

  const deleteItem = async (book_id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/cart/remove-from-cart/${book_id}`, {}, { headers })
      // console.log(response.data.data);
      alert(response.data.message);
      const response2 = await axios.get(`http://localhost:3000/api/v1/cart/get-cart`, { headers })
      // console.log(response2);
      setData(response2.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const placeOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/order/place-order`, { order: data }, { headers })
      alert(response.data.message)
      navigate('/profile/order-history')
    } catch (error) {
      console.log(error);
    }
  }

  const handleIncrement = async (i) => {

    const updatedData = data.map((item, index) => {

      if (index == i) {
        if (item.quantity > 4) {
          alert("Maximum five books can be purchase")
          return item
        }
        let calculatedQty = item.quantity + 1
        item = { ...item, quantity: calculatedQty }
      }
      return item
    })
    setData(updatedData)
  }

  const handleDecrement = (i) => {
    const updatedData = data.map((item, index) => {

      if (index == i) {

        if (item.quantity < 2) {
          alert("Minimum one book needs to be purchase")
          return item
        }
        let calculatedQty = item.quantity - 1
        item = { ...item, quantity: calculatedQty }
      }
      return item
    })
    setData(updatedData)
  }

  return (
    <>

      <div className='bg-zinc-900 h-[100vh] sm:px-12 px-4'>
        {
          data && data.length == 0 && <div className='bg-zinc-900 w-full h-screen flex items-center justify-center'>
            <div className='text-gray-400 text-5xl'>
              No book is in cart
            </div>
          </div>
        }
        {!data && <div className='w-full h-full flex justify-center items-center'> <Loader /> </div>}
        {data && data.length > 0 && (
          <>
            <h1 className='text-4xl font-semibold text-zinc-400 p-8 text-center'>
              Your Cart
            </h1>
            {
              data.map((item, i) => (
                <div className='w-full my-4 rounded flex flex-col md:flex-row p-2 bg-zinc-800 justify-around items-center' key={i}>
                  <img src={item.url} alt="" className='h-[20vh] md:h-[10vh] object-cover' />

                  <div className='w-full md:w-auto flex flex-col items-start justify-center'>
                    <h1 className='text-2xl text-zinc-300 font-semibold text-start mt-2 md:mt-8'>{item.title}</h1>
                    <p className='text-normal mt-2 text-zinc-300 hidden lg:block'>
                      {item.description.substr(0, 100)}...
                    </p>
                    <p className='text-normal mt-2 text-zinc-300 hidden md:block lg:hidden'>
                      {item.description.substr(0, 60)}...
                    </p>
                    <p className='text-normal mt-2 text-zinc-300 md:hidden block'>
                      {item.description.substr(0, 100)}...
                    </p>
                  </div>

                  <div className='text-zinc-300 text-xl flex items-center gap-2'>
                    <div className=''><CiCirclePlus className='text-4xl cursor-pointer' onClick={() => handleIncrement(i)} /></div>
                    <div className='text-3xl'>{item.quantity}</div>
                    <div className=''><CiCircleMinus className='text-4xl cursor-pointer' onClick={() => handleDecrement(i)} /></div>
                  </div>
                  <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                    <h2 className='text-zinc-300 text-3xl font-semibold flex'>
                      {item.price}
                    </h2>
                    <button className='text-red-600 bg-red-100 border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(item._id)} >Delete</button>
                  </div>
                </div>
              ))
            }
          </>
        )}
        {data && data.length > 0 && (
          <div className='mt-4 w-full flex items-center justify-end'>
            <div className='p-7 bg-zinc-800 rounded-lg'>
              <h1 className='text-3xl text-zinc-400'>Total Amount</h1>
              <div className='mt-3 flex flex-col justify-between text-xl text-zinc-200 gap-3'>
                <h2>Books: {totalBooks}</h2>
                <h2>Total: {total}</h2>
              </div>
              <div className='w-[100%] mt-3'>
                <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300' onClick={placeOrder}>Place Your Order</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default Cart