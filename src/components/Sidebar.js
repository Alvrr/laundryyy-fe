import { useNavigate } from 'react-router-dom';

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate('/login');
  };

  const tambahBtn = () => {
    navigate('/dashboard');
    toggleSidebar();
  };

  const kelolaBtn = () => {
    navigate('/kelola_data_transaksi');
    toggleSidebar();
  };

  const daftarBtn = () => {
    navigate('/daftar_transaksi');
    toggleSidebar();
  };

  const detailBtn = () => {
    navigate('/detail_layanan');
    toggleSidebar();
  };

  const layananBtn = () => {
    navigate('/tambahlayanan');
    toggleSidebar();
  };

  return (
    <aside className={`w-64 bg-blue-500 text-white p-6 ${isSidebarOpen ? 'block' : 'hidden'} md:block transition duration-300 ease-in-out`}>
      <div className="flex items-center gap-4 mb-8">
        <img src="logo.png" alt="Logo" className="" />
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <button onClick={tambahBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
              Tambah Transaksi
            </button>
          </li>
          <li>
            <button onClick={kelolaBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
              Proses Transaksi
            </button>
          </li>
          <li>
            <button onClick={daftarBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
              Daftar Transaksi
            </button>
          </li>
          <li>
            <button onClick={detailBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
              Detail Layanan
            </button>
          </li>
          <li>
            <button onClick={layananBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
              Tambah Layanan
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-red-400 transition">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
