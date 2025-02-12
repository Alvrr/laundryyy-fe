import React from "react";
import { useNavigate } from "react-router-dom";

const Layanan = () => {
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
  const services = [
    {
      title: "Cuci Kering",
      description: "Layanan mencuci dan mengeringkan pakaian Anda dengan cepat dan bersih.",
      icon: "https://img.icons8.com/color/48/000000/washing-machine.png",
    },
    {
      title: "Cuci Kering Setrika",
      description: "Pakaian Anda tidak hanya bersih dan kering, tetapi juga rapi setelah disetrika.",
      icon: "https://img.icons8.com/color/48/000000/iron.png",
    },
    {
      title: "Setrika Saja",
      description: "Layanan setrika untuk pakaian Anda agar selalu terlihat rapi.",
      icon: "https://img.icons8.com/?size=100&id=8037&format=png&color=000000",
    },
    {
      title: "Laundry Sepatu",
      description: "Membersihkan sepatu Anda agar tampak baru dan bebas bau.",
      icon: "https://img.icons8.com/color/48/000000/shoes.png",
    },
    {
      title: "Laundry Karpet",
      description: "Layanan untuk membersihkan karpet rumah Anda hingga bersih dan bebas debu.",
      icon: "https://img.icons8.com/color/48/000000/rug.png",
    },
  ];

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
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

      {/* Layanan Kami Section */}
      <section className="flex-grow py-20" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Layanan Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
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

export default Layanan;
