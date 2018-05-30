/**
 *
 * @param {Array<String>} modifiers BEM syntax modifiers
 * @param {String} block BEM block
 * @return {String} "block--modifier block--modifier ..." for every modifier in array
 */
export const useModifierWithBlock = (block, modifiers = []) => {
  const className = modifiers.reduce(
    (accumulator, modifier) => `${accumulator} ${block}--${modifier}`,
    block
  );
  return className;
};
