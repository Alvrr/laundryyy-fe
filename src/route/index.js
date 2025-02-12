import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./home"
import Login from "./login"
import RegisterForm from './register';
import Harga from './harga';
import Hubungi from './hubungi';
import Layanan from './layanan';
import TentangKami from './tentangKami';
import LandingPage from './landing page';

import AdminDashboard from './admin/dashboad';
import AdminForm from './admin/admin_form';
import TmbhLayanan from "./admin/tambah_layanan";
import KelolaDataTransaksi from "./admin/kelola_data_transaksi";
import DaftarTransaksi from "./admin/daftar_transaksi";
import DetailLayananPage from "./admin/detail_layanan";



function App() {
    return(
    <Routes>
    <Route>
    <Route path="/" element={<Home/>} />
    </Route>
    <Route>
    <Route path="/login" element={<Login/>} />
    </Route>
    <Route>
    <Route path="/register" element={<RegisterForm/>} />
    </Route>
    <Route>
    <Route path="/harga" element={<Harga/>} />
    </Route>
    <Route>
    <Route path="/hubungi" element={<Hubungi/>} />
    </Route>
    <Route>
    <Route path="/layanan" element={<Layanan/>} />
    </Route>
    <Route>
    <Route path="/tentang" element={<TentangKami/>} />
    </Route>
    <Route>
    <Route path="/landing_page" element={<LandingPage/>} />
    </Route>

        {/* admin */}
    <Route>
    <Route path="/dashboard" element={<AdminDashboard/>} /> 
    </Route>
    <Route>
    <Route path="/admin_form" element={<AdminForm/>} />
    </Route>
    <Route>
    <Route path="/tambahlayanan" element={<TmbhLayanan/>} />
    </Route>
    <Route>
    <Route path="/kelola_data_transaksi" element={<KelolaDataTransaksi />} />
    </Route>
    <Route>
    <Route path="/daftar_transaksi" element={<DaftarTransaksi />} />
    </Route>
    <Route>
    <Route path="/detail_layanan" element={<DetailLayananPage/>} />
    </Route>
    </Routes>
    
    
    )
    }
    export default App