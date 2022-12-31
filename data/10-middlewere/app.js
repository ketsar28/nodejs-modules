const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// == ejs ==
app.set("view engine", "ejs");

// == middlewere ==
app.use(expressLayouts);
app.use(express.static("public"));
app.use(morgan("dev"));

const mahasiswa = [
  {
    nama: "Ketsar Ali",
    prodi: "Teknik Informatika",
  },
  {
    nama: "Nur Asyiyah",
    prodi: "Teknik Telekomunikasi ",
  },
  {
    nama: "Irwan Aidy",
    prodi: "Akuntansi",
  },
];

// fungsi middlewere
app.use("/", (req, res, next) => {
  console.log("Fungsi Sukses Di Jalanakan");
  console.log("Time :", new Date());
  next();
});
// note : root '/'
app.get("/", (req, res) => {
  res.send("<h1>Ini Halaman Utama</h1>");
});
// note : relative url './'
app.get("/index", (req, res) => {
  // res.send("Halaman index, silakan masukan konten utama disini");
  res.render("index", {
    title: "Main Page",
    mahasiswa,
    layout: "layouts/main-component",
  });
});

// note : relative url './'
app.get("/home", (req, res) => {
  res.render("home", {
    title: "Home Page",
    mahasiswa,
    layout: "layouts/main-component",
  });
});
// note : relative url './'
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    mahasiswa,
    layout: "layouts/main-component",
  });
});

// note : relative url './' selain url yang sudah diatur maka arahkan ke  blank page dan tampilkan pesan
app.use("/", (req, res) => {
  const inputData = app.set("error", "Alamat URL Tidak Di Ketahui");
  const getData = app.get("error");
  res.send(`<h1>Error : ${getData}</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});
