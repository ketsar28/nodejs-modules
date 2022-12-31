const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const { loadContacts, detailContact, addContact, cekDuplikat, deleteContact, updateContact } = require("./contacts");

// == ejs ==
app.set("view engine", "ejs");

// == middlewere ==
app.use(expressLayouts);
app.use(express.static("public")); // built-in middlewere
app.use(express.urlencoded({ extended: true })); // built-in middlewere
app.use(morgan("dev"));

// configuration flash
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);

app.use(flash());

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
  console.log("Time :", Date.now());
  next();
});
// note : root '/'
app.get("/", (req, res) => {
  res.send("<h1>Ini Halaman Utama</h1>");
});

// display data contacts
app.get("/contacts", (req, res) => {
  // res.send("Halaman index, silakan masukan konten utama disini");
  const contacts = loadContacts();
  res.render("contacts", {
    title: "Contacts Page",
    layout: "layouts/main-component",
    contacts,
    msg: req.flash("msg"),
  });
});

// tambahkan data contacts
app.get("/add", (req, res) => {
  res.render("add", {
    title: "Add Contact Page",
    layout: "layouts/main-component",
  });
});

// proses data contacts
app.post(
  "/contacts",
  [
    check("nama", "Username Tersebut Telah Digunakan").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Username Tersebut Telah Digunakan");
      }
      return true;
    }),
    check("email", "Email Yang Anda Masukan Tidak Valid").isEmail(),
    check("telp", "Nomor Yang Anda Masukan Tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add", {
        title: "Add Contact Page",
        layout: "layouts/main-component",
        errors: errors.array(),
      });
      // return res.status(400).json({ errors: errors.array() });
    } else {
      addContact(req.body);
      // kirimkan flash message
      req.flash("msg", "Data Contact Berhasil Di Tambahkan");
      res.redirect("/contacts");
    }
  }
);

// hapus data contacts
app.get("/contacts/delete/:nama", (req, res) => {
  const contact = detailContact(req.params.nama);

  if (!contact) {
    res.status(404);
    res.send("Data Tidak Di Ketahui!");
  } else {
    deleteContact(req.params.nama);
    // kirimkan flash message
    req.flash("msg", "Data Contact Berhasil Di Hapus");
    res.redirect("/contacts");
  }
});

// ubah data contacts
app.get("/contacts/edit/:nama", (req, res) => {
  const contact = detailContact(req.params.nama);
  res.render("edit", {
    title: "Edit Contact Page",
    layout: "layouts/main-component",
    contact,
  });
});

// proses ubah data
app.post(
  "/contacts/update",
  [
    check("nama", "Username Tersebut Telah Digunakan").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Username Tersebut Telah Digunakan");
      }
      return true;
    }),
    check("email", "Email Yang Anda Masukan Tidak Valid").isEmail(),
    check("telp", "Nomor Yang Anda Masukan Tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit", {
        title: "Edit Contact Page",
        layout: "layouts/main-component",
        errors: errors.array(),
        contact: req.body,
      });
      // return res.status(400).json({ errors: errors.array() });
    } else {
      updateContact(req.body);
      // kirimkan flash message
      req.flash("msg", "Data Contact Berhasil Di Perbaharui");
      res.redirect("/contacts");
    }
  }
);
// halaman detail contact
app.get("/contacts/:nama", (req, res) => {
  const contact = detailContact(req.params.nama);
  res.render("detail", {
    title: "Detail Contact Page",
    layout: "layouts/main-component",
    contact,
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
app.use((req, res) => {
  const inputData = app.set("error", "Alamat URL Tidak Di Ketahui");
  const getData = app.get("error");
  res.send(`<h1>Error : ${getData}</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});
