const { HTMLtoObject } = require("@alex_diko/html-to-obj");

if (typeof window === "undefined") {
  const fs = require("fs");
  const fileName = process.argv[2];

  fs.readFile(`./${fileName}`, "utf8", (err, data) => {
    if (err) throw err;
    HTMLtoObject(data);
  });
}
