import { HTMLtoObject } from "@alex_diko/html-to-obj";

document.addEventListener("DOMContentLoaded", function () {
  const textArea = document.getElementById("htmlInput");
  const button = document?.getElementById("button");

  button?.addEventListener("click", function () {
    const result = HTMLtoObject(textArea?.value);
    console.log(result);
  });
});
