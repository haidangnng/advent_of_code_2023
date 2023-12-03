const parseNumber = (i: string): number => {
  const dict = {
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
  return parseInt(i) || parseInt(dict[i]);
};

const partOne = (fileLines: string[]) => {
  const numRe = /\d/g;
  let total: number = 0;
  for (const line of fileLines) {
    const matches = Array.from(line.match(numRe));
    const num: number =
      parseInt(matches[0], 10) * 10 + parseInt(matches[matches.length - 1]);
    total += num;
  }

  console.log("total", total);
};

const partTwo = (fileLines: string[]) => {
  const numRe = /\d|(?=(one|two|three|four|five|six|seven|eight|nine))/g;
  let total: number = 0;

  for (const line of fileLines) {
    const matches = Array.from(line.matchAll(numRe), (x) => x[0] || x[1]);
    const num: number =
      parseNumber(matches[0]) * 10 + parseNumber(matches[matches.length - 1]);
    total += num;
  }

  console.log("total", total);
};

export { partOne, partTwo };
