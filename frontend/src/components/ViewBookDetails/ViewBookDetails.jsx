import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Loader from "../Loader/Loader"
import axios from "axios"
import { GrLanguage } from "react-icons/gr";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Rating } from 'react-simple-star-rating';

const ViewBookDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const userRole = useSelector((state) => state.auth.role)
    const [avgRating, setAvgRating] = useState(0)
    const [ratings, setRatings] = useState([])

    const headers = {
        user_id: localStorage.getItem("id"),
        book_id: id,
        authorization: `Bearer ${localStorage.getItem('token')}`
    }

    useEffect(() => {
        const getBooks = async () => {
            try {

                const response = await axios.get(`http://localhost:3000/api/v1/book/get-book-by-id/${id}`)
                setData(response.data.data);

                const ratingResponse = await axios.get(`http://localhost:3000/api/v1/rating/get-rating`, { headers })
                setRatings(ratingResponse.data.data);

            } catch (error) {
                console.log(error);
            }
        }
        getBooks()
    }, [])

    useEffect(() => {
        const getAverageRating = async () => {
            const totalLength = ratings.length

            const sum = ratings.reduce((acc, item) => acc + item.value, 0)

            setAvgRating(sum / totalLength)
        }
        getAverageRating()
    }, [ratings])

    const handleFavourite = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/favourite/add-to-favourite`, {}, { headers })
            if (response.status == 200) {
                alert(response.data.message)
            }
        } catch (error) {
            if (error.message) {
                alert(error.response.data.message)
            }
        }
    }

    const handleAddToCart = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/cart/add-to-cart`, {}, { headers })
            if (response.status == 200) {
                alert(response.data.message)
            }
        } catch (error) {
            if (error.message) {
                alert(error.response.data.message)
            }
        }
    }

    const handleDeleteBook = async () => {
        try {
            const ans = confirm("Are you sure you want to delete this book.")
            if (ans) {
                const response = await axios.delete(`http://localhost:3000/api/v1/book/delete-book`, { headers })

                alert(response.data.message)
                navigate("/all-books")
            }
            else {
                return
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleUpdateBook = async () => {

    }

    return (
        <>
            {data && (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col gap-8 md:flex-row'>
                    <div className='bg-zinc-800 rounded px-4 py-8 h-[50vh] lg:h-[80vh] lg:w-3/6 w-full flex justify-center gap-12'>
                        <img src={data?.url} alt="" className='h-[40vh] lg:h-[70vh] rounded-md' />
                        {
                            isLoggedIn == true && userRole === "user" && (
                                <div className='flex flex-col gap-4'>
                                    <button className='bg-white rounded-full text-3xl p-3 text-red-500' onClick={handleFavourite}>
                                        <FaHeart />
                                    </button>
                                    <button className='bg-white rounded-full text-3xl p-3 text-gray-600' onClick={handleAddToCart}>
                                        <FaCartArrowDown />
                                    </button>
                                </div>
                            )
                        }
                        {
                            isLoggedIn == true && userRole === "admin" && (
                                <div className='flex flex-col gap-4'>
                                    <Link to={`/update-book/${id}`} className='bg-white rounded-full text-3xl p-3 text-green-600' onClick={handleUpdateBook}>
                                        <FaEdit />
                                    </Link>
                                    <button className='bg-white rounded-full text-3xl p-3 text-red-600' onClick={handleDeleteBook}>
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <div className='p-4 lg:w-3/6 w-full flex flex-col gap-2'>
                        <h1 className='text-4xl text-zinc-300 font-semibold'>{data?.title}</h1>
                        <p className='mt-2 text-md text-zinc-500 font-semibold'>By {data?.author}</p>
                        <div className='mt-2 text-md text-zinc-300 font-semibold flex items-center justify-start gap-4'>
                            <div className='flex items-center'>
                                <Rating className=''
                                    initialValue={avgRating}
                                    size={30}
                                    transition
                                    readonly
                                    SVGstyle={{ display: 'inline-block' }}
                                    style={{ display: 'flex', gap: '8px' }}
                                />
                                <div className='text-md'>{avgRating} </div>
                            </div>
                            <div>
                                <div className='font-sm'>
                                    <Link to={`/book-rating/${id}`} state={data?.title}>
                                        <u>({ratings.length}) ratings</u>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <p className='mt-2 text-2xl text-green-400 font-semibold'>Price: &#8377; {data?.price}</p>
                        <p className='mt-4 text-md text-zinc-300 font-semibold flex items-center justify-start'><GrLanguage className='me-3' /> {data?.language}</p>
                        <p className='mt-4 text-md text-zinc-300 font-semibold'>{data?.description}</p>
                        <div className='cursor-pointer flex items-center justify-center gap-4 text-2xl p-3 bg-yellow-400 rounded-lg w-4/6 md:w-3/6 mt-6' onClick={handleAddToCart}>
                            <FaCartArrowDown />
                            <button>Add To Cart</button>
                        </div>
                    </div>
                </div>
            )}
            {!data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>}
        </>
    )
}

export default ViewBookDetails