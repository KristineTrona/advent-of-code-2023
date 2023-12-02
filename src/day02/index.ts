import { readFile } from "../util/readFile.ts";

const getInputData = () => {
  const { pathname } = new URL("input.txt", import.meta.url);
  return readFile(pathname);
};

type MaxCubesPerColorPerGame = {
  green: number;
  red: number;
  blue: number;
};

const colors = ["red", "green", "blue"];

const getMaxCubesPerColorPerGame = (gameResult: string) => {
  const splitInput = gameResult.split(":");
  const gameId = splitInput[0]?.replace("Game ", "");

  let green = 0;
  let red = 0;
  let blue = 0;

  // Find max possible number of cubes for each color
  splitInput[1]?.split(";").forEach((game) => {
    game.split(",").forEach((colorResult) => {
      const digitString = colorResult.match(/\d+/)?.[0];
      const digit = digitString ? parseInt(digitString) : 0;
      const color = colors.find((color) => colorResult.includes(color));

      if (color === "green" && digit > green) {
        green = digit;
      } else if (color === "red" && digit > red) {
        red = digit;
      } else if (color === "blue" && digit > blue) {
        blue = digit;
      }
    });
  });

  return { gameId, green, red, blue };
};

const getGameResults = () => {
  const data: string[] = getInputData();

  const maxCubesPerColorPerGame = data.reduce((acc, curr) => {
    const { gameId, green, red, blue } = getMaxCubesPerColorPerGame(curr);

    acc[gameId] = {
      green,
      red,
      blue,
    };
    return acc;
  }, {} as { [key: string]: MaxCubesPerColorPerGame });

  let sumIdsPart1 = 0;
  let sumOfGamePowersPart2 = 0;

  // Max allowed values of each color for part 1
  const maxGreen = 13;
  const maxRed = 12;
  const maxBlue = 14;

  for (const [key, value] of Object.entries(maxCubesPerColorPerGame)) {
    // Part 1
    if (value.green <= maxGreen && value.red <= maxRed && value.blue <= maxBlue) {
      sumIdsPart1 += parseInt(key);
    }
    // Part 2
    const gamePower = value.green * value.blue * value.red;
    sumOfGamePowersPart2 += gamePower;
  }
  return { sumIdsPart1, sumOfGamePowersPart2 };
};

const { sumIdsPart1, sumOfGamePowersPart2 } = getGameResults();
console.log(`Answer part 1: ${sumIdsPart1}`);
console.log(`Answer part 2: ${sumOfGamePowersPart2}`);
