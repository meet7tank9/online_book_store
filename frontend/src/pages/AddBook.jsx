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

      const responseCategory = await axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/category/get-category`)
      setCategory(responseCategory.data.data);

    }

    getCategory()
  }, [])

  const handleSubmitBook = async (e) => {
    e.preventDefault()

    try {
      if (data.title == "" ||
        data.author == "" ||
        data.bookImage == "" ||
        data.price == "" ||
        data.language == "" ||
        data.description == ""
      ) {
        alert("All fields are required.")
        return
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("price", data.price);
      formData.append("language", data.language);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("bookImage", data.bookImage);

      const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_URL}/book/add-book`, formData, { headers })
      alert(response.data.message);
      setData(() => ({
        title: "",
        author: "",
        price: "",
        language: "",
        description: "",
        category: ""
      }))
      navigate("/profile/add-book")
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const handleFileChange = (e) => {
    setData({ ...data, bookImage: e.target.files[0] });
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
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Select Book Image</label>
            <input type="file" name="bookImage" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleFileChange} />
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