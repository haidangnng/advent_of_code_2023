const getDict = (game: string): Record<string, number> => {
  const numRe = /\d+[^:]|(?=(red|green|blue))/g;

  const matches = Array.from(game.matchAll(numRe) || [], (x) => x[0] || x[1]);
  const data = matches.reduce(
    (a, c, i) => {
      const current = parseInt(c);

      if (!isNaN(current)) {
        if (a[`${matches[i + 1]}`] < current) {
          return {
            ...a,
            [`${matches[i + 1]}`]: current,
          };
        }
      }
      return a;
    },
    {
      red: 0,
      green: 0,
      blue: 0,
    },
  );

  return data;
};

const partOne = (fileLines: string[]) => {
  let total: number = 0;

  for (const line of fileLines) {
    let gameId = parseInt(Array.from(line.match(/\d+/g))[0], 10);
    const currentGameValue = getDict(line);

    Object.keys(currentGameValue).map((i) => {
      switch (i) {
        case "red":
          if (currentGameValue[i] > 12) {
            gameId = 0;
          }
          break;
        case "green":
          if (currentGameValue[i] > 13) {
            gameId = 0;
          }
          break;
        case "blue":
          if (currentGameValue[i] > 14) {
            gameId = 0;
          }
          break;
      }
    });

    total += gameId;
  }
  console.log("total", total);
};

const partTwo = (fileLines: string[]) => {
  const total = fileLines.reduce(
    (total, line) =>
      total + Object.values(getDict(line)).reduce((a, c) => a * c, 1),
    0,
  );

  console.log("total", total);
};

export { partOne, partTwo };
