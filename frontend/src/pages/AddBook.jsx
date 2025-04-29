import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddBook = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const navigate = useNavigate()
  const [category, setCategory] = useState([])

  const [data, setData] = useState({
    title: "",
    author: "",
    url: "",
    price: "",
    language: "",
    description: "",
    category: ""
  })

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const getCategory = async () => {

      const responseCategory = await axios.get(`http://localhost:3000/api/v1/category/get-category`)
      setCategory(responseCategory.data.data);

    }

    getCategory()
  }, [])

  const handleSubmitBook = async (e) => {
    e.preventDefault()

    setData(() => ({
      title: "",
      author: "",
      url: "",
      price: "",
      language: "",
      description: "",
      category: ""
    }))
    try {
      if (data.title == "" ||
        data.author == "" ||
        data.url == "" ||
        data.price == "" ||
        data.language == "" ||
        data.description == ""
      ) {
        alert("All fields are required.")
        return
      }

      const response = await axios.post(`http://localhost:3000/api/v1/book/add-book`, data, { headers })
      alert(response.data.message);
      navigate("/profile/add-book")
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const handleOnClick = (e) => {
    console.log(e);
  }

  return (
    <>
      <h1 className='text-3xl text-gray-400 mb-6'>Add Book</h1>
      <div className='w-full bg-zinc-800 h-auto p-4'>
        <form action="" method="POST" onSubmit={handleSubmitBook}>
          <div className='p-3'>
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Title</label>
            <input type="text" name="title" placeholder='Enter book title' value={data.title} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
          </div>
          <div className='p-3'>
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Author</label>
            <input type="text" name="author" placeholder='Enter book author' value={data.author} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
          </div>
          <div className='p-3'>
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Category</label>
            <select name="category" value={data.category} onChange={handleOnChange} className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500'>
              <option value="">Select a Category</option>
              {
                category.map((item, i) => {
                  return <option key={i} value={item?._id}>{item?.name}</option>
                })
              }
            </select>
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
            <input type="submit" value="Add Book" className='outline-none border border-yellow-500 w-[20%] mt-2 bg-yellow-500 rounded-md font-semibold text-black p-2 cursor-pointer hover:text-yellow-500 hover:border hover:border-yellow-500 hover:bg-zinc-900 transition-all duration-300' />
          </div>
        </form>
      </div>
    </>
  )
}

export default AddBook