export const pluck = (elements: any[], field: string): any[] => {
  return elements.map((el) => el[field]);
};
