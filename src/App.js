import Home from './Home';
import Header from './Header';
import Footer from './Footerr';
import './asests/css/style.css';
import './asests/js/javascript.js';
import Chitiet from './Chitiet';
import ShowCart from './ShowCart';
import SanPhamTheoThuongHieu from './SanPhamTheoThuongHieu';
import DongHoNu from './DongHoNu';
import DongHoNam from './DongHoNam';
import Contact from './Contact';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/showcart" element={<ShowCart />} /> {/* Đường dẫn đến giỏ hàng */}
                    <Route path="/chitiet/:id" element={<Chitiet />} />
                    <Route path="/donghonam" element={<DongHoNam />} />
                    <Route path="/donghonu" element={<DongHoNu />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sanpham" element={<SanPhamTheoThuongHieu />} />
                </Routes>
            </nav>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
