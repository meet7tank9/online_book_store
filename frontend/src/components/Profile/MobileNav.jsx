import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role)

    return (
        <>
            {role === "user" && (
                <div className='flex items-center justify-center lg:hidden w-full'>
                    <Link
                        to="/profile"
                        className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
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
                <div className='flex items-center justify-center flex-wrap lg:hidden w-full'>
                    <Link
                        to="/profile"
                        className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
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
        </>
    )
}

export default MobileNav