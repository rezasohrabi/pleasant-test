export const findByAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};
