import { HTMLtoObject } from "../parser/HTMLtoObject";

export const startScriptBothEnviroment = (): void => {
  if (typeof window === "undefined") {
    const fs = require("fs");
    const fileName = process.argv[2];

    fs.readFile(
      `./${fileName}`,
      "utf8",
      (err: NodeJS.ErrnoException, data: string) => {
        if (err) throw err;
        HTMLtoObject(data);
      }
    );
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      console.log("DOM has loaded!");
    });

    const textArea: HTMLTextAreaElement = document.getElementById(
      "htmlInput"
    ) as HTMLTextAreaElement;
    const button = document?.getElementById("button");

    button?.addEventListener("click", function () {
      console.log("DOM has loaded!");
      console.log(HTMLtoObject(textArea?.value));
    });
  }
};
