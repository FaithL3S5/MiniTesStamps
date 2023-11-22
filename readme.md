---

# Mini Tes Stamps Indonesia

![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)

## Deskripsi

Proyek ini merupakan kumpulan jawaban untuk mini tes Stamps Indonesia. Terdapat dua skrip JavaScript, yaitu FooBar dan API Ramalan Cuaca, yang menjawab pertanyaan yang diajukan dalam tes tersebut. Program ini dikembangkan oleh Muhammad Fatih Fahroji dengan lisensi ISC.

### Limitasi Umum

- Seperti program lain yang ditulis dengan vanilla JavaScript, tipe data yang terdapat pada variable memiliki sifat dapat berubah.
- Limitasi yang tertulis di sini bukan daftar yang komprehensif. Mungkin ada bug lain yang bisa muncul dan tidak tertulis di sini.

## FooBar

### Limitasi FooBar

- Program hanya dapat menerima input berupa objek dengan nilai: { numbers (tipe data: array), words (tipe data: array), loopLength (tipe data: number), loopSort (tipe data: string) }
- Program dapat berjalan cukup lama, linear dengan banyaknya angka yang harus diproses
- Panjang antara array numbers dan words harus sama, program akan menolak eksekusi proses jika berbeda

### Soal dan Penjelasan FooBar

Program FooBar dirancang untuk membuat array/list dari 1 sampai 100 dan mencetak angka ini dalam urutan terbalik, dengan beberapa aturan tertentu. Aturan-aturan tersebut meliputi penggantian angka bilangan prima, penggantian angka yang dapat dibagi oleh 3 dan 5, serta pengaturan tampilan angka menyamping.

![Contoh Output FooBar](https://i.ibb.co/XF7rwNt/image.png)

Untuk menjelaskan cara penyelesaian, program melakukan loop dari 100 hingga 1, memeriksa aturan tertentu, dan menghasilkan output sesuai dengan kondisi yang ditemui. Program juga memeriksa apakah suatu angka adalah bilangan prima dengan fungsi isPrime yang dioptimalkan.

### Contoh Penggunaan FooBar

```javascript
// Contoh penggunaan program FooBar
const numbers = [3, 5];
const words = ["Foo", "Bar"];
const loopLength = 100;
const loopSort = "DES";

// Eksekusi program FooBar
console.log(fooBar({ numbers, words, loopLength, loopSort }));
```

## API Ramalan Cuaca

### Limitasi API Ramalan Cuaca

- Karena API yang digunakan didesain hanya untuk prakiraan cuaca 5 hari ke depan, prakiraan di luar atau di bawah jangkauan tersebut tidak dapat dilakukan.
- Penulisan nama kota harus dilakukan secara lengkap untuk meminimalisir API menampilkan data kota yang salah

### Soal dan Penjelasan API Ramalan Cuaca

Program API Ramalan Cuaca bertujuan untuk menampilkan ramalan cuaca kota Jakarta untuk 5 hari ke depan menggunakan data dari API OpenWeatherMap. Program ini mengharuskan penggunaan fungsi fetch untuk mengambil data dari API dan melakukan manipulasi data agar sesuai dengan format yang diinginkan.

![Contoh Output API Ramalan Cuaca](https://i.ibb.co/WKY9ZvY/image.png)

Untuk menjelaskan cara penyelesaian, program menggunakan fungsi convertUnixTimestampToTime untuk mengonversi Unix Timestamp ke format waktu yang dapat dibaca. Selanjutnya, program memanfaatkan interval waktu tertentu untuk menentukan prakiraan cuaca yang sesuai dengan waktu saat ini.

### Contoh Penggunaan API Ramalan Cuaca

```javascript
// Contoh penggunaan program API Ramalan Cuaca
const cityName = "Jakarta";
const units = "metric";
const appId = "Your-API-Key-Here";

// Eksekusi program API Ramalan Cuaca
runForecast({ cityName, units, appId });
```

---
