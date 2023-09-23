type HTMLObject = {
  tag?: string;
  text?: string;
  style?: Record<string, string>;
  id?: string;
  class?: string;
  children?: HTMLObject[];
};

const getFragments = (html: string): string[] => {
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

const getFinishTagIndex = (fragment: string, result: HTMLObject) => {
  for (let i = 1; i < fragment.length; i++) {
    if (fragment[i] === " " || fragment[i] === ">") {
      result.tag = fragment.slice(1, i).trim();
      return i;
    }
  }
};

const addAttributeToResult = (
  attributeMatch: RegExpMatchArray,
  result: HTMLObject
) => {
  for (const element of attributeMatch) {
    const splitAttribute = element.split("=");
    const attributeName = splitAttribute[0];
    const attributeValue = splitAttribute[1].replace(/"/g, "");

    if (!attributeValue.includes(";"))
      (result as Record<string, any>)[attributeName] = attributeValue;
    else {
      const object: HTMLObject = <HTMLObject>{};
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

        (object as Record<string, any>)[key] = value;
      }
      (result as Record<string, any>)[attributeName] = object;
    }
  }
};

const getAttributes = (fragment: string, result: HTMLObject): void => {
  let finishTagIndex = getFinishTagIndex(fragment, result);

  const parameters = fragment.slice(finishTagIndex, fragment.length - 1).trim();

  const attributeMatch = parameters.match(/(\w+)="([^"]*)"/g);
  if (attributeMatch === null) return;
  addAttributeToResult(attributeMatch, result);
};

const recurcionIterator = (
  currentFragments: string[],
  index: number
): [HTMLObject, number] => {
  const result: HTMLObject = {};

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

    const [children, childIndex] = recurcionIterator(currentFragments, index);
    result.children.push(children);
    index = childIndex + 1;
    nextFragment = currentFragments[index];
  }

  return [result, index];
};

export const HTMLtoObject = (html: string): HTMLObject => {
  if (!html) return <HTMLObject>{};

  const fragments = getFragments(html);

  const result = recurcionIterator(fragments, 0)[0];
  console.log(result);
  console.log(JSON.stringify(result));
  return result;
};
