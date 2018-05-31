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

/**
 * Checks the passed array for the passed element.
 * If element is found it removes it.
 * If element is not found it adds it to the end of the array.
 * @param {Array} array simple array
 * @param {any} element any value that could be in the passed array
 * @return {Array} passed array with either removed or added element
 */
export const toggleElementInArray = (array, element) => {
  const index = array.indexOf(element);
  if (index === -1) {
    return [...array, element];
  }
  const newArray = array.slice(0, index).concat(array.slice(index + 1));
  return newArray;
};
