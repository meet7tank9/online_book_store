import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);



const LineChart = () => {
    const [orderData, setOrderData] = useState()
    const [chartData, setChartData] = useState()


    useEffect(() => {
        const getOrders = async () => {
            try {

                const headers = {
                    id: localStorage.getItem("id"),
                    // order_id: orderData?._id,
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }

                const response = await axios.get(`http://localhost:3000/api/v1/order/get-all-orders`, { headers })

                const orders = response.data?.data;

                const filteredData = orders.reduce((acc, order) => {
                    const bookTitle = order.book?.title?.slice(0, 15)
                    const quantity = Number(order.quantity ?? 1)
                    const price = Number(order.book?.price ?? 100)
                    const total = quantity * price

                    acc[bookTitle] = (acc[bookTitle] ?? 0) + total
                    return acc
                }, {})

                const labels = Object.keys(filteredData)
                const dataPoints = Object.values(filteredData)

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Revenue Report For Each Book',
                            data: dataPoints,
                            borderColor: '#FACC15',
                            tension: 0.4,
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

        <div className='w-full flex items-center justify-center' >
            <div className='w-2/3 border border-zinc-500 rounded-xl p-3'>
                {
                    chartData && <Line key={JSON.stringify(chartData)} data={chartData} options={{ responsive: true }} />
                }
            </div>
        </div>
    )
};

export default LineChart;
