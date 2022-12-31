const fs = require("node:fs");
// // synchronous
// fs.writeFileSync("tes.txt", "Halo Ketsar, Ini Synchronous");
// // asynchronous
// fs.writeFile("async/tesAsync.txt", "File Ini Sudah Berubah, Ketsar", (e) => {
//   console.log(e);
// });

// ==================================================

// // membaca isi file ke dalam konsol - sync
// const readSync = fs.readFileSync("tes.txt", "utf-8");
// console.log(`Synchronous : ${readSync}`);

// // membaca isi file ke dalam konsol - async
// const readAsync = fs.readFile("async/tesAsync.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(`Asynchronous : ${data}`);
// });

// ==================================================
