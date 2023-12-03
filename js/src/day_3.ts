const isSymbol = (fileLines: string[], position: [number, number]): boolean => {
  const [x, y] = position;
  if (
    x < 0 ||
    x > fileLines.length - 1 ||
    y < 0 ||
    y > fileLines[x].length - 1
  ) {
    return false;
  }
  const symRegex = new RegExp(/(?<symbol>[^A-Za-z0-9.\n])/g);
  return symRegex.test(fileLines[position[0]][position[1]]);
};

const isNumber = (fileLines: string[], position: [number, number]): boolean => {
  const [x, y] = position;
  if (
    x < 0 ||
    x > fileLines.length - 1 ||
    y < 0 ||
    y > fileLines[x].length - 1
  ) {
    return false;
  }
  const symRegex = new RegExp(/(?<number>\d+)/g);
  return symRegex.test(fileLines[position[0]][position[1]]);
};

const partOne = (fileLines: string[]) => {
  let total: number = 0;

  for (let i = 0; i < fileLines.length; i++) {
    const line = fileLines[i];
    const matches = Array.from(line.matchAll(/(?<symbol>\d+)/g));

    matches.map((match) => {
      let adjacentPos: [number, number][] = [];

      for (let j = match.index; j < match.index + match[0].length; j++) {
        adjacentPos = adjacentPos.concat([
          [i - 1, j - 1],
          [i + 1, j - 1],
          [i, j - 1],
          [i - 1, j],
          [i + 1, j],
          [i - 1, j + 1],
          [i + 1, j + 1],
          [i, j + 1],
        ]);
      }

      for (const cell of adjacentPos) {
        if (isSymbol(fileLines, cell)) {
          total += parseInt(match[0], 10);
          break;
        }
      }
    });
  }
  console.log("total", total);
};

const partTwo = (fileLines: string[]) => {
  return;
};

export { partOne, partTwo };
