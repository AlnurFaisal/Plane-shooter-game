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
  console.log("a: ", a);
  console.log("b :", b);
  return a === b;
};

const firstRow = [1, 2, 3, 4, 5, 6, 7];
const secondRow = [8, 9, 10, 11, 12, 13, 14];
const thirdRow = [15, 16, 17, 18, 19, 20, 21];
const forthRow = [22, 23, 24, 25, 26, 27, 28];
const fifthRow = [29, 30, 31, 32, 33, 34, 35];

const checkWhichRow = element => {
  if (firstRow.includes(element)) {
    return "first";
  } else if (secondRow.includes(element)) {
    return "second";
  } else if (thirdRow.includes(element)) {
    return "third";
  } else if (forthRow.includes(element)) {
    return "forth";
  } else if (fifthRow.includes(element)) {
    return "fifth";
  }
};

const setDirection = (setRow, directionList, alienIndex, newDirection) => {
  if (setRow === "first") {
    newDirection[alienIndex] = directionList[0];
  } else if (setRow === "second") {
    newDirection[alienIndex] = directionList[1];
  } else if (setRow === "third") {
    newDirection[alienIndex] = directionList[2];
  } else if (setRow === "forth") {
    newDirection[alienIndex] = directionList[3];
  } else if (setRow === "fifth") {
    newDirection[alienIndex] = directionList[4];
  }
  return newDirection;
};

export const sortArray = arr => {
  return arr.sort(compare);
};

export const assignDirection = (alienList, randomDirectionList) => {
  let mapAlienDirection = null;
  let storeTempDirection = {};
  let storeRow = null;
  for (let i = 0; i < alienList.length; i++) {
    storeRow = checkWhichRow(alienList[i]);
    mapAlienDirection = setDirection(
      storeRow,
      randomDirectionList,
      alienList[i],
      storeTempDirection
    );
    Object.assign(storeTempDirection, mapAlienDirection);
  }
  return storeTempDirection;
};

export const randomizedDirection = numOfRows => {
  let i = 0;
  let arr = [];
  let randomNum = null;
  const direction = ["left", "right"];
  while (i < numOfRows) {
    randomNum = Math.floor(Math.random() * (direction.length - 1 - 0 + 1)) + 0;
    arr.push(direction[randomNum]);
    i++;
  }
  console.log("direction_array: ", arr);
  return arr;
};

export const fixDuplicate = arr => {
  let i = 0;
  let counter = 0;
  let copyArr = [...arr];
  const maxCount = arr.length;
  while (i < maxCount) {
    if (i === 0) {
      i += 1;
      continue;
    }
    if (findDuplicates(arr[i], arr[i - 1])) {
      let removed = copyArr.splice(i - counter, 1);
      counter++;
      console.log(`Removed ${removed} from aliens array.`);
    }
    i += 1;
  }
  return copyArr;
};
