const { debug } = require("./contact");
const yargs = require("yargs");

yargs.command({
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
});

yargs.parse();
