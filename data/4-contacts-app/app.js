const { askOne, debug } = require("./contact");
// const result = require("./contact");

// main func
const main = async () => {
  const nama = await askOne("siapa nama anda ?");
  const email = await askOne("siapa email anda ?");
  const telp = await askOne("berapa nomor hp anda ?");

  debug(nama, email, telp);
};

main();
