const fs = require("node:fs");
const readline = require("node:readline");
const { json } = require("stream/consumers");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("lets try to guess my name ? ", (name) => {
  console.log(`i really sure, your're ${name}, bestie `);
  rl.question("now, you must to guess my hobby ? ", (hobby) => {
    // simpan semua data kedalam object
    const data = { name, hobby };

    // baca file tersebut menggunakan konsep synchronous
    const file = fs.readFileSync("data.json", "utf-8");
    //   convert format string yang terbaca tersebut menjadi format json
    const jsonParse = JSON.parse(file);

    //   json = push array, masukan data yang telah tersimpan di obj ke array
    jsonParse.push(data);

    //  semua data yang sudah ada di array supaya di tuliskan ke file json secara otomatis
    fs.writeFileSync("data.json", JSON.stringify(jsonParse));

    console.log(`loading...`);
    setTimeout(() => {
      //   berikan pesan tambahan
      console.log("data sudah masuk ke file .json, silakan di cek");
    }, 3000);
    rl.close();
  });
});
