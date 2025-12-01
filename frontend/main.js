import axios from "axios";

const API = "http://localhost:4000/api/buku";

const addKode = document.getElementById("addKode");
const addJudul = document.getElementById("addJudul");
const addPengarang = document.getElementById("addPengarang");
const addPenerbit = document.getElementById("addPenerbit");
const addHarga = document.getElementById("addHarga");

const editKode = document.getElementById("editKode");
const editJudul = document.getElementById("editJudul");
const editPengarang = document.getElementById("editPengarang");
const editPenerbit = document.getElementById("editPenerbit");
const editHarga = document.getElementById("editHarga");

const tableData = document.getElementById("tableData");
const saveBtn = document.getElementById("saveBtn");

// Modal Bootstrap
let modal = new bootstrap.Modal(document.getElementById("editModal"));

document.getElementById("addBtn").onclick = addBook;

async function loadBooks() {
    const res = await axios.get(API);
    tableData.innerHTML = "";
    res.data.forEach(b => {
        tableData.innerHTML += `
          <tr>
              <td>${b.kode}</td>
              <td>${b.judul}</td>
              <td>${b.pengarang}</td>
              <td>${b.penerbit}</td>
              <td>${b.harga}</td>
              <td>
                <button class="btn btn-warning btn-sm" onclick="editBook('${b.kode}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBook('${b.kode}')">Hapus</button>
              </td>
          </tr>`;
    });
}

window.editBook = async (kodeBuku) => {
    const res = await axios.get(`${API}/${kodeBuku}`);
    editKode.value = res.data.kode;
    editJudul.value = res.data.judul;
    editPengarang.value = res.data.pengarang;
    editPenerbit.value = res.data.penerbit;
    editHarga.value = res.data.harga;

    modal.show();
};

saveBtn.onclick = async () => {
    await axios.put(`${API}/${editKode.value}`, {
        judul: editJudul.value,
        pengarang: editPengarang.value,
        penerbit: editPenerbit.value,
        harga: editHarga.value,
    });

    modal.hide();
    loadBooks();
};

window.deleteBook = async (kodeBuku) => {
    await axios.delete(`${API}/${kodeBuku}`);
    loadBooks();
};

async function addBook() {
    await axios.post(API, {
        kode: addKode.value,
        judul: addJudul.value,
        pengarang: addPengarang.value,
        penerbit: addPenerbit.value,
        harga: addHarga.value,
    });

    addKode.value = "";
    addJudul.value = "";
    addPengarang.value = "";
    addPenerbit.value = "";
    addHarga.value = "";

    loadBooks();
}

loadBooks();
