Judul proyek: Sistem pengelolaan buku berbasis CLI


1. GAMBARAN UMUM
    Aplikasi backend sederhana yang berguna untuk mengelola koleksi buku-buku. Buku koleksi dikelompokkan menjadi 2; yaitu Buku Novel yang di definisikan dengan kode (NOV) dab Buku Komik yang di definisikan dengan kode (KOM). Setiap buku diberikan kode khusus secara otomatis, user juga bisa menambahkan data buku baru, mengubah data sebuah buku, mencari buku melalui kode nya, menghapus sebuah data buku, dan mengurutkannya.

2. How to run the code
    1. Pastikan udah ada node.js dengan typing (node -v) di terminal
    2. Kalau udah ada node.js, buka folder project ini
    3. Run code nya dengan cara (node main.js)
    4. Pilih menu dengan cara masukin angka 0-8

3. Format data
    Data disimpan dengan Array of Objects seperti ini:
    [
        {
            kode: "NOV001",
            judul: "Laskar Pelangi",
            penulis: "Andrea Hirata",
            tahun: 2005,
            kategori: "NOV",
        },
        {
            kode: "KOM001",
            judul: "Dragon Ball Vol. 1",
            penulis: "Akira Toriyama",
            tahun: 1985,
            kategori: "KOM",
        },
    ];

    key value nya:
    1. kode: string; kode unik buku/semacam identitas bukunya di sistem.
    2. judul: string; judul bukunya
    3. penulis: string; penulis bukunya
    4. tahun: number; tahun terbit dari bukunya
    5. kategori: string; pengelompokkan buku antara NOV (novel) dan KOM (komik)

4. Penjelasan CRUD di code ini
    1. C (Create): addBook()
        Memvalidasi input, membuat kode secara otomatis, lalu menambahkan object baru ke array.
    2. R (Read):
        - getAllBooks(): Buat menampilkan semua buku.
        - getBookbyKode(): Buat nyari dan menampilkan buku sesuai kode yang diketik.
    3. U (Update): updateBook()
        Mengubah judul, penulis, tahun, atau kategorinya. Kalau kategori bukunya diubah, kode bukunya juga ikut berubah.
    4. D (Delete): deleteBook()
        Menghapus data buku yang ada di array dari kodenya. Kalo kode bukunya ga ada, muncul pesan error (berarti ga berhasil di hapus).
