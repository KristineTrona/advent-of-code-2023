import { isDigit } from "../util/helperFunctions.ts";
import { readFile } from "../util/readFile.ts";

const getInputData = () => {
  const { pathname } = new URL("input.txt", import.meta.url);
  return readFile(pathname);
};

const isSymbol = (char: string) => {
  return !isDigit(char) && char !== ".";
};

const isAdjacentToSymbol = (
  previLineSubset: string,
  currentLineSubset: string,
  nextLineSubset: string
) => {
  // Check for symbols on the same line
  if (isSymbol(currentLineSubset[0]) || isSymbol(currentLineSubset[currentLineSubset.length - 1])) {
    return true;
  } else if (previLineSubset && Array.from(previLineSubset).some((char) => isSymbol(char))) {
    return true;
  } else if (nextLineSubset && Array.from(nextLineSubset).some((char) => isSymbol(char))) {
    return true;
  } else {
    return false;
  }
};

const getAdjacentNumbersSameLine = (string: string, starIndex: number) => {
  const adjacentNumbers = [];
  // Same line before - if string starts with a digit, find the number before *
  if (isDigit(string[starIndex - 1])) {
    let tempNumber = "";
    for (let i = starIndex - 1; i >= 0; i--) {
      const isCurrDigit = isDigit(string[i]);
      if (isCurrDigit) {
        tempNumber = `${string[i]}${tempNumber}`;
      }

      if (!isCurrDigit || i === 0) {
        adjacentNumbers.push(tempNumber);
        break;
      }
    }
  }

  // Same line after *
  if (isDigit(string[starIndex + 1])) {
    let tempNumber = "";
    for (let i = starIndex + 1; i < string.length; i++) {
      const isCurrDigit = isDigit(string[i]);
      if (isCurrDigit) {
        tempNumber += string[i];
      }

      if (!isCurrDigit || i === string.length - 1) {
        adjacentNumbers.push(tempNumber);
        break;
      }
    }
  }
  return adjacentNumbers;
};

const getAdjacentNumbersPrevOrNextLine = (string: string, starIndex: number) => {
  const adjacentNumbers = [];
  const stringSubset = string ? string.slice(Math.max(starIndex - 1, 0), starIndex + 2) : [];

  if (string && Array.from(stringSubset).some((char) => isDigit(char))) {
    let tempNumber = "";
    // If first char is digit look for digits backwards
    if (isDigit(stringSubset[0])) {
      for (let i = starIndex - 1; i >= 0; i--) {
        if (isDigit(string[i])) {
          tempNumber = `${string[i]}${tempNumber}`;
        } else {
          break;
        }
      }
    }

    // Also look for any digits after the first subset char
    for (let i = starIndex; i < string.length; i++) {
      // If we have reached the end of adjacent subset and there is no current tempNumber - stop
      if (!tempNumber && i > starIndex + 1) {
        break;
      }
      const char = string[i];
      if (isDigit(char)) {
        tempNumber += char;
      } else if (tempNumber) {
        adjacentNumbers.push(tempNumber);
        tempNumber = "";
      }
    }
    if (tempNumber) {
      adjacentNumbers.push(tempNumber);
    }
  }
  return adjacentNumbers;
};

const getAdjacentNumbers = (
  starIndex: number,
  previousLine: string,
  currentLine: string,
  nextLine: string
) => {
  return [
    ...getAdjacentNumbersSameLine(currentLine, starIndex),
    ...getAdjacentNumbersPrevOrNextLine(previousLine, starIndex),
    ...getAdjacentNumbersPrevOrNextLine(nextLine, starIndex),
  ];
};

const getAnswerPart1 = () => {
  const data: string[] = getInputData();
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const string = data[i];

    let tempNumber = "";
    let numberStartIndex;
    let numberEndIndex;

    for (let j = 0; j < string.length; j++) {
      const char = string[j];

      if (isDigit(char)) {
        if (!numberStartIndex) {
          numberStartIndex = j;
        }
        tempNumber += char;
      }

      if (!isDigit(char) || j === string.length - 1) {
        // We have just reached the first non digit char following a number
        if (numberStartIndex) {
          numberEndIndex = j - 1;
        }
        if (numberStartIndex && numberEndIndex) {
          if (
            isAdjacentToSymbol(
              data[i - 1]?.slice(numberStartIndex - 1, numberEndIndex + 2),
              string.slice(numberStartIndex - 1, numberEndIndex + 2),
              data[i + 1]?.slice(numberStartIndex - 1, numberEndIndex + 2)
            )
          ) {
            sum += parseInt(tempNumber);
          }

          // Reset values
          tempNumber = "";
          numberStartIndex = undefined;
          numberEndIndex = undefined;
        }
      }
    }
  }
  return sum;
};

getAnswerPart1();

const getAnswerPart2 = () => {
  const data: string[] = getInputData();
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const string = data[i];
    for (let j = 0; j < string.length; j++) {
      const char = string[j];
      if (char === "*") {
        const adjacentNumbers = getAdjacentNumbers(j, data[i - 1], string, data[i + 1]);
        if (adjacentNumbers.length === 2) {
          sum += parseInt(adjacentNumbers[0]) * parseInt(adjacentNumbers[1]);
        }
      }
    }
  }
  return sum;
};

console.log(`Answer part 1: ${getAnswerPart1()}`);
console.log(`Answer part 2: ${getAnswerPart2()}`);
