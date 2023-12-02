import { readFile } from "../util/readFile.ts";

const getInputData = () => {
  const { pathname } = new URL("input.txt", import.meta.url);
  return readFile(pathname);
};
