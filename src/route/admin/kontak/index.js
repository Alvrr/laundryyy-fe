import React, { useState } from "react";

const Kontak = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan Anda telah dikirim. Terima kasih!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Kontak Kami</h2>
      {/* Informasi Kontak */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
        <p><strong>Alamat:</strong> Jl. Laundry Sejahtera No. 123, Bandung</p>
        <p><strong>Email:</strong> laundrypos@example.com</p>
        <p><strong>Telepon:</strong> +62 812 3456 7890</p>
      </div>

      {/* Form Kirim Pesan */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Kirim Pesan</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="subject">
              Subjek
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="message">
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Kirim
          </button>
        </form>
      </div>

      {/* Ikon Media Sosial */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
        <div className="flex justify-center space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
      </div>

      {/* Tombol Kembali */}
      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Kembali
      </button>
    </div>
  );
};

export default Kontak;
