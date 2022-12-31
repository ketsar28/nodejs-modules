const http = require("node:http");
const fs = require("node:fs");
const chalk = require("chalk");
const port = 3000;

const access = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("error: file not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    // merubah plain text menjadi format html
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const url = req.url;
    // == --switch-- ==
    // console.log(url);

    // //   cek url & menkoneksikan file entry point dengan file lain
    // switch (url) {
    //   case "/home":
    //     access("./home.html", res);
    //     break;
    //   case "/about":
    //     access("./about.html", res);
    //     break;
    //   default:
    //     access("./index.html", res);
    //     break;
    // }

    // === --if..else..if..else-- ===
    if (url === "/about") {
      access("./about.html", res);
    } else if (url === "/home") {
      access("./home.html", res);
    } else {
      access("./index.html", res);
    }

    // res.end();
  })
  .listen(port, () => {
    console.log(chalk.bgGreen.bold(`Server has been active at ${port}...`));
  });
