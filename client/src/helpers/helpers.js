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

/**
 * Checks the passed array if it has object with passed id.
 * If object is found it removes it.
 * If object is not found it adds it to the end of the array with the passed id and default empty string value.
 * @param {Array} array containing objects {id: number, value: string}
 * @param {Number} id id of the object
 * @return {Array} passed array with either removed or added object
 */
export const toggleObjectsInArray = (array, id) => {
  let index;
  array.forEach((element, _index) => {
    if (id === element.id) {
      index = _index;
    }
  });
  if (index === undefined) {
    return [...array, { id: id, value: "" }];
  }
  return array.slice(0, index).concat(array.slice(index + 1));
};

export const objectWithIdInArray = (array, id) => {
  let index;
  array.forEach((element, _index) => {
    if (id === element.id) {
      index = _index;
    }
  });
  if (index === undefined) {
    return -1;
  } else {
    return index;
  }
};

/**
 * Checks the passed array if it has object with passed id.
 * If object is found it changes it's value to passed newValue.
 * If object is not found it returns passed array with no changes.
 * @param {Array} array containing objects {id: number, value: string}
 * @param {Number} id id of the object
 * @param {String} newValue the new value to which it should change
 * @return {Array} passed array either in same state or with changed object with passed id
 */
export const changeValueInArrayOfObjects = (array, id, newValue) => {
  let index;
  array.forEach((element, _index) => {
    if (id === element.id) {
      index = _index;
    }
  });
  if (index === undefined) {
    return array;
  }
  array[index] = { id: id, value: newValue };
  return array;
};

/**
 *
 * @param {Array} array
 * @param {Number} index integer index of array
 * @return {Array} passed array without element at passed index
 */
export const removeElementFromArray = (array, index) => {
  return array.slice(0, index).concat(array.slice(index + 1));
};
