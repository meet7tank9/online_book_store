import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import logo from "../../assets/book_heaven.png"

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState("hidden")
  const [query, setQuery] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const links = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "All Books",
      link: "/all-books"
    },
    {
      title: "Cart",
      link: "/cart"
    },
    {
      title: "Profile",
      link: "/profile"
    },
    {
      title: "Admin Profile",
      link: "/profile"
    },
  ]

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)

  if (isLoggedIn === false) {
    links.splice(2, 3)
  }

  if (isLoggedIn && role === "user") {
    links.splice(4, 1)
  }

  if (isLoggedIn && role === "admin") {
    links.splice(2, 2)
  }
  const onLogout = () => {
    setMobileNav(mobileNav === "hidden" ? "block" : "hidden")
    dispatch(authActions.logout())
    dispatch(authActions.changeRole("user"))
    localStorage.clear("id")
    localStorage.clear("token")
    localStorage.clear("role")
    navigate("/")
  }

  const handleOnChange = async (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <nav className='relative z-50 bg-zinc-800 text-white px-8 py-4 flex items-center justify-between'>
        <Link to="/" className='flex items-center'>
          <img src={logo} alt="logo" className='h-10 me-4 ms-4 rounded ' />
          <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </Link>
        <div className='w-2/6'>
          <form action="" onSubmit={(e)=>{
            e.preventDefault()
            navigate(`/all-books?search=${query}`);
          }}>
            <input type="search" name="" id="" placeholder='Search book...' className='p-2 ps-4 rounded-3xl outline-none w-[100%] bg-zinc-700 text-white' onChange={handleOnChange} value={query} />
          </form>
        </div>
        <div className='nav-links-bookheaven block md:flex gap-4 items-center'>
          <div className='hidden md:flex gap-4'>
            {
              links.map((item, i) => (
                <div className='flex items-center' key={i}>
                  {item.title == 'Profile' || item.title == 'Admin Profile' ? (
                    <Link to={item.link} className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-blue-500 transition-all duration-300'>{item.title == "Profile" ? 'Profile' : "Admin Profile"}</Link>
                  ) : (
                    <Link className='hover:text-blue-500 transition-all duration-300' key={i} to={item.link}>{item.title}</Link>
                  )}
                </div>
              ))
            }
          </div>
          {
            !isLoggedIn ? <>
              <div className='hidden md:flex gap-4'>
                <Link to="/login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-blue-500 transition-all duration-300'>Login</Link>
                <Link to="/signup" className='px-4 py-1 rounded bg-blue-500 hover:bg-white hover:text-blue-500 transition-all duration-300'>Register</Link>
              </div>
            </> :
              <div className='hidden md:flex gap-4'>
                <div className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-blue-500 transition-all duration-300'
                  onClick={() => {
                    dispatch(authActions.logout())
                    dispatch(authActions.changeRole("user"))
                    localStorage.clear("id")
                    localStorage.clear("token")
                    localStorage.clear("role")
                    navigate("/")
                  }}>Logout</div>
              </div>
          }
          <button className='md:hidden text-white text-2xl hover:text-zinc-400'>
            <FaGripLines
              onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}
            />
          </button>
        </div>
      </nav>


      {/* For small device */}
      <div className={`${mobileNav} bg-zinc-800 h-screen absolute w-full top-0 left-0 z-40 text-white flex flex-col items-center justify-center gap-5`}>
        {
          links.map((item, i) => {
            return <Link
              className={` ${mobileNav}text-white text-3xl font-semibold hover:text-blue-500 transition-all duration-300`}
              key={i}
              to={item.link}
              onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}>
              {item.title}
            </Link>
          })
        }
        {
          !isLoggedIn ? <>
            <Link to="/login" className={` ${mobileNav} px-5 py-2 text-xl font-semibold border border-blue-500 rounded hover:bg-white hover:text-blue-500 transition-all duration-300`} onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}>Login</Link>
            <Link to="/signup" className={` ${mobileNav} px-5 py-2 text-xl font-semibold rounded bg-blue-500 hover:bg-white hover:text-blue-500 transition-all duration-300`} onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}>Register</Link>
          </> :
            <div className={` ${mobileNav} px-5 py-2 text-xl font-semibold border border-blue-500 rounded hover:bg-white hover:text-blue-500 transition-all duration-300`} onClick={onLogout} >Logout</div>
        }
      </div >
    </>
  )
}

export default Navbar