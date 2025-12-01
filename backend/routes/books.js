const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET semua buku
router.get("/", (req, res) => {
    db.query("SELECT * FROM buku", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET buku by id
router.get("/:kode", (req, res) => {
    db.query("SELECT * FROM buku WHERE kode=?", [req.params.kode], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Tambah buku
router.post("/", (req, res) => {
    console.log(req.body);

    const { kode, judul, pengarang, penerbit, harga } = req.body;
    db.query(
        "INSERT INTO buku SET ?",
        { kode, judul, pengarang, penerbit, harga },
        (err) => {
            if (err) throw err;
            res.json({ message: "Buku berhasil ditambahkan" });
        }
    );
});

// Update buku
router.put("/:kode", (req, res) => {
    const { judul, pengarang, penerbit, harga } = req.body;
    db.query(
        "UPDATE buku SET judul=?, pengarang=?, penerbit=?, harga=? WHERE kode=?",
        [judul, pengarang, penerbit, harga, req.params.kode],
        (err) => {
            if (err) throw err;
            res.json({ message: "Buku berhasil diupdate" });
        }
    );
});

// Hapus buku
router.delete("/:kode", (req, res) => {
    db.query("DELETE FROM buku WHERE kode=?", [req.params.kode], (err) => {
        if (err) throw err;
        res.json({ message: "Buku berhasil dihapus" });
    });
});

module.exports = router;
