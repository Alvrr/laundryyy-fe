import React, { useState, useEffect } from "react";  
import { useNavigate } from 'react-router-dom';  
import { addCSSInHead } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';
import Sidebar from '../../../components/Sidebar';

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

const DetailLayananPage = () => {  
  const navigate = useNavigate();  
  const [layananList, setLayananList] = useState([]);  
  const [editingLayanan, setEditingLayanan] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
  const [formData, setFormData] = useState({  
    nama_layanan: '',  
    harga_per_kg: '',  
    deskripsi: ''  
  });  
  
  // Cek apakah pengguna sudah login  
  useEffect(() => {  
    const user = sessionStorage.getItem("user");  
    if (!user) {  
      navigate('/login'); // Arahkan ke halaman login jika belum login  
    } else {  
      fetchLayanan(); // Ambil data layanan jika sudah login  
    }  
  }, [navigate]);  
  
  // Fungsi untuk mengambil data layanan dari server  
  const fetchLayanan = async () => {  
    try {  
      const response = await fetch('http://localhost:5000/layanan');  
      const data = await response.json();  
      if (response.ok) {  
        setLayananList(data.data); // Pastikan data.data sesuai dengan struktur respons  
      } else {  
        Swal.fire({
          icon: "error",  
          title: "Error",  
          text: "Error fetching data: " + data.message,  
        });
      }  
    } catch (error) {  
      console.error('Error:', error);  
      Swal.fire({
        icon: "error",  
        title: "Error",  
        text: "Terjadi kesalahan saat mengambil data",  
      });
    }  
  };  
  
  // Fungsi untuk mengatur data layanan yang akan diedit  
  const handleEdit = (layanan) => {  
    setEditingLayanan(layanan.id);  
    setFormData({  
      nama_layanan: layanan.nama_layanan,  
      harga_per_kg: layanan.harga_per_kg,  
      deskripsi: layanan.deskripsi  
    });  
  };  
  
  // Fungsi untuk memperbarui data layanan  
  const handleUpdate = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await fetch(`http://localhost:5000/layanan/${editingLayanan}`, {  
        method: 'PUT',  
        headers: {  
          'Content-Type': 'application/json'  
        },  
        body: JSON.stringify(formData)  
      });  
      const data = await response.json();  
      if (response.ok) {  
        Swal.fire({
          icon: "success",  
          title: "Berhasil",  
          text: "Layanan berhasil diperbarui: " + data.message,  
        });
        fetchLayanan();  
        setEditingLayanan(null);  
        setFormData({ nama_layanan: '', harga_per_kg: '', deskripsi: '' });  
      } else {  
        Swal.fire({
          icon: "error",  
          title: "Error",  
          text: "Error: " + data.message,  
        });
      }  
    } catch (error) {  
      console.error('Error:', error);  
      Swal.fire({
        icon: "error",  
        title: "Error",  
        text: "Terjadi kesalahan saat memperbarui data",  
      });
    }  
  };  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (  
    <div className="min-h-screen flex">         
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="w-full md:w-3/4 p-6">   
      <div className="flex w-full max-w-4xl justify-between mt-20 mb-4 md:overflow-visible overflow-x-auto">  
        <table className="w-full border-collapse min-w-max">  
          <thead>  
            <tr className="bg-blue-500 text-white">  
              <th className="px-4 py-2 border">Nama Layanan</th>  
              <th className="px-4 py-2 border">Deskripsi</th>  
              <th className="px-4 py-2 border">Harga</th>  
              <th className="px-4 py-2 border">Aksi</th>  
            </tr>  
          </thead>  
          <tbody>  
            {layananList.map((layanan) => (  
              <tr key={layanan.id} className="text-center">  
                <td className="px-4 py-2 border">{layanan.nama_layanan}</td>  
                <td className="px-4 py-2 border">{layanan.deskripsi}</td>  
                <td className="px-4 py-2 border">Rp.{layanan.harga_per_kg}</td>  
                <td className="px-4 py-2 border">  
                  <button  
                    onClick={() => handleEdit(layanan)}  
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition"  
                  >  
                    Edit  
                  </button>  
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
  
      {editingLayanan && (  
        <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mt-6">  
          <h3 className="text-xl font-semibold mb-4">Edit Layanan</h3>  
          <form onSubmit={handleUpdate}>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">Nama Layanan</label>  
              <input  
                type="text"  
                name="nama_layanan"  
                value={formData.nama_layanan}  
                onChange={(e) => setFormData({ ...formData, nama_layanan: e.target.value })}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                required  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">Harga per Kg</label>  
              <input  
                type="number"  
                name="harga_per_kg"  
                value={formData.harga_per_kg}  
                onChange={(e) => setFormData({ ...formData, harga_per_kg: e.target.value })}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                required  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>  
              <textarea  
                name="deskripsi"  
                value={formData.deskripsi}  
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                required  
              ></textarea>  
            </div>  
            <div className="flex justify-end mt-4">  
              <button  
                type="submit"  
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"  
              >  
                Simpan Perubahan  
              </button>  
            </div>  
          </form>  
        </div>  
      )}  
  
      <button  
        onClick={() => window.history.back()}  
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"  
      >  
        Kembali  
      </button>
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
  
export default DetailLayananPage;
