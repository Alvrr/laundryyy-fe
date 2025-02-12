import React from "react";
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();
      function loginBtn(){
        navigate ('/login')
      } 

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Laundry POS</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#features"
                className="hover:text-blue-200 transition duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-blue-200 transition duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-200 transition duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100 py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
          Simplify Your Laundry Business
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Manage your laundry transactions efficiently with Laundry POS. A
          solution tailored for your business growth.
        </p>
        <button onClick={loginBtn} className="bg-green-500 px-6 py-3 text-white text-lg font-medium rounded hover:bg-green-600 transition duration-300">
          Login
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Easy Transactions
            </h4>
            <p className="text-sm text-gray-600">
              Quickly manage orders, payments, and receipts with ease.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Customer Management
            </h4>
            <p className="text-sm text-gray-600">
              Keep track of your customers and build loyalty.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Reporting
            </h4>
            <p className="text-sm text-gray-600">
              Generate detailed reports to monitor your business performance.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-blue-100 py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-blue-600 mb-4">About Us</h3>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Laundry POS is a comprehensive solution for managing your laundry
          business. Our goal is to simplify your operations and help your
          business thrive.
        </p>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-500 text-white py-6 text-center">
        <h4 className="text-lg font-semibold">Contact Us</h4>
        <p className="text-sm">Email: support@laundrypos.com</p>
        <p className="text-sm">Phone: +62 123-4567-890</p>
        <div className="mt-4">
          <p className="text-sm">© 2025 Laundry POS. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
