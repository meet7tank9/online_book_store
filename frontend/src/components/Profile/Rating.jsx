import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { Rating } from 'react-simple-star-rating'

const RatingComponent = () => {
    const [ratingMessage, setRatingMessage] = useState("")
    const { id } = useParams()
    const [bookName, setBookName] = useState("")
    const [customer, setCustomer] = useState("")
    const [rating, setRating] = useState(0)

    const navigate = useNavigate()

    const headers = {
        id: localStorage.getItem("id"),
        book_id: id,
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const getBookName = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/book/get-book-by-id/${id}`)

                const customer = await axios.get(`http://localhost:3000/api/v1/user/user-info`, { headers })
                setCustomer(customer.data?.data?.username)
                setBookName(response.data?.data?.title);
            } catch (error) {
                console.log(error);
            }
        }
        getBookName()
    }, [])

    const handleRating = async (number) => {
        setRating(number);
    }

    const handleRatingMessage = async (e) => {
        setRatingMessage(e.target.value)
    }

    const handlePost = async () => {
        const data = {
            value: rating,
            message: ratingMessage,
        }
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/rating/add-rating`, data, { headers })

            navigate("/profile/order-history")
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = async () => {
        navigate("/profile/order-history")
    }

    return (
        <>
            <div className='min-h-[82vh] w-full bg-zinc-900 text-zinc-300 py-2 flex items-center justify-center'>
                <div className='w-2/3 md:w-1/2 bg-zinc-800 min-h-[70vh] rounded-xl md:p-4 p-2 flex items-center justify-center'>
                    <div className='w-full flex flex-col gap-6 p-5'>
                        <div className='text-4xl text-zinc-500 text-start font-semibold'>
                            {bookName}
                        </div>
                        <div className='flex gap-2 text-lg'>
                            <div className='tracking-wide'>Customer:</div>
                            <div className='tracking-wider'>{customer}</div>
                        </div>
                        <div className='tracking-widest text-xl flex w-full'>
                            <div className='flex'>
                                <Rating className=''
                                    onClick={handleRating}
                                    initialValue={rating}
                                    size={30}
                                    transition
                                    SVGstyle={{ display: 'inline-block' }}
                                    style={{ display: 'flex', gap: '8px' }}
                                />
                            </div>
                        </div>
                        <div>
                            <textarea name="rating message" id="" value={ratingMessage} rows={7} className='w-full bg-zinc-900 rounded-lg p-4' placeholder='Enter message here...' onChange={handleRatingMessage}></textarea>
                        </div>
                        <div className='flex items-center justify-start gap-6'>
                            <button className='bg-zinc-800 border border-blue-500 text-white py-[7px] px-5 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-300' onClick={handlePost}>Post</button>
                            <button className='bg-zinc-800 border border-blue-500 text-white py-[7px] px-5 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-300' onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RatingComponent