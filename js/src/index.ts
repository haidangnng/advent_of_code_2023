/* eslint-disable @typescript-eslint/no-unused-vars */
import { partOne, partTwo } from "./day_8";
import { readLines } from "./utils";

const execute = async () => {
  const now = new Date();
  await readLines({
    path: "../data/day_8.txt",
    callback: partTwo,
  });

  const then = new Date();
  console.log("benchmark", then.getTime() - now.getTime());
};

execute();
