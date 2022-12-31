// npm - package
const fs = require("node:fs");

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

const detailContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  return contact;
};

module.exports = { loadContacts, detailContact };
