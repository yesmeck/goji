import cssstyle from 'cssstyle';

export const stringifyCssText = (styleObject: object): string => {
  let cssText = '';
  const style = new cssstyle.CSSStyleDeclaration(newCssText => {
    cssText = newCssText;
  })
  Object.assign(style, styleObject);

  return cssText;
}
