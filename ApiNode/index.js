const mysql = require('mysql');
const exp = require("express");
const app = exp();
var cors = require('cors');
app.use([cors(), exp.json()]);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'rx_luxury'
});

db.connect(err => {
    if (err) throw err;
    console.log('Đã kết nối đến database');
});

// API để lấy sản phẩm với giới hạn
app.get('/donghonam/sanpham', (req, res) => {
    const query = 'SELECT * FROM san_pham';
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            return;
        }
        res.json(result);
    });
});
app.get('/api/chitetsanpham/:ma_san_pham', (req, res) => {
    const maSanPham = req.params.ma_san_pham; // Lấy mã sản phẩm từ URL
    const query = 'SELECT * FROM san_pham WHERE ma_san_pham = ?'; // Truy vấn sản phẩm theo mã sản phẩm

    db.query(query, [maSanPham], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            return;
        }

        if (result.length === 0) {
            // Nếu không tìm thấy sản phẩm
            res.status(404).send('Không tìm thấy sản phẩm');
        } else {
            // Trả về dữ liệu sản phẩm
            res.json(result);
        }
    });
});


//thuong hieu
app.get('/donghonam/sanpham', async (req, res) => {
    const brandId = req.query.brand;
    let query = "SELECT * FROM san_pham";
    if (brandId) {
        query += ` WHERE ma_thuong_hieu = ${brandId}`;
    }
    // Thực hiện truy vấn với cơ sở dữ liệu và trả kết quả
});
//giohang

app.post('/luudonhang/', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO don_hang SET ?`;
    db.query(sql, data, (err, data) => {
        if (err) res.json({ "id_dh": -1, "thongbao": "Lỗi lưu đơn hàng", err })
        else {
            // eslint-disable-next-line no-undef
            id_dh = data.insertId
            // eslint-disable-next-line no-undef
            res.json({ "id_dh": id_dh, "thongbao": "Đã lưu đơn hàng" });
        }
    });
})

// b. lấy chi tiết 1 sản phẩm
app.get('/sp/:id', function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thong bao": "Không biết sản phẩm", "id": id }); return;
    }
    let sql = `SELECT  ten_san_pham, mo_ta, Gia, hinh, nam_nu, gia_giam, 
    FROM san_pham`
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
        else res.json(data[0]);
    });
});


// Bắt đầu lắng nghe tại cổng đã chỉ định
app.listen(3000, () => console.log(`Ứng dụng đang chạy trên port 3000`));
