import React from "react";
import { useNavigate } from "react-router-dom";

const Hubungi = () => {
  const navigate = useNavigate();
  function homeBtn(){
    navigate('/')
  }  
  function layananBtn(){
    navigate('/layanan')
  }
  function hargaBtn(){
    navigate('/harga') 
  }
  function tentangBtn(){
    navigate('/tentang')  
  }
function hubungiBtn(){
  navigate('/hubungi')  
  }
    return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-lg font-bold">Laundry POS</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" onClick={homeBtn}  className="hover:underline">Home</a></li>
              <li><a href="#services" onClick={layananBtn} className="hover:underline">Layanan Kami</a></li>
              <li><a href="#pricing" onClick={hargaBtn} className="hover:underline">Harga</a></li>
              <li><a href="#about" onClick={tentangBtn}  className="hover:underline">Tentang Kami</a></li>
            </ul>
          </nav>
          <button onClick={hubungiBtn} className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600">
            Hubungi Kami 
          </button>
        </div>
      </header>

      {/* Contact Section */}
      <section className="flex-grow py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Hubungi Kami</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg mb-4">
            Jika Anda memiliki pertanyaan atau ingin menggunakan layanan kami, jangan ragu untuk menghubungi kami melalui kontak berikut:
          </p>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Owner"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold">Al Musthofa</h3>
              <p className="text-gray-600">Pemilik Laundry POS</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-lg font-semibold">Kontak:</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-green-500 hover:underline"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/whatsapp.png"
                    alt="WhatsApp"
                    className="w-6 h-6 mr-2"
                  />
                  +62 812-3456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:laundryposs@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  Email: laundryposs@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
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

export default Hubungi;
