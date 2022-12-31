// npm - package
const fs = require("node:fs");
const chalk = require("chalk");
const validator = require("validator");

// cek apakah file .json sudah dibuat
const path = "./data";
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}
const dataPath = "./data/data.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const debug = (nama, email, telp) => {
  // simpan semua data kedalam object
  const data = { nama, email, telp };

  // baca file tersebut menggunakan konsep synchronous
  const file = fs.readFileSync("./data/data.json", "utf-8");
  //   convert format string yang terbaca tersebut menjadi format json
  const jsonParse = JSON.parse(file);

  // cek validasi nama
  const cekNama = jsonParse.find((dataNama) => dataNama.nama == nama);
  if (cekNama) {
    console.log(chalk.red.inverse.bold("nama yang anda masukan sudah terdaftar"));
    return false;
  }
  // cek validasi email

  if (!validator.isEmail(email)) {
    console.log(chalk.yellow.inverse.bold("email tidak valid"));
    return false;
  }

  // cek validasi no telp
  if (!validator.isMobilePhone(telp, "id-ID")) {
    console.log(chalk.red.inverse.bold("no telepon tidak sesuai negara indonesia"));
    return false;
  }

  //   json = push array, masukan data yang telah tersimpan di obj ke array
  jsonParse.push(data);

  //  semua data yang sudah ada di array supaya di tuliskan ke file json secara otomatis
  fs.writeFileSync("./data/data.json", JSON.stringify(jsonParse));

  console.log(`loading...`);
  setTimeout(() => {
    //   berikan pesan tambahan
    console.log("data sudah masuk ke file .json, silakan di cek");
  }, 3000);
};

module.exports = { debug };
