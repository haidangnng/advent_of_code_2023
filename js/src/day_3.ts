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

const findNumber = (x: RegExpMatchArray, adjacent: number[]) => {
  for (let k = x.index; k < x.index + x[0].length; k++) {
    if (adjacent.includes(k)) {
      return true;
    }
  }
  return false;
};

const partTwo = (fileLines: string[]) => {
  let total: number = 0;

  for (let i = 0; i < fileLines.length; i++) {
    const line = fileLines[i];
    const matches = Array.from(line.matchAll(/(?<gear>[*])/g));

    matches.map((c) => {
      const adjacent = [c.index - 1, c.index + 1, c.index];
      const surround = [
        ...(Array.from(fileLines[i - 1].matchAll(/(?<number>\d+)/g)).filter(
          (x) => findNumber(x, adjacent),
        ) || []),

        ...(Array.from(fileLines[i].matchAll(/(?<number>\d+)/g)).filter((x) =>
          findNumber(x, adjacent),
        ) || []),
        ...(Array.from(fileLines[i + 1].matchAll(/(?<number>\d+)/g)).filter(
          (x) => findNumber(x, adjacent),
        ) || []),
      ].map((x) => parseInt(x[0]));
      if (surround.length == 2) {
        total += surround.reduce((a, c) => a * c, 1);
      }
    });
  }

  console.log("total", total);
};

export { partOne, partTwo };
