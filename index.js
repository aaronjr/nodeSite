const http = require("http");
const path = require("path");
const fs = require("fs");

// craete enviroment port or a backup
const PORT = process.env.PORT || 5000;

// create server instance
const server = http.createServer((req, res) => {
  // create a file path based on the url - check for hom
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "home.html" : req.url + ".html"
  );
  
  // set content type, switch needed for other file types
  let ContentType = "text/html";

  // load file based on search account for errors
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // page not found
      if (err.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": ContentType });
            res.end(content, "utf8");
          }
        );
      } else {
        // server error
        res.writeHead(500);
        res.end("Server error" + err.code);
      }
    } else {
      // load requested site
      res.writeHead(200, { "Content-Type": ContentType });
      res.end(content, "utf8");
    }
  });
});

// listen for activity and confirm in console
server.listen(PORT, () => console.log(`Running on Port: ${PORT}`));
