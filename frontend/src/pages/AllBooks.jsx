import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader/Loader"
import BookCard from '../components/BookCard/BookCard'
import axios from "axios"
import { useLocation, useParams } from 'react-router-dom'
import FilterByPrice from './FilterByPrice'

const AllBooks = () => {
  const [data, setData] = useState()
  const [filteredData, setFilteredData] = useState([])
  const location = useLocation()

  const query = new URLSearchParams(location.search).get("search") || ""
  const filterByPrice = new URLSearchParams(location.search).get("filterByPrice") || ""

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/book/get-books`)
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBooks()
  }, [])

  useEffect(() => {
    if (query && data?.length > 0) {
      const books = data?.filter(book => book.title?.toLowerCase().includes(query.toLowerCase()))

      setFilteredData(books)
    }
    else {
      setFilteredData(data)
    }
  }, [query, data])

  useEffect(() => {
    let start, end

    if (filterByPrice.includes("-")) {

      const priceArray = filterByPrice.split("-")
      start = priceArray[0]
      end = priceArray[1]

      const books = data?.filter(book => (Number(book.price) >= Number(start) && Number(book.price) <= Number(end)))

      setFilteredData(books)

    }
    else if (filterByPrice.includes("above")) {

      const priceArray = filterByPrice.split("above")
      start = priceArray[0]
      
      const books = data?.filter(book => Number(book.price) >= Number(start))
      
      setFilteredData(books)

    }
    else {
      setFilteredData(data)
    }
  }, [filterByPrice, data])

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8 min-h-[84vh]'>
      <h4 className='text-yellow-100 font-semibold text-3xl'>All Books</h4>
      {
        !data && <div className='flex items-center justify-center my-8'>
          <Loader />
        </div>
      }
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 text-yellow-100'>
        <FilterByPrice />
        {
          filteredData && filteredData.map((item, i) => {
            return <div key={i}>
              <BookCard data={item} />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default AllBooks