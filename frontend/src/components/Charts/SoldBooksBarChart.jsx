import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {

    const [orderData, setOrderData] = useState()
    const [chartData, setChartData] = useState()
    const headers = {
        id: localStorage.getItem("id"),
        order_id: orderData?._id,
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useState(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/order/get-all-orders`, { headers })

                const orders = response.data?.data;
                setOrderData(orders)

                const filteredData = orders.reduce((acc, item) => {
                    const bookTitle = item.book?.title?.slice(0, 15)
                    const quantity = Number(item.quantity ?? 1)

                    acc[bookTitle] = (acc[bookTitle] ?? 0) + quantity
                    return acc;
                }, {})

                // console.log(filteredData1);

                const labels = Object.keys(filteredData)
                const dataPoints = Object.values(filteredData)

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Sales Report',
                            data: dataPoints,
                            backgroundColor: '#EAB308',
                            borderColor: '#EAB308',
                            tension: 0.7,
                            borderWidth: 1
                        },
                    ],
                })
            } catch (error) {
                console.log(error);
            }
        }
        getOrders()

    }, [])

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-2/3 border border-zinc-500 rounded-xl p-3'>
                {
                    chartData &&
                    <Bar
                        data={chartData}
                        options={{
                            response: true, plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Sold Books' }
                            },
                        }}
                    />
                }
            </div>
        </div>
    )
}

export default BarChart