const partOne = (fileLines: string[]) => {
  const time: number[] = fileLines[0]
    .split(":")[1]
    .split(" ")
    .filter((x) => x)
    .map((x) => +x);
  const distance: number[] = fileLines[1]
    .split(":")[1]
    .split(" ")
    .filter((x) => x)
    .map((x) => +x);

  const res = time.reduce((a, c, i) => {
    let count: number = 0;
    for (let x = 0; x < c; x++) {
      if (x * (c - x) > distance[i]) {
        console.log(x);
        count++;
      }
    }
    return a * count;
  }, 1);

  console.log("res", res);
};

const partTwo = (fileLines: string[]) => {
  const time: number = +fileLines[0]
    .split(":")[1]
    .split(" ")
    .filter((x) => x)
    .map((x) => +x)
    .join("");
  const distance: number = +fileLines[1]
    .split(":")[1]
    .split(" ")
    .filter((x) => x)
    .map((x) => +x)
    .join("");

  let count: number = 0;
  for (let x = 0; x < time; x++) {
    if (x * (time - x) > distance) {
      console.log(x);
      count++;
    }
  }

  console.log("res", count);
};

export { partOne, partTwo };
