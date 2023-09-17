/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HTMLtoObject } from "../parser/HTMLtoObject";

export const startScriptBothEnviroment = (): void => {
  if (typeof window === "undefined") {
    const fs = require("fs");
    const fileName = process.argv[2];

    fs.readFile(`./${fileName}`, "utf8", (err, data) => {
      if (err) throw err;
      HTMLtoObject(data);
    });
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      // Your code here
      console.log("DOM has loaded!");
    });

    const textArea: HTMLTextAreaElement = document.getElementById(
      "htmlInput",
    ) as HTMLTextAreaElement;
    const button = document?.getElementById("button");

    button?.addEventListener("click", function () {
      // Your code here
      console.log("DOM has loaded!");
      console.log(HTMLtoObject(textArea?.value));
    });

    console.log("textArea", textArea);
    console.log("textArea", button);
  }
};
