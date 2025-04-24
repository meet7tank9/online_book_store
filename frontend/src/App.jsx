import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
import AllUsers from './pages/AllUsers'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Rating from './components/Profile/Rating'
import BookRating from './components/BookRating/BookRating'

const App = () => {

  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  }, [])


  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} >
          {role == "user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} />}
          {role == "admin" && <Route path='/profile/all-users' element={<AllUsers />} />}
          {role == "admin" && <Route path='/profile/add-book' element={<AddBook />} />}
          <Route path='/profile/order-history' element={<UserOrderHistory />} />
          <Route path='/profile/settings' element={<Settings />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/update-book/:id' element={<UpdateBook />} />
        <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
        <Route path='/rating/:id' element={<Rating />} />
        <Route path='/book-rating/:id' element={<BookRating />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App