import { HTMLtoObject } from "../parser/HTMLtoObject";

export const startScriptBothEnviroment = (): void => {
  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const http = require("http");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require("fs");

    // Get the file name from command-line arguments
    const fileName = process.argv[2];

    const server = http.createServer((req, res) => {
      fs.readFile(fileName, "utf8", (err: unknown, data) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
          res.writeHead(404);
          res.end("File not found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
          console.log(HTMLtoObject(data));
        }
      });
    });

    server.listen(3000, () => {
      console.log(
        `Server running on http://localhost:3000/ and serving ${fileName}`
      );
    });
  } else {
    // const htmlString = document.getElementById("htmlInput").value;
  }
};
