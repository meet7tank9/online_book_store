import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateBook = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [data, setData] = useState({
    title: "",
    author: "",
    url: "",
    price: "",
    language: "",
    description: ""
  })

  const headers = {
    id: localStorage.getItem("id"),
    book_id: id,
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/book/get-book-by-id/${id}`)

        setData({
          title: response.data.data.title,
          author: response.data.data.author,
          url: response.data.data.url,
          price: response.data.data.price,
          language: response.data.data.language,
          description: response.data.data.description
        })

      } catch (error) {
        console.log(error);
      }
    }
    getDetails()
  }, [])

  const handleUpdateBook = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/book/update-book`, data, { headers })

      alert(response.data.message)

      navigate(`/view-book-details/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='w-full bg-zinc-900'>
        <h1 className='text-4xl text-gray-400 p-8 font-semibold text-center'>Edit Book</h1>
        <div className='p-[4rem] pt-0'>
          <div className='w-full bg-zinc-800 h-auto p-4 rounded-lg'>
            <form action="" method="POST" onSubmit={handleUpdateBook}>
              <div className='p-3'>
                <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Title</label>
                <input type="text" name="title" placeholder='Enter book title' value={data.title} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
              </div>
              <div className='p-3'>
                <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Author</label>
                <input type="text" name="author" placeholder='Enter book author' value={data.author} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
              </div>
              <div className='p-3'>
                <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Image url</label>
                <input type="text" name="url" placeholder='Enter image url' value={data.url} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
              </div>
              <div className='flex w-full'>
                <div className='p-3 w-1/2'>
                  <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Langauge</label>
                  <input type="text" name="language" placeholder='Enter book language' value={data.language} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
                </div>
                <div className='p-3 w-1/2'>
                  <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Price</label>
                  <input type="text" name="price" placeholder='Enter book price' value={data.price} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
                </div>
              </div>
              <div className='p-3'>
                <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Description</label>
                <textarea name="description" rows={7} placeholder='Enter book description' value={data.description} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
              </div>
              <div className='p-3'>
                <input type="submit" value="Update Book" className='outline-none w-[20%] mt-2 bg-yellow-500 rounded-md font-semibold text-black p-2' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateBook