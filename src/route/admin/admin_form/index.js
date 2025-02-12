import React, { useState, useEffect } from "react";        
import { useNavigate } from 'react-router-dom';        
import {addCSSInHead} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';
import Sidebar from '../../../components/Sidebar';

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
  
const Admin = () => {        
  const navigate = useNavigate();        
  const [formData, setFormData] = useState({        
    nama: '',        
    nomor_telepon: '',        
    alamat: '',        
    id_layanan: '',        
    berat: ''        
  });        

  const [layananList, setLayananList] = useState([]); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default sidebar tertutup

  useEffect(() => {  
      fetchLayanan(); 
      const user = JSON.parse(sessionStorage.getItem("user"));  
      if (!user) {  
        navigate('/login');    
      }  
    }, [navigate]);    
  
  const fetchLayanan = async () => {      
    try {      
      const response = await fetch('http://localhost:5000/layanan'); 
      const data = await response.json();      
      if (response.ok) {      
        setLayananList(data.data); 
      } else {      
        alert('Error fetching layanan: ' + data.message);      
      }      
    } catch (error) {      
      console.error('Error:', error);      
      alert('Terjadi kesalahan saat mengambil data layanan');      
    }      
  };      
  
  const handleChange = (e) => {        
    const { name, value } = e.target;  
  
    if (name === "nomor_telepon") {  
      if (/^\d*$/.test(value) && value.length <= 14) {  
        setFormData({        
          ...formData,        
          [name]: value        
        });  
      }  
    } else {  
      setFormData({        
        ...formData,        
        [name]: value        
      });  
    }  
  };        
  
  const handleSubmit = async (e) => {          
    e.preventDefault();          
      
    if (formData.nomor_telepon.length > 14) {  
      alert("Nomor telepon tidak boleh lebih dari 14 digit.");  
      return;  
    }  
  
    try {          
      const response = await fetch('http://localhost:5000/add_pelanggan_dan_layanan', {          
        method: 'POST',          
        headers: {          
          'Content-Type': 'application/json'          
        },          
        body: JSON.stringify({          
          nama: formData.nama,          
          nomor_telepon: formData.nomor_telepon,          
          alamat: formData.alamat,          
          id_layanan: formData.id_layanan,          
          berat: formData.berat        
        })          
      });          
      const data = await response.json();          
      if (response.ok) {        
        Swal.fire('Berhasil', 'Data pelanggan telah di inputkan.', 'success');  
        navigate('/dashboard');          
      } else {          
        alert('Error: ' + data.message);          
      }          
    } catch (error) {          
      console.error('Error:', error);          
      alert('Terjadi kesalahan saat mengirim data');          
    }          
  };         
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (        
    <div className="min-h-screen flex">
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main className="flex-grow mx-auto py-10 px-4"style={{
        backgroundImage: 'url("bg1.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'filter 0.3s ease-in-out',
      }}>            
        <div className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto">        
          <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Form Input Data</h1>        
          <form className="space-y-6" onSubmit={handleSubmit}>        
            <div>        
              <label className="block text-sm font-medium text-gray-700">Nama</label>        
              <input        
                type="text"        
                name="nama"        
                value={formData.nama}        
                onChange={handleChange}        
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"        
              />        
            </div>        
            <div>        
              <label className="block text-sm font-medium text-gray-700">Alamat</label>        
              <input        
                type="text"        
                name="alamat"        
                value={formData.alamat}        
                onChange={handleChange}        
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"        
              />        
            </div>        
            <div>        
              <label className="block text-sm font-medium text-gray-700">No Hp</label>        
              <input        
                type="text"        
                name="nomor_telepon"        
                value={formData.nomor_telepon}        
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue.startsWith('0')) {
                    const newValue = '62' + inputValue.slice(1);
                    handleChange({ target: { name: 'nomor_telepon', value: newValue } });
                  } else {
                    handleChange(e);
                  }
                }}        
                placeholder="Contoh : 6283149869096"        
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"        
              />        
            </div>        
            <div>        
              <label className="block text-sm font-medium text-gray-700">Layanan</label>        
              <select      
                name="id_layanan"      
                value={formData.id_layanan}      
                onChange={handleChange}      
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"      
              >      
                <option value="">Pilih Layanan</option>      
                {layananList.map((layanan) => (      
                  <option key={layanan.id} value={layanan.id}>      
                    {layanan.nama_layanan}      
                  </option>      
                ))}      
              </select>      
            </div>        
            <div>        
              <label className="block text-sm font-medium text-gray-700">Berat (kg)</label>        
              <input        
                type="number"        
                name="berat"        
                value={formData.berat}        
                onChange={handleChange}        
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"        
              />        
            </div>        
            <div className="flex justify-between mt-6">        
              <button        
                type="button"        
                onClick={() => navigate('/dashboard')}        
                className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600"        
              >        
                Cancel        
              </button>        
              <button        
                type="submit"        
                className="bg-blue-500 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600"        
              >        
                Submit        
              </button>        
            </div>        
          </form>        
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
  
export default Admin;        
