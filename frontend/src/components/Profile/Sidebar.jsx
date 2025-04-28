import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from '../../store/auth';

const Sidebar = ({ data }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = useSelector((state) => state.auth.role)

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col items-center justify-between h-auto lg:h-[90%]'>
      <div className='flex flex-col items-center justify-center'>
        <img src={data.avatar} alt="avatar" className='h-[10vh]' />
        <p className='text-zinc-200 font-semibold text-xl mt-3'>{data.username}</p>
        <p className='mt-1 text-zinc-400 text-normal'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-600 hidden lg:block'></div>
      </div>
      {role === "user" && (
        <div className='lg:flex flex-col items-center justify-center hidden w-full'>
          <Link
            to="/profile"
            className="text-zinc-300 font-semibold w-full py-2 mt-1 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Favourite
          </Link>
          <Link
            to="/profile/order-history"
            className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className='lg:flex flex-col items-center justify-center hidden w-full'>
          <Link
            to="/profile"
            className="text-zinc-300 font-semibold w-full py-2 mt-1 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Add Book
          </Link>
          <Link
            to="/profile/add-category"
            className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Add Category
          </Link>
          <Link
            to="/profile/all-users"
            className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            All Users
          </Link>
        </div>
      )}
      <button className='bg-zinc-900 text-zinc-300 rounded-lg font-semibold text-center py-2 m-4 flex items-center justify-center lg:w-full w-3/6 lg:mt-0 hover:bg-zinc-700 transition-all duration-300'
        onClick={() => {
          dispatch(authActions.logout())
          dispatch(authActions.changeRole("user"))
          localStorage.clear("id")
          localStorage.clear("token")
          localStorage.clear("role")
          navigate("/")
        }}>
        Logout <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  )
}

export default Sidebar