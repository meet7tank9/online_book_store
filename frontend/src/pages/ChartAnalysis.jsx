import React from 'react'
import RevenueLineChart from '../components/Charts/RevenueLineChart'
import SoldBookBarChart from '../components/Charts/SoldBooksBarChart'

const ChartAnalysis = () => {
    return (
        <div className='mx-10 my-3 flex flex-col gap-9 items-center justify-center'>
            <SoldBookBarChart />
            <RevenueLineChart />
        </div>
    )
}

export default ChartAnalysis