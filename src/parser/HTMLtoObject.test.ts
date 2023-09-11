import { HTMLtoObject } from "./HTMLtoObject";

test("HTMLtoObject easy mode", () => {
  const result = HTMLtoObject("<div>CAT</div>");
  expect(result).toEqual({
    tag: "div",
    text: "CAT",
  });
});

test("HTMLtoObject flat mode", () => {
  const input = `<div style="background-color: yellow; font-size: 14px" id="first-div"> Hello, friends </div>`;
  const result = HTMLtoObject(input);
  expect(result).toEqual({
    tag: "div",
    text: "Hello, friends",
    style: {
      backgroundColor: "yellow",
      fontSize: "14px",
    },
    id: "first-div",
  });
});

test("HTMLtoObject recurcive mode without attribute", () => {
  const input = `<div> Hello, friends <p> Kek! kek! </p></div>`;
  const result = HTMLtoObject(input);
  expect(result).toEqual({
    tag: "div",
    text: "Hello, friends",
    children: [{ tag: "p", text: "Kek! kek!" }],
  });
});

test("HTMLtoObject recurcive mode", () => {
  const input = `<div style="background-color: yellow; font-size: 14px" id="first-div">
    Hello, friends
    <p class="para" style="font-faimly: monospace; font-size: 11px">
    Lorem ipsum dolor sit
    </p>
    <footer style="width: auto; height: 100px; color: blue">
    <span>
    This is the end
    </span>
    </footer>
    </div>`;

  const result = HTMLtoObject(input);
  expect(result).toEqual({
    tag: "div",
    text: "Hello, friends",
    style: {
      backgroundColor: "yellow",
      fontSize: "14px",
    },
    id: "first-div",
    children: [
      {
        tag: "p",
        text: "Lorem ipsum dolor sit",
        class: "para",
        style: {
          fontFamily: "monospace",
          fontSize: "11px",
        },
      },
      {
        tag: "footer",
        style: {
          width: "auto",
          height: "100px",
          color: "blue",
        },
        children: [{ tag: "span", text: "This is the end" }],
      },
    ],
  });
});
