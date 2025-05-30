import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import FilterByPrice from './FilterByPrice'
import FilterByCategory from './FilterByCategory'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero />
      <FilterByPrice />
      <FilterByCategory />
      <RecentlyAdded />
    </div>
  )
}

export default Home