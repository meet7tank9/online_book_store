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
    const headers = {
        id: localStorage.getItem("id"),
        order_id: orderData?._id,
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/order/get-all-orders`, { headers })

                const orders = response.data?.data;
                setOrderData(orders)

                const filteredData = orders.reduce((acc, item) => {
                    const bookTitle = item.book?.title?.slice(0, 15)
                    const quantity = Number(item.quantity ?? 1)

                    acc[bookTitle] = (acc[bookTitle] ?? 0) + quantity
                    return acc;
                }, {})

                const filteredData1 = orders.reduce((acc, item) => {
                    const bookTitle = item.book?.title
                    const quantity = Number(item.quantity ?? 1)

                    const existed = acc.find((obj) => obj.bookTitle === bookTitle)
                    if (!existed) {
                        acc.push({ bookTitle, quantity })
                    }
                    else {
                        existed.quantity += quantity
                    }

                    return acc;

                }, [])

                console.log(filteredData1);

                const labels = Object.keys(filteredData)
                const dataPoints = Object.values(filteredData)

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Sales',
                            data: dataPoints,
                            borderColor: 'rgba(75,192,192,1)',
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


    return <div className='rounded-xl shadow-md shadow-zinc-400'>
        {
            chartData && <Line key={JSON.stringify(chartData)} data={chartData} />
        }
    </div>
};

export default LineChart;
