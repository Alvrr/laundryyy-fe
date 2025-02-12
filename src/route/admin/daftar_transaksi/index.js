import React, { useState, useEffect } from "react";    
import { useNavigate } from 'react-router-dom';
import { addCSSInHead } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';
import Sidebar from '../../../components/Sidebar';

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

const DaftarTransaksi = () => {
  const navigate = useNavigate();    
  const [searchQuery, setSearchQuery] = useState("");    
  const [transactions, setTransactions] = useState([]);    
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const transactionsPerPage = 5; 

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
        const completedTransactions = data.data.filter(transaction => transaction.status === 'Selesai');    
        setTransactions(completedTransactions);    
      } else {    
        Swal.fire({
          icon: "error",  
          title: "Error",
          text: "Error fetching transactions: " + data.message,
        });
      }    
    } catch (error) {    
      console.error('Error:', error);    
      Swal.fire({
        icon: "error",  
        title: "Error",
        text: "Terjadi kesalahan saat mengambil data transaksi",
      });
    }    
  };    
    
  const handleSearch = (e) => {    
    setSearchQuery(e.target.value);    
    setCurrentPage(1); 
  };    
    
  const filteredTransactions = transactions.filter((transaction) => {    
    return transaction.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) ||    
           transaction.id.toString().includes(searchQuery);    
  });    

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goBack = () => {
    window.history.back();
  };

  const handleClick = (transaction) => {
    setSelectedTransaction(transaction); 
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (    
    <div className="min-h-screen flex">         
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="w-full md:w-3/4 p-6">  
        <div className="flex w-full py-5 max-w-4xl justify-between mb-4">    
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
                <th className="px-4 py-2 whitespace-nowrap">ID</th>    
                <th className="px-4 py-2 whitespace-nowrap">Nama Pelanggan</th>    
                <th className="px-4 py-2 whitespace-nowrap">No Telepon</th>    
                <th className="px-4 py-2 whitespace-nowrap">Layanan</th>    
                <th className="px-4 py-2 whitespace-nowrap">Total Harga (Rp)</th>    
                <th className="px-4 py-2 whitespace-nowrap">Tanggal</th>    
                <th className="px-4 py-2 whitespace-nowrap">Status</th>
                <th className="px-4 py-2 whitespace-nowrap">Struk</th>    
              </tr>    
            </thead>    
            <tbody>    
              {currentTransactions.length > 0 ? (    
                currentTransactions.map((transaction) => (    
                  <tr key={transaction.id} className="border-b hover:bg-blue-50">    
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.id}</td>    
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.nama_pelanggan}</td>    
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.nomor_telepon}</td>    
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.nama_layanan}</td>    
                    <td className="px-4 py-2 whitespace-nowrap">Rp.{transaction.total_harga}</td>    
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.created_at}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{transaction.status}</td>    
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                      onClick={() => handleClick(transaction)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition" 
                      >
                      Cetak
                      </button>
                    </td>    
                  </tr>    
                ))    
              ) : (    
                <tr>    
                  <td colSpan="8" className="text-center py-4">    
                    Tidak ada data transaksi yang sesuai.    
                  </td>    
                </tr>    
              )}    
            </tbody>    
          </table>    
        </div>    
        <div className="flex justify-between mt-6">
          <button    
            onClick={goBack}    
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"    
          >    
            Kembali    
          </button>  
          <div className="ml-auto flex space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentTransactions.length < transactionsPerPage} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {selectedTransaction && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h2 className="text-lg font-bold">Struk Transaksi</h2>
            <p><strong>ID:</strong> {selectedTransaction.id}</p>
            <p><strong>Nama Pelanggan:</strong> {selectedTransaction.nama_pelanggan}</p>
            <p><strong>No Telepon:</strong> {selectedTransaction.nomor_telepon}</p>
            <p><strong>Layanan:</strong> {selectedTransaction.nama_layanan}</p>
            <p><strong>Total Harga:</strong> Rp.{selectedTransaction.total_harga}</p>
            <p><strong>Tanggal:</strong> {selectedTransaction.created_at}</p>
            <button 
              onClick={() => setSelectedTransaction(null)} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
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
    
export default DaftarTransaksi;
