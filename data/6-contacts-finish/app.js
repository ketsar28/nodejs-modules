const { debug, viewAll, detailContact, dropContact } = require("./contact");
const yargs = require("yargs");

// menambahkan data kontak
yargs
  .command({
    command: "add",
    description: "menambahkan data kontak",
    builder: {
      nama: {
        describe: "menambahkan nama",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "menambahkan email",
        demandOption: true,
        type: "string",
      },
      telp: {
        describe: "menambahkan no hp",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      // const data = {
      //   nama: argv.nama,
      //   email: argv.email,
      //   telp: argv.telp,
      // };
      // console.log(data);
      debug(argv.nama, argv.email, argv.telp);
    },
  })
  .demandCommand();

// menampilkan seluruh data kontak
yargs.command({
  command: "list",
  description: "menampilkan seluruh data kontak",
  handler() {
    viewAll();
  },
});

// menampilkan detail data kontak berdasarkan nama
yargs.command({
  command: "detail",
  description: "menampilkan detail data kontak berdasarkan nama",
  handler(argv) {
    detailContact(argv.nama, argv.email, argv.telp);
  },
});

// menghapus data kontak berdasarkan nama
yargs.command({
  command: "drop",
  description: "menghapus data kontak berdasarkan nama",
  handler(argv) {
    dropContact(argv.nama, argv.email, argv.telp);
  },
});

yargs.parse();
