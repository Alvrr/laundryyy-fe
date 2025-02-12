import React, { useState, useEffect } from "react";  
import { useNavigate } from 'react-router-dom';  
import { addCSSInHead } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';
import Sidebar from '../../../components/Sidebar';

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

const TambahLayanan = () => {  
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
    const [formData, setFormData] = useState({  
        nama_layanan: '',  
        harga_per_kg: '',  
        deskripsi: ''  
    });  

    useEffect(() => {      
        const user = JSON.parse(sessionStorage.getItem("user"));  
        if (!user) {  
        // Jika pengguna tidak login, redirect ke halaman login  
        navigate('/login');  
        }  
    }, [navigate]);

    const handleChange = (e) => {  
        setFormData({  
            ...formData,  
            [e.target.name]: e.target.value  
        });  
    };  
  
    const handleSubmit = async (e) => {  
        e.preventDefault();  
        console.log('Form Data:', formData); // Tambahkan log ini  
  
        try {  
            const response = await fetch('http://localhost:5000/layanan', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json' // Menggunakan application/json  
                },  
                body: JSON.stringify(formData) // Mengirim data sebagai JSON  
            });  
  
            const data = await response.json();  
  
            if (response.ok) {  
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: 'Layanan berhasil ditambahkan: ' + data.message,
                }).then(() => {
                    navigate('/dashboard');
                });
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
                text: 'Terjadi kesalahan saat mengirim data',
            });
        }  
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };  

    return (  
        <div className="min-h-screen flex">
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            {/* Main Content */}  
            <main className="flex-grow mx-auto py-10 px-4" style={{
        backgroundImage: 'url("bg1.png")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>     
                {/* Form Section */}  
                <div className="bg-white shadow rounded-lg p-6 max-w-lg mt-20 mx-auto">  
                    <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Form Tambah Layanan</h1>  
                    <form className="space-y-6" onSubmit={handleSubmit}>  
                        <div>  
                            <label className="block text-sm font-medium text-gray-700">Nama Layanan</label>  
                            <input  
                                type="text"  
                                name="nama_layanan"  
                                value={formData.nama_layanan}  
                                onChange={handleChange}  
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
                                onChange={handleChange}  
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                                required  
                            />  
                        </div>  
                        <div>  
                            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>  
                            <textarea  
                                name="deskripsi"  
                                value={formData.deskripsi}  
                                onChange={handleChange}  
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                                required  
                            ></textarea>  
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
  
export default TambahLayanan;  
