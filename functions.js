import fs from "fs";
import { books, KATEGORI } from "./data.js";

const FILE = "books.json";

// ---------- Simpan & Muat Data ----------

// Menyimpan isi array books yang baru ke file books.json
export const saveBooks = () => {
  fs.writeFileSync(FILE, JSON.stringify(books, null, 2));
};

// Ngambil data buku dari books.json
export const loadBooks = () => {
  if (fs.existsSync(FILE)) {
    const isiFile = fs.readFileSync(FILE, "utf-8");
    const dataTersimpan = JSON.parse(isiFile);
    books.length = 0; // bikin array dan kosongin array nya dulu
    books.push(...dataTersimpan); // isi dengan data dari file
  }
};

// Validasi konstanta yang ada di data.js 
const isKategoriValid = (kategori) => kategori === "NOV" || kategori === "KOM";

const isTahunValid = (tahun) => {
  const angka = Number(tahun);
  const tahunSekarang = new Date().getFullYear();
  return Number.isInteger(angka) && angka >= 1000 && angka <= tahunSekarang;
};

// Membuat kode buku secara otomatis: NOV001 (dst) atau KOM001 (dst)
const generateKode = (kategori) => {
  let nomorTerbesar = 0;

  for (const buku of books) {
    if (buku.kategori === kategori) {
      const nomor = Number(buku.kode.slice(3)); // ambil angka setelah NOV/KOM
      if (nomor > nomorTerbesar) {
        nomorTerbesar = nomor;
      }
    }
  }

  const nomorBaru = nomorTerbesar + 1;

  if (nomorBaru < 10) {
    return `${kategori}00${nomorBaru}`;
  } else if (nomorBaru < 100) {
    return `${kategori}0${nomorBaru}`;
  } else {
    return `${kategori}${nomorBaru}`;
  }
};

// Mencari posisi buku di array berdasarkan kode (-1 kalo ga ada)
const cariIndex = (kode) =>
  books.findIndex((buku) => buku.kode === kode.trim().toUpperCase());

// Menampilkan daftar buku ke terminal
const tampilkanBuku = (daftar) => {
  if (daftar.length === 0) {
    console.log("(Tidak ada data)");
    return;
  }

  for (const buku of daftar) {
    const { kode, judul, penulis, tahun, kategori } = buku;
    console.log(`[${kode}] ${judul} | ${penulis} | ${tahun} | ${KATEGORI[kategori]}`);
  }
};

// PROSES CREATE
export const addBook = ({ judul, penulis, tahun, kategori }) => {
  const kategoriFix = kategori.trim().toUpperCase();

  if (!judul.trim() || !penulis.trim() || !tahun.trim() || !kategori.trim()) {
    console.log("Semua field wajib diisi!");
    return;
  }

  if (!isKategoriValid(kategoriFix)) {
    console.log("Kategori tidak valid! Pilih NOV (novel) atau KOM (komik).");
    return;
  }

  if (!isTahunValid(tahun)) {
    console.log("Tahun terbit tidak valid!");
    return;
  }

  const bukuBaru = {
    kode: generateKode(kategoriFix),
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun: Number(tahun),
    kategori: kategoriFix,
  };

  books.push(bukuBaru);
  saveBooks();
  console.log(`Buku ${bukuBaru.kode} - "${bukuBaru.judul}" berhasil ditambahkan.`);
};

// PROSES READ 
export const getAllBooks = () => {
  console.log("Daftar Semua Buku:");
  tampilkanBuku(books);
};

export const getBookByKode = (kode) => {
  const index = cariIndex(kode);

  if (index === -1) {
    console.log(`Buku dengan kode ${kode} tidak ditemukan.`);
    return;
  }

  tampilkanBuku([books[index]]);
};

// PROSES UPDATE 
export const updateBook = (kode, dataBaru) => {
  const index = cariIndex(kode);

  if (index === -1) {
    console.log(`Tidak ada buku dengan kode ${kode}.`);
    return;
  }

  if (dataBaru.tahun !== undefined && !isTahunValid(dataBaru.tahun)) {
    console.log("Tahun terbit tidak valid!");
    return;
  }

  if (dataBaru.kategori !== undefined && !isKategoriValid(dataBaru.kategori)) {
    console.log("Kategori tidak valid! Pilih NOV atau KOM.");
    return;
  }

  const lama = books[index];
  const baru = { ...lama, ...dataBaru }; // gabung data lama + data baru
  baru.tahun = Number(baru.tahun);

  // Kalau kategorinya berubah, kode nya ikut ganti juga
  if (baru.kategori !== lama.kategori) {
    baru.kode = generateKode(baru.kategori);
    console.log(`Kategori berubah, kode baru: ${baru.kode}`);
  }

  books[index] = baru;
  saveBooks();
  console.log(`Data buku ${lama.kode} berhasil diperbarui.`);
};

// PROSES DELETE 
export const deleteBook = (kode) => {
  const index = cariIndex(kode);

  if (index === -1) {
    console.log(`Tidak ada buku dengan kode ${kode}.`);
    return;
  }

  const [dihapus] = books.splice(index, 1);
  saveBooks();
  console.log(`Buku ${dihapus.kode} - "${dihapus.judul}" berhasil dihapus.`);
};

// PROSES FILTER 
export const filterByKategori = (kategori) => {
  const kategoriFix = kategori.trim().toUpperCase();

  if (!isKategoriValid(kategoriFix)) {
    console.log("Kategori tidak valid! Pilih NOV atau KOM.");
    return;
  }

  const hasil = books.filter((buku) => buku.kategori === kategoriFix);
  console.log(`Daftar buku kategori ${KATEGORI[kategoriFix]} (${kategoriFix}):`);
  tampilkanBuku(hasil);
};

// PROSES SORTING 
export const sortBooksByTitle = () => {
  const urut = [...books].sort((a, b) => {
    const judulA = a.judul.toLowerCase();
    const judulB = b.judul.toLowerCase();

    if (judulA < judulB) {
      return -1;
    } else if (judulA > judulB) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log("Buku diurutkan berdasarkan judul:");
  tampilkanBuku(urut);
};

export const sortBooksByYear = () => {
  const urut = [...books].sort((a, b) => a.tahun - b.tahun);
  console.log("Buku diurutkan berdasarkan tahun terbit:");
  tampilkanBuku(urut);
};