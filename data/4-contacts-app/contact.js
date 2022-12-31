// npm - package
const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// cek apakah file .json sudah dibuat
const path = "./data";
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}
const dataPath = "./data/data.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const askOne = (tanya) => {
  return new Promise((resolve, rejects) => {
    rl.question(tanya, (nama) => {
      resolve(nama);
    });
  });
};

const debug = (nama, email, telp) => {
  // simpan semua data kedalam object
  const data = { nama, email, telp };

  // baca file tersebut menggunakan konsep synchronous
  const file = fs.readFileSync("./data/data.json", "utf-8");
  //   convert format string yang terbaca tersebut menjadi format json
  const jsonParse = JSON.parse(file);

  //   json = push array, masukan data yang telah tersimpan di obj ke array
  jsonParse.push(data);

  //  semua data yang sudah ada di array supaya di tuliskan ke file json secara otomatis
  fs.writeFileSync("./data/data.json", JSON.stringify(jsonParse));

  console.log(`loading...`);
  setTimeout(() => {
    //   berikan pesan tambahan
    console.log("data sudah masuk ke file .json, silakan di cek");
  }, 3000);
  rl.close();
};

module.exports = { askOne, debug };
