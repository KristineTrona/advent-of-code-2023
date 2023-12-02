import { readFileSync } from "fs";
import path from "path";

export function readFile(fileName: string) {
  const contents = readFileSync(path.resolve(fileName), "utf-8");
  return contents.split(/\r?\n/);
}
