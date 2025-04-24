import React, { useEffect, useState } from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const RecentlyAdded = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/book/get-recent-books`)
        setData(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBooks()
  }, [])

  return (
    <div className='mt-4 px-4'>
      <h4 className='text-yellow-100 font-semibold text-3xl'>Recently Added Books</h4>
      {
        !data && <div className='flex items-center justify-center my-8'>
          <Loader />
        </div>
      }
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 text-yellow-100'>
        {
          data && data.map((item, i) => {
            return <div key={i}>
              <BookCard data={item} />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default RecentlyAdded