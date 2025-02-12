import React, {  useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      // Jika pengguna tidak login, redirect ke halaman login
      navigate('/login');
    }
  }, [navigate]);
  

  const AdminFormBtn = () => {
    navigate('/admin_form');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main className="flex-grow flex items-center justify-center" style={{
        backgroundImage: 'url("bg1.png")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'filter 0.3s ease-in-out',
      }}>
        {/* Title Section */}
        <div className="">
        <button
          onClick={AdminFormBtn}
          className="bg-white shadow rounded-lg p-6 text-center hover:bg-blue-100 transition w-full sm:w-auto"
        >
          <h1 className="text-lg sm:text-2xl font-semibold text-gray-700">
            Menambahkan Transaksi Pelanggan
          </h1>
        </button>
        </div>
      </main>
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  );
};

export default AdminDashboard;
