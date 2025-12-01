import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const API = "http://localhost:4000/api/buku";

export default function Buku() {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({
    kode: "",
    judul: "",
    pengarang: "",
    penerbit: "",
    harga: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleEdit = (b) => {
    setEditData(b);
    handleShow();
  };

  const handleSave = async () => {
    await axios.put(`${API}/${editData.kode}`, editData);
    handleClose();
    loadBooks();
  };

  const handleDelete = async (kode) => {
    await axios.delete(`${API}/${kode}`);
    loadBooks();
  };

  return (
    <div className="container mt-4">
      <h2>Data Buku</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Judul</th>
            <th>Pengarang</th>
            <th>Penerbit</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, i) => (
            <tr key={i}>
              <td>{b.kode}</td>
              <td>{b.judul}</td>
              <td>{b.pengarang}</td>
              <td>{b.penerbit}</td>
              <td>{b.harga}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(b)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.kode)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Bootstrap */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="form-control mb-2" value={editData.kode} readOnly />
          <input
            className="form-control mb-2"
            value={editData.judul}
            onChange={(e) => setEditData({ ...editData, judul: e.target.value })}
          />
          <input
            className="form-control mb-2"
            value={editData.pengarang}
            onChange={(e) => setEditData({ ...editData, pengarang: e.target.value })}
          />
          <input
            className="form-control mb-2"
            value={editData.penerbit}
            onChange={(e) => setEditData({ ...editData, penerbit: e.target.value })}
          />
          <input
            className="form-control mb-2"
            value={editData.harga}
            onChange={(e) => setEditData({ ...editData, harga: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan Perubahan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
