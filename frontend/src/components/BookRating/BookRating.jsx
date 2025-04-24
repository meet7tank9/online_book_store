import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating';

const BookRating = () => {
  const { id } = useParams()
  const location = useLocation()
  const [ratings, setRatings] = useState([])

  const bookTitle = location.state

  const headers = {
    id: localStorage.getItem("id"),
    book_id: id,
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const getBooks = async () => {
      try {

        const ratingResponse = await axios.get(`http://localhost:3000/api/v1/rating/get-rating`, { headers })
        console.log(ratingResponse.data.data);
        setRatings(ratingResponse.data.data);

      } catch (error) {
        console.log(error);
      }
    }
    getBooks()
  }, [])

  return (
    <>
      <div className='min-h-[82vh] w-full bg-zinc-900 text-zinc-300 py-2 flex items-center justify-center'>
        <div className='w-2/3 md:w-2/3 bg-zinc-800 min-h-[70vh] rounded-xl md:p-4 p-2 flex items-start justify-start'>
          <div className='w-full flex flex-col gap-6 p-5 items-start justify-start'>
            <div className='text-4xl text-zinc-300 text-start font-semibold py-4'>
              Review : {bookTitle}
            </div>
            {
              ratings && ratings.length > 0 && (
                ratings.map((item, i) => {

                  return <div className='w-full text-zinc-300 bg-zinc-900 px-6 py-4 rounded-lg flex flex-col gap-1' key={i}>
                    <div className='flex gap-3 items-center justify-start'>
                      <img src={item.user?.avatar} alt="" className='h-[5vh] shadow-sm shadow-zinc-400 rounded-3xl' />
                      <div className='text-md'>{item.user?.username}</div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className=''>
                        <Rating className=''
                          initialValue={item?.value}
                          size={20}
                          transition
                          readonly
                          SVGstyle={{ display: 'inline-block' }}
                          style={{ display: 'flex', gap: '8px' }}
                        />
                      </div>
                      <div className='text-sm font-semibold text-zinc-500'>{item.createdAt?.split("T")[0]}</div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className='text-zinc-600 font-semibold text-sm'>Verified Purchase</div>
                      <div className='text-zinc-300 text-md'>{item.message}</div>
                    </div>
                  </div>
                })
              )
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default BookRating