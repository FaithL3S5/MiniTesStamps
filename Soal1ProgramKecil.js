/*

Nama Program   : FooBar
Bahasa Program : JavaScript ES6+ (Kompatibel dengan Browser Compiler)
Versi          : 1.0.0
Deskripsi      : Aplikasi untuk menjawab soal no. 1 mini tes Stamps Indonesia
Author         : Muhammad Fatih Fahroji (Faith_L3S5)
Lisensi        : ISC

Limitasi:
- Program hanya dapat menerima input berupa object dengan nilai: { numbers (tipe data: array), words (tipe data: array), loopLength (tipe data: number), loopSort (tipe data: string) }
- Program dapat berjalan cukup lama, linear dengan banyaknya angka yang harus diproses
- Panjang antara array numbers dan words harus sama, program akan menolak eksekusi proses jika berbeda
- Seperti program lain yang ditulis dengan vanilla javascript, tipe data yang terdapat pada variable memiliki sifat dapat berubah
Limitasi yang tertulis di sini bukan daftar yang komprehensif. Mungkin ada bug lain yang bisa muncul dan tidak tertulis di sini.

!!!!!!! SOAL !!!!!!!

1. Program kecil    

Tolong buat satu array / list dari 1 sampai 100. Print semua angka ini dalam urutan terbalik, tetapi ada beberapa peraturan : 
1. Jangan print angka bilangan prima.
2. Ganti angka yang dapat dibagi dengan angka 3 dengan text "Foo".
3. Ganti angka yang dapat dibagi dengan angka 5 dengan text "Bar".
4. Ganti angka yang dapat dibagi dengan angka 3 dan 5 dengan text "FooBar".
5. Print angka menyamping tidak ke bawah.

Berikut adalah contoh hasil programnya :
https://i.ibb.co/hRfwFTP/unnamed.png


!!!!!!! PENJELASAN !!!!!!!

Berdasarkan kriteria requirement soal, hal ini dapat diselesaikan dengan:
1. Buat loop dari 100 s.d. 1, dapat menggunakan while maupun for loop
2. Apabila angka adalah bilangan prima, jangan masukan pada hasil
3. Apabila hasil dari operasi modulo 3 pada angka adalah 0, tampilkan text "Foo"
4. Apabila hasil dari operasi modulo 5 pada angka adalah 0, tampilkan text "Bar"
5. Apabila hasil dari operasi modulo 5 dan 3 pada angka adalah 0, tampilkan text "FooBar"

Masalah yang perlu diperhatikan di sini adalah:
- Bagaimana cara agar hasil dapat ditampilkan menyamping dan tidak ke bawah?
--> Hasil yang akan ditampilkan dapat disimpan terlebih dahulu ke dalam variabel
    kemudian ditampilkan bersamaan sehingga muncul dalam satu baris yang sama

- Bagaimana cara mengecek bilangan prima atau bukan?
--> Bilangan prima didefinisikan sebagai bilangan yang hanya dapat dibagi 1 atau dirinya sendiri (kecuali angka 1), maka:
    - pengecekan dapat dilakukan dengan menggunakan loop (dimulai dari 2) hingga mencapai angka itu sendiri
    - gunakan operasi modulo terhadap angka tersebut dengan variabel angka iterasi loop
    - apabila terdapat hasil modulo = 0, maka dipastikan angka tersebut bukan prima karena dapat dibagi angka lain selain dirinya dan 1
    Metode ini dapat dioptimasi kembali karena:
    - angka bukan prima pasti memiliki faktor di bawah dirinya, contoh:
      - umpamakan angka yang diuji adalah 4
      - angka 4 memiliki faktor: 1, 2, 4
      - berdasarkan hal ini, tidaklah efisien untuk menjalankan loop dari 1 s.d. 4
      - menjalankan loop sampai dengan angka 2 sudah cukup untuk membuktikan bahwa angka 4 bukanlah prima
    - berdasarkan contoh di atas, akan lebih efisien jika loop dijalankan hanya sampai dengan akar pangkat duanya saja (√n) kemudian dibulatkan ke atas

- Bagaimana jika angka pembagi ingin diubah atau ditambahkan? Misalnya dari [3,5] menjadi [2,5,7] atau perubahan lainnya.
--> Buat kode tersebut menjadi fungsi yang dapat menerima input user sehingga pengguna dapat menentukan angka maupun kata sesuai dengan keinginannya

*/

