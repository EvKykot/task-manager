import _ from 'lodash';

export const newNotesDataAfterDeleteNote = (startArr, id) => {
  let newArr, bef, aft;
  const elemIndex = startArr.findIndex(el => el._id === id);
  if (elemIndex !== -1) {
    bef = startArr.slice(0, elemIndex);
    aft = startArr.slice(elemIndex + 1);
    newArr = [...bef, ...aft];
  } else {
    newArr = startArr;
  }
  return newArr;
};

export const noteInCorrection = (arr, id) => {
  return arr[ _.findIndex(arr, (elem) => elem._id ==  id) ];
};

export const updateNote = (arr, updateElem) => {
  let updateArr, index;
  updateArr = arr;
  index = _.findIndex(arr, (elem) => elem._id === updateElem._id);
  updateArr[index] = updateElem;
  console.log(updateArr);
  return updateArr;
};
