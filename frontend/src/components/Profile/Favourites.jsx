import React, { useState, useEffect } from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const Favourites = () => {
  const [data, setData] = useState([])

  const headers = {
    user_id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/favourite/get-favourite-books`, { headers })
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFavourites()
  }, [])
  

  return (
    <>
      {!data && <div className='w-full h-full flex justify-center items-center'> <Loader /> </div>}

      {
        data.length == 0 ? <div className='w-full flex items-center justify-center text-5xl text-gray-500'>No Books In Favourites</div>
          : <>
            <div className='text-3xl text-gray-400'>Favourites</div>
            <div className='mt-8 grid grid-cols-2 md:grid-cols-3 gap-4'>
              {data && data.map((item, i) => (
                <div key={i} className=''>
                  <BookCard data={item} favourite={true} />
                </div>
              )
              )}
            </div>
          </>
      }
    </>
  )
}

export default Favourites