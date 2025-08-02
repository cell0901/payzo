'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Chart= () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [1, 4, 3, 5, 6,2 ],
        borderColor: '#d834eb',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
      display:false
      },
      title: {
        display: false,
        text: 'Monthly Sales',
      },
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      border:{
        display:false
      }
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
