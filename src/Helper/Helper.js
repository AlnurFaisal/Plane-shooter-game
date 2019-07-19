export const generateArray = maxNumber => {
  const arr = [];
  for (let i = 1; i <= maxNumber; i++) {
    arr.push(i);
  }
  return arr;
};

export const randomizedArray = (length, maxNumber) => {
  const arr = [];
  let max = null;
  let min = null;
  let tempNum = null;
  let maxNum = null;
  let minNum = null;
  for (let i = 0; i < length; i++) {
    if (i <= 2) {
      maxNum = maxNumber - (4 * 7);
      minNum = (0 * 7) + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= 5 && i > 2) {
      maxNum = maxNumber - (3 * 7);
      minNum = (1 * 7) + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= 8 && i > 5) {
      maxNum = maxNumber - (2 * 7);
      minNum = (2 * 7) + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= 11 && i > 8) {
      maxNum = maxNumber - (1 * 7);
      minNum = (3 * 7) + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= length - 1 && i > 11) {
      maxNum = maxNumber - (0 * 7);
      minNum = (4 * 7) + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    }
    tempNum = Math.floor(Math.random() * (max - min + 1)) + min;
    arr.push(tempNum);
  }
  return arr;
};
