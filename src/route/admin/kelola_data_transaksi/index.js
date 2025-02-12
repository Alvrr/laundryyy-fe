import React, { useState, useEffect } from "react";          
import { useNavigate } from 'react-router-dom';    
import { addCSSInHead } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';
import Sidebar from '../../../components/Sidebar';

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

const KelolaDataTransaksi = () => {    
  const navigate = useNavigate();          
  const [searchQuery, setSearchQuery] = useState("");          
  const [transactions, setTransactions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);          
      
  useEffect(() => {          
    fetchTransactions();          
    const user = JSON.parse(sessionStorage.getItem("user"));      
    if (!user) {      
      navigate('/login');      
    }      
  }, [navigate]);          
      
  const fetchTransactions = async () => {          
    try {          
      const response = await fetch('http://localhost:5000/transaksi');          
      const data = await response.json();          
      if (response.ok) {          
        setTransactions(data.data.filter(transaction => transaction.status === 'Pending'));          
      } else {          
        Swal.fire({
          icon: "error",
          title: "Error",
          text: 'Error fetching transactions: ' + data.message,
        });
      }          
    } catch (error) {          
      console.error('Error:', error);          
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Terjadi kesalahan saat mengambil data transaksi',
      });
    }          
  };          
      
  const handleSearch = (e) => {          
    setSearchQuery(e.target.value);          
  };          
      
  const handleStatusChange = async (id, nomorTelepon) => {          
    const confirmChange = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan melanjutkan tindakan ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    });

    if (!confirmChange.isConfirmed) return;          
      
    try {          
      const response = await fetch(`http://localhost:5000/transaksi/${id}`, {          
        method: 'PUT',          
        headers: {          
          'Content-Type': 'application/json',          
        },          
        body: JSON.stringify({ status: 'Selesai' }),          
      });          
      
      const data = await response.json();          
      if (response.ok) {          
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: 'Status transaksi berhasil diubah: ' + data.message,
        });
        fetchTransactions();          
      } else {          
        Swal.fire({
          icon: "error",
          title: "Error",
          text: 'Error: ' + data.message,
        });
      }          
    } catch (error) {          
      console.error('Error:', error);          
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Terjadi kesalahan saat mengubah status transaksi',
      });
    }          
  };    
      
  const filteredTransactions = transactions.filter((transaction) =>          
    transaction.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase())          
  );       
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (          
    <div className="min-h-screen flex">         
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="w-full md:w-3/4 p-6">  
          <div className="flex w-full py-5 max-w-4xl justify-between mb-4">    
            <button 
              onClick={toggleSidebar} 
              className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
            <input    
              type="text"    
              value={searchQuery}    
              onChange={handleSearch}    
              placeholder="Cari berdasarkan nama pelanggan atau ID..."    
              className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"    
            />    
          </div> 
          <div className="w-full overflow-x-auto">    
            <table className="min-w-full border-collapse">    
              <thead>          
              <tr className="bg-blue-600 text-white">         
                <th className="px-4 py-2 text-left whitespace-nowrap">ID</th>          
                <th className="px-4 py-2 text-left whitespace-nowrap">Nama Pelanggan</th>          
                <th className="px-4 py-2 text-left whitespace-nowrap">No Telepon</th>     
                <th className="px-4 py-2 text-left whitespace-nowrap">Nama Layanan</th>          
                <th className="px-4 py-2 text-left whitespace-nowrap">Total Harga (Rp)</th>          
                <th className="px-4 py-2 text-left whitespace-nowrap">Aksi</th>          
              </tr>          
            </thead>          
            <tbody>          
              {filteredTransactions.length > 0 ? (          
                filteredTransactions.map((transaction) => (          
                  <tr key={transaction.id} className="border-b hover:bg-blue-50">          
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.id}</td>          
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.nama_pelanggan}</td>          
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.nomor_telepon}</td>    
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.nama_layanan}</td>          
                    <td className="px-4 py-2 whitespace-nowrap">Rp.{transaction.total_harga}</td>          
                    <td className="px-4 py-2 whitespace-nowrap">          
                      <button          
                        onClick={() => handleStatusChange(transaction.id, transaction.nomor_telepon)}          
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"          
                      >          
                        Selesaikan          
                      </button>          
                    </td>          
                  </tr>          
                ))          
              ) : (          
                <tr>          
                  <td colSpan="6" className="text-center py-4">          
                    Tidak ada data transaksi.          
                  </td>          
                </tr>          
              )}          
            </tbody>          
          </table>          
        </div>          
        <button          
          onClick={() => window.history.back()}          
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto">          
          Kembali          
        </button>          
      </div>
    </div>         
  );
  
         
};          
      
export default KelolaDataTransaksi;