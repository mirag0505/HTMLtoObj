interface TNode {
  tag?: string;
  text?: string;
  style?: Record<string, string>;
  id?: string;
  class?: string;
  children?: TNode[];
}

const getFragments = (html): string[] => {
  const arrayFragmens: string[] = [];

  let start = 0;
  let end = 0;
  let amongTextStart = 0;
  let amongTextEnd = 0;

  for (let index = 0; index < html.length; index++) {
    if (html[index] === "<") start = index;
    if (html[index] === "<" && start - 1 >= 0) {
      amongTextEnd = start - 1;
      const fragment = html.slice(amongTextStart, amongTextEnd + 1);
      arrayFragmens.push(fragment.trim());
    }
    if (html[index] === ">") {
      end = index;
      const fragment = html.slice(start, end + 1);
      arrayFragmens.push(fragment);
      amongTextStart = end + 1;
    }
  }

  return arrayFragmens.filter((i) => !!i);
};

export const HTMLtoObject = (html: string): TNode => {
  const fragments = getFragments(html);

  const result: TNode = {};
  const arrayTags: any[] = [];

  fragments.forEach((fragment) => {
    if (fragment[0] === "<" && fragment[1] !== "/") {
      arrayTags.push(fragment);

      let finishTagIndex = 0;
      for (let i = 1; i < fragment.length; i++) {
        if (fragment[i] === " " || fragment[i] === ">") {
          result.tag = fragment.slice(1, i).trim();
          finishTagIndex = i;
          break;
        }
      }

      const parameters = fragment
        .slice(finishTagIndex, fragment.length - 1)
        .trim();

      const attributeMatch = parameters.match(/(\w+)="([^"]*)"/g);
      if (attributeMatch == null) return;

      for (let i = 0; i < attributeMatch.length; i++) {
        const splitAttribute = attributeMatch[i].split("=");
        const attributeName = splitAttribute[0];
        const attributeValue = splitAttribute[1].replace(/"/g, "");

        if (!attributeValue.includes(";"))
          result[attributeName] = attributeValue;
        else {
          const object = {};
          const arrayPaitKeyValue = attributeValue
            .split(";")
            .map((i) => i.trim().split(":").flat());

          for (let i = 0; i < arrayPaitKeyValue.length; i++) {
            let key = "";
            if (arrayPaitKeyValue[i][0].trim().includes("-")) {
              const partOfKey = arrayPaitKeyValue[i][0].trim().split("-");

              key = `${partOfKey[0]}${partOfKey[1]
                .at(0)
                ?.toUpperCase()}${partOfKey[1].slice(1)}`;
            }
            const value = arrayPaitKeyValue[i][1].trim();

            object[key] = value;
          }
          result[attributeName] = object;
        }
      }

      return;
    }

    if (fragment[0] !== "<") {
      result.text = fragment;
    }

    const lastOpendTag = arrayTags[arrayTags.length - 1];

    const firstPart = lastOpendTag.slice(0, 1);
    const secondPart = lastOpendTag.slice(1);

    const newString = firstPart + "/" + secondPart;
    // если они равны -- значит закрылась прошлая скобка
    // if (newString === fragment) {
    // } else {

    //   result.children =
    // }
  });

  arrayTags;
  return result;
};

// const html = `<div style="background-color: yellow; font-size: 14px" id="first-div">
// Hello, friends
// <p class="para" style="font-family: monospace; font-size: 11px">
// Lorem ipsum dolor sit
// </p>
// <footer style="width: auto; height: 100px; color: blue">
// <span>
// This is the end
// </span>
// </footer>
// </div>`;

// HTMLtoObject("<div>CAT</div>");

// const inputHard = `<div style="background-color: yellow; font-size: 14px" id="first-div"> Hello, friends </div>`;
// HTMLtoObject(inputHard);

const input = "<div> Hello, friends <p> Kek! kek! </p></div>";
HTMLtoObject(input);
