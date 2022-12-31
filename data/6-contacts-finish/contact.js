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

const loadContacts = () => {
  // baca file tersebut menggunakan konsep synchronous
  const file = fs.readFileSync("./data/data.json", "utf-8");
  //   convert format string yang terbaca tersebut menjadi format json
  const jsonParse = JSON.parse(file);

  return jsonParse;
};

const debug = (nama, email, telp) => {
  // simpan semua data kedalam object
  const data = { nama, email, telp };
  const jsonParse = loadContacts();

  // cek validasi nama
  const cekNama = jsonParse.find((contact) => contact.nama == nama);
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

// == tampilkan semua data kontak ==
const viewAll = () => {
  const contacts = loadContacts();

  contacts.forEach((contact, i) => {
    console.log(`No : ${i + 1}. ${contact.nama}`);
  });
};

// menampilkan detail kontak
const detailContact = (nama, email, telp) => {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.inverse.bold("nama tersebut tidak ada di daftar!"));

    return false;
  }

  // jika sesuai ketentuan
  console.log(chalk.yellow.inverse.bold("detail contact : "));
  console.log(` - nama : ${contact.nama}`);
  console.log(` - email : ${contact.email}`);
  if (contact.telp) {
    console.log(` - no hp : ${contact.telp}`);
  }
};

// menghapus data kontak
const dropContact = (nama, email, telp) => {
  const contacts = loadContacts();
  // save data selain yang di inputkan
  const contact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === contact.length) {
    console.log(chalk.red.inverse.bold("nama tersebut tidak ada di daftar!"));

    return false;
  }

  fs.writeFileSync("./data/data.json", JSON.stringify(contact));

  console.log(`sedang proses penghapusan..`);
  setTimeout(() => {
    //   berikan pesan tambahan
    console.log(chalk.green.inverse.bold("nama tersebut berhasil di hapus"));
  }, 3000);
};

module.exports = { debug, viewAll, detailContact, dropContact };
