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
      fragment !== "" && arrayFragmens.push(fragment.trim());
    }
    if (html[index] === ">") {
      end = index;
      const fragment = html.slice(start, end + 1);
      fragment !== "" && arrayFragmens.push(fragment.trim());
      amongTextStart = end + 1;
    }
  }

  return arrayFragmens.filter((item) => item !== "");
};

const getAttributes = (fragment: string, result: TNode): void => {
  let finishTagIndex = 0;
  for (let i = 1; i < fragment.length; i++) {
    if (fragment[i] === " " || fragment[i] === ">") {
      result.tag = fragment.slice(1, i).trim();
      finishTagIndex = i;
      break;
    }
  }

  const parameters = fragment.slice(finishTagIndex, fragment.length - 1).trim();

  const attributeMatch = parameters.match(/(\w+)="([^"]*)"/g);
  if (attributeMatch == null) return;

  for (const element of attributeMatch) {
    const splitAttribute = element.split("=");
    const attributeName = splitAttribute[0];
    const attributeValue = splitAttribute[1].replace(/"/g, "");

    if (!attributeValue.includes(";")) result[attributeName] = attributeValue;
    else {
      const object = {};
      const arrayPaitKeyValue = attributeValue
        .split(";")
        .map((i) => i.trim().split(":").flat());

      for (const pair of arrayPaitKeyValue) {
        let key = "";
        if (pair[0].trim().includes("-")) {
          const partOfKey = pair[0].trim().split("-");

          key = `${partOfKey[0]}${partOfKey[1]
            .at(0)
            ?.toUpperCase()}${partOfKey[1].slice(1)}`;
        } else {
          key = pair[0];
        }
        const value = pair[1].trim();

        object[key] = value;
      }
      result[attributeName] = object;
    }
  }

  // return result;
};

const copyOfIterate = (currentFragments, index): [TNode, number] => {
  const result: TNode = {};

  result.tag = currentFragments[index].slice(1, -1);
  getAttributes(currentFragments[index], result);
  index++;
  if (currentFragments[index].startsWith("<") === false) {
    result.text = currentFragments[index];
    index++;
  }
  let nextFragment = currentFragments[index];

  while (nextFragment?.startsWith("<") === true && nextFragment[1] !== "/") {
    if (!Array.isArray(result.children)) result.children = [];

    const [children, childIndex] = copyOfIterate(currentFragments, index);
    result.children.push(children);
    index = childIndex + 1;
    nextFragment = currentFragments[index];
  }

  return [result, index];
};

// const iterate = (currentFragments, index): TNode => {
// const result: TNode = {};
// for (
//   let curFragmenIndex = index;
//   curFragmenIndex < currentFragments.length;
//   curFragmenIndex++
// ) {
//   const fragment = currentFragments[curFragmenIndex];
//   if (fragment[0] !== "<") result.text = fragment;
//   if (fragment.startsWith("<") === true && fragment[1] === "/") {
//     const lastOpendTag = arrayTags.pop();
//     const firstPart = lastOpendTag?.slice(0, 1);
//     const secondPart = lastOpendTag?.slice(1);
//     const newString = firstPart + "/" + secondPart;
//     if (newString === fragment) return result;
//   }
//   if (fragment.startsWith("<") === true && fragment[1] !== "/") {
//     currentFragments.push(fragment);
//     getAttributes(fragment, result);
//     const lastOpendTag = arrayTags.pop();
//     const firstPart = lastOpendTag?.slice(0, 1);
//     const secondPart = lastOpendTag?.slice(1);
//     const newCloseTag = firstPart + "/" + secondPart;
//     if (newCloseTag !== fragment) {
//       // const lol = iterate(currentFragments, index, arrayTags);
//       result.children = [];
//       result.children.push();
//     }
//   }
// }
// return result;
// };

export const HTMLtoObject = (html: string): TNode => {
  const fragments = getFragments(html);

  return copyOfIterate(fragments, 0)[0];
};

const input = `
  <footer style="width: auto; height: 100px; color: blue">
  <span>
  This is the end
  </span>
  </footer>`;
const result = HTMLtoObject(input);
console.log(result);