// !!!!!!! JAWABAN !!!!!!!

// 📝 Fungsi untuk memeriksa apakah suatu angka adalah bilangan prima
function isPrime(num) {
  // Jika angka kurang dari atau sama dengan 1, bukan bilangan prima
  if (num <= 1) return false;

  // Loop dari 2 hingga akar kuadrat dari angka
  for (let i = 2; i <= Math.sqrt(num); i++) {
    // Jika angka dapat dibagi oleh i, bukan bilangan prima
    if (num % i === 0) return false;
  }

  // Jika melewati semua tes, angka adalah bilangan prima
  return true;
}

// 📝 Fungsi untuk memeriksa apakah suatu array sesuai dengan tipe data yang diharapkan
function checksArray(arr, dataType) {
  // Jika bukan array, dianggap tidak sesuai
  if (!Array.isArray(arr)) {
    return false;
  }

  // Memeriksa apakah setiap elemen array sesuai dengan tipe data yang diharapkan
  const isValidType = arr.every((element) => typeof element === dataType);

  return isValidType;
}

// 🚀 Fungsi utama program FooBar
function fooBar({
  numbers = [3, 5],
  words = ["Foo", "Bar"],
  loopLength = 100,
  loopSort = "DES",
}) {
  // Memeriksa tipe data dan validitas array numbers
  if (!checksArray(numbers, "number")) {
    throw new Error("Nilai Tidak Valid pada Array Angka");
  }

  // Memeriksa tipe data dan validitas array words
  if (!checksArray(words, "string")) {
    throw new Error("Nilai Tidak Valid pada Array Kata");
  }

  // Memeriksa tipe data dan validitas loopLength
  // typeof loopLength !== "undefined" &&
  if (typeof loopLength !== "number") {
    throw new Error("Nilai Tidak Valid pada Panjang Perulangan");
  }

  // Memeriksa tipe data dan validitas loopSort
  if (typeof loopSort !== "string") {
    throw new Error("Nilai Tidak Valid pada Urutan Perulangan");
  }

  // Inisialisasi array hasil
  let result = [];

  // Memeriksa apakah panjang array numbers sama dengan panjang array words
  if (numbers.length !== words.length) {
    throw new Error("Panjang Array Input Tidak Sama");
  }

  // Set panjang array numbers untuk perhitungan pada loop utama
  const length = numbers.length;

  // Loop utama FooBar
  for (
    let i = loopSort === "ASC" ? 1 : loopLength;
    loopSort === "ASC" ? i <= loopLength : i >= 1;
    loopSort === "ASC" ? i++ : i--
  ) {
    // Inisialisasi variabel untuk menyimpan output
    let output = "";

    // Loop untuk memeriksa pembagian dengan setiap angka pada array numbers
    for (let j = 0; j < length; j++) {
      // Jika dapat dibagi, tambahkan kata yang sesuai ke output
      if (i % numbers[j] === 0) {
        output += words[j];
      }
    }

    // Jika angka adalah bilangan prima, lanjutkan ke iterasi berikutnya
    if (isPrime(i)) {
      continue;
    } else if (output === "") {
      // Jika output kosong, tambahkan angka ke array hasil
      result.push(i);
    } else {
      // Jika output tidak kosong, tambahkan output ke array hasil
      result.push(output);
    }
  }

  // Return hasil dari fungsi, pisahkan menggunakan koma dan spasi (, )
  return result.join(", ");
}

// 📋 Contoh penggunaan program
const numbers = [3, 5];
const words = ["Foo", "Bar"];
const loopLength = 100;
const loopSort = "DES";

// 🚀 Eksekusi program
console.log(fooBar({ numbers, words, loopLength, loopSort }));

// 🚀 Program juga dapat hanya dengan beberapa parameter
// console.log(fooBar({ numbers: [2, 3], loopLength: 50 }));

// 🚀 Program juga dapat berjalan dengan object kosong
// console.log(fooBar({}));

// ❌ Program tidak dapat berjalan tanpa parameter input sama sekali
// console.log(fooBar());
// TypeError: Cannot read properties of undefined (reading 'numbers')
