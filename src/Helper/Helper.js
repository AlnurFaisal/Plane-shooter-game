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
      maxNum = maxNumber - 4 * 7;
      minNum = 0 * 7 + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= 5 && i > 2) {
      maxNum = maxNumber - 3 * 7;
      minNum = 1 * 7 + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= 8 && i > 5) {
      maxNum = maxNumber - 2 * 7;
      minNum = 2 * 7 + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= 11 && i > 8) {
      maxNum = maxNumber - 1 * 7;
      minNum = 3 * 7 + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    } else if (i <= length - 1 && i > 11) {
      maxNum = maxNumber - 0 * 7;
      minNum = 4 * 7 + 1;
      min = Math.ceil(minNum);
      max = Math.floor(maxNum);
    }
    tempNum = Math.floor(Math.random() * (max - min + 1)) + min;
    arr.push(tempNum);
  }
  return arr;
};

const compare = (a, b) => {
  let comparison = 0;
  if (a > b) {
    comparison = 1;
  } else if (a < b) {
    comparison = -1;
  }
  return comparison;
};

const findDuplicates = (a, b) => {
  return a === b;
};

export const sortArray = arr => {
  return arr.sort(compare);
};

export const fixDuplicate = arr => {
  let i = 0;
  let copyArr = [...arr];
  const maxCount = arr.length;
  console.log("array: ", copyArr);
  while (i < maxCount) {
    if (i === 0) {
      i += 1;
      continue;
    }
    if (findDuplicates(arr[i], arr[i - 1])) {
      let removed = copyArr.splice(i, 1);
      console.log(`Removed ${removed} from aliens array.`);
    }
    i += 1;
  }
  return copyArr;
};
