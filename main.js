import readline from "readline";
import {
  addBook,
  getAllBooks,
  getBookByKode,
  updateBook,
  deleteBook,
  filterByKategori,
  sortBooksByTitle,
  sortBooksByYear,
  loadBooks,
} from "./functions.js";

// Load data yang tersimpan di books.json
loadBooks();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  console.log(`
==============================
      SISTEM KOLEKSI BUKU
==============================
1. Lihat semua buku
2. Tambah buku baru
3. Cari buku berdasarkan kode (NOV / KOM)
4. Ubah data buku
5. Hapus buku
6. Filter berdasarkan kategori (NOV / KOM)
7. Urutkan berdasarkan judul
8. Urutkan berdasarkan tahun terbit
0. Keluar
==============================
`);
};

const askMenu = () => {
  rl.question("Pilih menu (0-8): ", (choice) => {
    switch (choice.trim()) {
      case "1":
        getAllBooks();
        showMenu();
        askMenu();
        break;

      case "2":
        rl.question("Judul: ", (judul) => {
          rl.question("Penulis: ", (penulis) => {
            rl.question("Tahun terbit: ", (tahun) => {
              rl.question("Kategori (NOV = novel, KOM = komik): ", (kategori) => {
                addBook({ judul, penulis, tahun, kategori });
                showMenu();
                askMenu();
              });
            });
          });
        });
        break;

      case "3":
        rl.question("Masukkan kode buku (contoh: NOV001 / KOM001): ", (kode) => {
          getBookByKode(kode);
          showMenu();
          askMenu();
        });
        break;

      case "4":
        rl.question("Masukkan kode buku yang ingin diubah: ", (kode) => {
          console.log("Kosongkan (Enter) kalau tidak ingin mengubah field tersebut.");
          rl.question("Judul baru: ", (judul) => {
            rl.question("Penulis baru: ", (penulis) => {
              rl.question("Tahun baru: ", (tahun) => {
                rl.question("Kategori baru (NOV/KOM): ", (kategori) => {
                  const data = {};
                  if (judul.trim() !== "") data.judul = judul.trim();
                  if (penulis.trim() !== "") data.penulis = penulis.trim();
                  if (tahun.trim() !== "") data.tahun = tahun.trim();
                  if (kategori.trim() !== "") data.kategori = kategori.trim().toUpperCase();
                  updateBook(kode, data);
                  showMenu();
                  askMenu();
                });
              });
            });
          });
        });
        break;

      case "5":
        rl.question("Masukkan kode buku yang ingin dihapus: ", (kode) => {
          deleteBook(kode);
          showMenu();
          askMenu();
        });
        break;

      case "6":
        rl.question("Masukkan kategori (NOV / KOM): ", (kategori) => {
          filterByKategori(kategori);
          showMenu();
          askMenu();
        });
        break;

      case "7":
        sortBooksByTitle();
        showMenu();
        askMenu();
        break;

      case "8":
        sortBooksByYear();
        showMenu();
        askMenu();
        break;

      case "0":
        console.log("Keluar dari sistem. Terima kasih!");
        rl.close();
        break;

      default:
        console.log("Pilihan tidak valid, coba lagi!");
        showMenu();
        askMenu();
        break;
    }
  });
};

showMenu();
askMenu();