import { isDigit } from "../util/helperFunctions.ts";
import { readFile } from "../util/readFile.ts";

const getInputData = () => {
  const { pathname } = new URL("input.txt", import.meta.url);
  return readFile(pathname);
};

const digitsAsString: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const checkIfDigitAsString = (stringToCheck: string) => {
  const digitsAsStrings: string[] = Object.keys(digitsAsString);
  const digitString = digitsAsStrings.find((ds) => ds === stringToCheck.slice(0, ds.length));

  if (digitString) return digitsAsString[digitString];
  return;
};

const getSumOfCalibrationValuesPart1 = () => {
  const data = getInputData();

  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const string = data[i];
    let j = 0;
    let k = string.length - 1;

    let firstDigit;
    let lastDigit;

    while (j <= k && firstDigit === undefined) {
      const char = string[j];
      if (isDigit(char)) {
        firstDigit = char;
      } else {
        j++;
      }
    }

    while (j <= k && lastDigit === undefined) {
      const char = string[k];
      if (isDigit(char)) {
        lastDigit = char;
      } else {
        k--;
      }
    }

    if (firstDigit === undefined || lastDigit === undefined) {
      throw new Error(
        `Oh no, the elves forgot to put calibration values in their instructions, ${string}, ${firstDigit}, ${lastDigit}`
      );
    }

    sum += parseInt(`${firstDigit}${lastDigit}`);
  }

  return sum;
};

const getSumOfCalibrationValuesPart2 = () => {
  const data = getInputData();

  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const string = data[i];
    let j = 0;
    let k = string.length - 1;

    let firstDigit;
    let lastDigit;

    while (j <= k && firstDigit === undefined) {
      const char = string[j];
      if (isDigit(char)) {
        firstDigit = char;
      } else {
        const digitFromString = checkIfDigitAsString(string.slice(j, string.length));
        if (digitFromString) {
          firstDigit = digitFromString;
        }
        j++;
      }
    }

    while (j <= k && lastDigit === undefined) {
      const char = string[k];
      if (isDigit(char)) {
        lastDigit = char;
      } else {
        const digitFromString = checkIfDigitAsString(string.slice(k, string.length));
        if (digitFromString) {
          lastDigit = digitFromString;
        }
        k--;
      }
    }

    if (firstDigit === undefined || lastDigit === undefined) {
      throw new Error(
        `Oh no, the elves forgot to put calibration values in their instructions, ${string}, ${firstDigit}, ${lastDigit}`
      );
    }

    sum += parseInt(`${firstDigit}${lastDigit}`);
  }

  return sum;
};

const sum1 = getSumOfCalibrationValuesPart1();
const sum2 = getSumOfCalibrationValuesPart2();

console.log(`Answer part 1: ${sum1}`);
console.log(`Answer part 2: ${sum2}`);
