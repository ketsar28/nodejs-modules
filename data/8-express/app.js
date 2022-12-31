const express = require("express");
const app = express();
const port = 3000;

// note : root '/'
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// note : relative url './'
app.get("/index", (req, res) => {
  res.send("Halaman index, silakan masukan konten utama disini");
});
// note : relative url './'
app.get("/home", (req, res) => {
  res.send("Halaman home, tambahkan fitur fitur menarik");
});
// note : relative url './'
app.get("/about", (req, res) => {
  res.send("Halaman about, berikan deskripsi sesukamu");
});

// note : relative url './'
app.use("/", (req, res) => {
  const inputData = app.set("nama", "Muhammad Nabil");
  const getData = app.get("nama");
  res.send(`<h1>Nama : ${getData}</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});
