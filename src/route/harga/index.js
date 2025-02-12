import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Harga = () => {
  const navigate = useNavigate();
  const [layananList, setLayananList] = useState([]);

  // Fungsi untuk mengambil data layanan dari server
  const fetchLayanan = async () => {
    try {
      const response = await fetch('http://localhost:5000/layanan');
      const data = await response.json();
      if (response.ok) {
        setLayananList(data.data); // Pastikan data.data sesuai dengan struktur respons
      } else {
        alert('Error fetching data: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengambil data');
    }
  };

  // Mengambil data layanan saat komponen dimuat
  useEffect(() => {
    fetchLayanan();
  }, []);

  function homeBtn() {
    navigate('/');
  }

  function layananBtn() {
    navigate('/layanan');
  }

  function tentangBtn() {
    navigate('/tentang');
  }

  function hubungiBtn() {
    navigate('/hubungi');
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-lg font-bold">Laundry POS</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" onClick={homeBtn} className="hover:underline">Home</a></li>
              <li><a href="#services" onClick={layananBtn} className="hover:underline">Layanan Kami</a></li>
              <li><a href="#pricing" onClick={() => {}} className="hover:underline">Harga</a></li>
              <li><a href="#about" onClick={tentangBtn} className="hover:underline">Tentang Kami</a></li>
            </ul>
          </nav>
          <button onClick={hubungiBtn} className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600">
            Hubungi Kami
          </button>
        </div>
      </header>

      {/* Daftar Harga */}
      <section className="flex-grow py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Daftar Harga</h2>
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 border">Layanan</th>
              <th className="px-4 py-2 border">Harga per Kg</th>
              <th className="px-4 py-2 border">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {layananList.map((layanan) => (
              <tr key={layanan.id} className="text-center">
                <td className="px-4 py-2 border">{layanan.nama_layanan}</td>
                <td className="px-4 py-2 border">Rp {layanan.harga_per_kg.toLocaleString()}</td>
                <td className="px-4 py-2 border">{layanan.deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Laundry POS. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Harga;
