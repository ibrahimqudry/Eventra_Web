import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Sidebar from './Sidebar';
import NotificationIcon from './NotificationIcon';
import ProfileIcon from './ProfileIcon';
import '../css/SODashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SODashboard() {
  const [bookingStats, setBookingStats] = useState({
    totalBookings: 45,
    pendingBookings: 12,
    completedBookings: 33,
    revenue: 15000
  });

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Bookings',
        data: [10, 15, 8, 12],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Booking Trends',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <>
      <div className="container2">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <div className="header-icons">
              <NotificationIcon />
              <ProfileIcon />
            </div>
          </header>
          <div className="content">
            <div>
              <h1>Welcome to Your Dashboard</h1>

              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Total Bookings</h3>
                  <p>{bookingStats.totalBookings}</p>
                </div>
                <div className="stat-card">
                  <h3>Pending</h3>
                  <p>{bookingStats.pendingBookings}</p>
                </div>
                <div className="stat-card">
                  <h3>Completed</h3>
                  <p>{bookingStats.completedBookings}</p>
                </div>
                <div className="stat-card">
                  <h3>Revenue</h3>
                  <p>${bookingStats.revenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SODashboard;