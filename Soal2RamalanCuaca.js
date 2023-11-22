/*

Nama Program   : API Ramalan Cuaca
Bahasa Program : JavaScript ES6+ (Kompatibel dengan Browser Compiler)
Versi          : 1.0.0
Deskripsi      : Aplikasi untuk menjawab soal no. 2 mini tes Stamps Indonesia
Author         : Muhammad Fatih Fahroji (Faith_L3S5)
Lisensi        : ISC

Limitasi:
- Karena API yang digunakan didesain hanya untuk prakiraan cuaca 5 hari ke depan, prakiraan di luar atau di bawah jangkauan tersebut tidak dapat dilakukan.
- Penulisan nama kota harus dilakukan secara lengkap untuk meminimalisir API menampilkan data kota yang salah
- Seperti program lain yang ditulis dengan vanilla javascript, tipe data yang terdapat pada variable memiliki sifat dapat berubah
Limitasi yang tertulis di sini bukan daftar yang komprehensif. Mungkin ada bug lain yang bisa muncul dan tidak tertulis di sini.

!!!!!!! SOAL !!!!!!!

2. Menampilkan ramalan cuaca kota Jakarta untuk 5 hari kedepan

Tolong tampilkan output berupa ramalan cuaca kota Jakarta untuk 5 hari ke depan
1. Silakan gunakan API yang disediakan http://openweathermap.org
2. Yang ditampilkan hanya 1 suhu per hari
3. Soal ini tidak membutuhkan akun berbayar.

Berikut contoh output yang kami harapkan:
https://i.ibb.co/hVmtzJd/unnamed2.png


!!!!!!! PENJELASAN !!!!!!!

Berdasarkan kriteria requirement soal, masalah kali ini bersangkutan dengan pengambilan data dari third-party API.
Mengingat ini adalah API pihak ketiga, dokumentasi dari OpenWeatherMap menjadi sangat penting untuk diikuti.
JavaScript ES6+ memiliki fungsi bawaan untuk melakukan request terhadap URI tertentu yaitu fungsi fetch.
Menggunakan fungsi bawaan tersebut, masalah soal dapat diselesaikan dengan:
1. Berdasarkan dokumentasi API, untuk mendapatkan data ramalan cuaca 5 hari ke depan, endpoint berikut dapat digunakan: https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={appId}
2. Parameter wajib yang harus diisi dari endpoint tersebut adalah cityName dan appId
3. Parameter appid dapat ditemukan setelah melakukan registrasi di website OpenWeatherMap
5. Kirim request ke endpoint API dengan parameter yang telah ditemukan
6. Response yang didapatkan akan diproses sedemikian rupa agar menyerupai hasil output yang diinginkan

Masalah yang perlu diperhatikan di sini adalah:
- Bagaimana jika pengguna ingin mengecek data di kota lain?
--> Untuk memungkinkan hal ini, data nama kota tidak dapat ditetapkan secara statis
    Data tersebut akan dijadikan dinamik sesuai dengan input pengguna tapi memiliki nilai default apabila tidak ditentukan

- Pada contoh output, terlihat suhu ditulis dalam Celcius, bagaimana cara mendapatkannya?
--> API OpenWeatherMap menggunakan skala suhu Kelvin sebagai satuan bawaannya
    satuan ini dapat diubah dengan menentukan parameter units pada endpoint API

- Pada contoh output, terlihat hanya satu suhu saja yang ditampilkan, suhu pada jam berapa sebaiknya dimunculkan?
--> Tergantung pada jam saat ini. Apabila saat ini menunjukkan pukul 7 pagi maka sebaiknya munculkan prediksi pada jam 6
    Bila saat ini menunjukan pukul 2 pagi, maka munculkan prediksi pada jam 12 malam

*/

// !!!!!!! JAWABAN !!!!!!!

// 📅 Fungsi untuk mengonversi Unix Timestamp ke format waktu
function convertUnixTimestampToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Konversi detik ke milidetik
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

// 🌦️ Fungsi untuk mendapatkan prakiraan cuaca lima hari
const fiveDaysForecast = async ({ cityName, units, appId }) => {
  // Validasi parameter
  if (!appId) throw new Error("AppID diperlukan untuk menjalankan program");

  if (typeof cityName !== "string") {
    throw new Error("Nilai tidak valid pada Nama Kota");
  }

  if (typeof units !== "string") {
    throw new Error("Nilai tidak valid pada satuan suhu");
  }

  try {
    // Ambil data prakiraan cuaca dari API OpenWeatherMap
    const foreCastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.toLowerCase()}&units=${units.toLowerCase()}&appid=${appId}`
    );

    if (!foreCastResponse.ok) {
      throw new Error(`Kesalahan HTTP! Status: ${foreCastResponse.status}`);
    }

    const foreCast = await foreCastResponse.json();

    let foreCastList = [];

    // Ambil data yang diperlukan dari respons API
    foreCast.list.forEach((element) => {
      foreCastList.push({
        dt: element.dt,
        temp: element.main.temp,
      });
    });

    const currentTime = new Date().getHours();

    let apiTime = "";
    let intervals = [0, 3, 6, 9, 12, 15, 18, 21];
    let found = false;

    // Tentukan waktu prakiraan cuaca yang sesuai dengan waktu saat ini
    for (let i = 0; i < intervals.length - 1; i++) {
      if (
        intervals[i] === currentTime ||
        (intervals[i] < currentTime && currentTime < intervals[i + 1])
      ) {
        apiTime = `${String(intervals[i]).padStart(2, "0")}:00:00`;
        found = true;
        break;
      }
    }

    // Jika tidak ditemukan waktu yang sesuai, lempar error
    if (!found) {
      throw new Error("Tidak ada waktu yang ditemukan");
    }

    // Filter data prakiraan cuaca yang sesuai dengan waktu yang ditentukan
    const updatedforeCastList = foreCastList.filter((element) => {
      let elementTime = convertUnixTimestampToTime(element.dt);
      return elementTime === apiTime;
    });

    // Tampilkan hasil prakiraan cuaca
    updatedforeCastList.forEach((element) => {
      let displayDate = new Date(element.dt * 1000);
      console.log(`${displayDate.toDateString()}: ${element.temp}\u00B0C`);
    });
  } catch (error) {
    // Tangani kesalahan
    console.error("Kesalahan:", error.message);
    throw error;
  }
};

// 🚀 Fungsi untuk menjalankan prakiraan cuaca dengan parameter default
async function runForecast({
  cityName = "Jakarta",
  units = "metric",
  appId = "",
}) {
  try {
    console.log(`Prakiraan Cuaca untuk Kota ${cityName}:`);

    // Panggil fungsi prakiraan cuaca lima hari
    await fiveDaysForecast({
      cityName,
      units,
      appId,
    });
  } catch (error) {
    // Tangani kesalahan
    console.error("Kesalahan:", error.message);
  }
}

// 📋 Contoh penggunaan program
const cityName = "Jakarta";
const units = "metric";
const appId = "Your-API-Key-Here";

// 🎬 Eksekusi program
runForecast({ cityName, units, appId });

// 📝 Program juga dapat berjalan hanya dengan beberapa parameter
// runForecast({ cityName: "Tokyo", appId });

// ⚠️ Program hanya dapat berjalan jika AppID diberikan
// runForecast({})
// Error: AppID diperlukan untuk menjalankan program

// ❌ Program tidak dapat berjalan tanpa parameter input sama sekali
// runForecast()
// TypeError: Cannot read properties of undefined (reading 'numbers')
