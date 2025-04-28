import React from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const BookCard = ({ data, favourite }) => {
  const shortDescription = data.description.length > 100 ? data.description.substr(0, 99) + "..." : data.description
  const shortTitle = data.title.length > 27 ? data.title.substr(0, 26) + "..." : data.title

  const headers = {
    user_id: localStorage.getItem("id"),
    book_id: data._id,
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  const handleRemoveFromFavourite = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/favourite/remove-from-favourite`, {}, { headers })
      if (response.status == 200) {
        alert(response.data.message)
      }
    } catch (error) {
      if (error.message) {
        alert(error.response.data.message)
      }
    }
  }
  return (
    <>
      <div className='bg-zinc-800 rounded-lg p-4 flex flex-col hover:scale-[1.01] transition-all duration-300 hover:shadow-[0_5px_7px_rgba(206,206,206,0.2)]'>

        <Link className='' to={`/view-book-details/${data._id}`}>
          <div className='bg-zinc-900 flex items-center justify-center'>
            <img src={data.url} alt="" className='h-[30vh] rounded ' />
          </div>
          <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{shortTitle}</h2>
          <div className='flex justify-between items-center'>
            <p className='mt-2 text-md text-zinc-500 font-semibold'>By {data.author}</p>
            <p className='mt-2 text-sm text-zinc-400 font-semibold border border-yellow-500 p-[3px] px-2 rounded-sm'>{data?.category?.name}</p>
          </div>
          <p className='mt-4 text-md text-zinc-300 font-semibold'>{shortDescription}</p>
          <p className='mt-2 text-xl  font-semibold text-green-400'> &#8377; {data.price}</p>
        </Link>

        {favourite && <button className='bg-yellow-400 text-large font-semibold px-4 py-2 rounded-lg border border-yellow-500 mt-2 text-gray-700' onClick={handleRemoveFromFavourite}>Remove From Favourite</button>
        }

      </div>
    </>
  )
}

export default BookCard