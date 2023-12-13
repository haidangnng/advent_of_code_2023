const ranking: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const sortRanking = (
  prev: Record<string, number>,
  next: Record<string, number>,
) => {
  const prevHand = Object.keys(prev)[0];
  const nextHand = Object.keys(next)[0];
  const prevSort = prevHand.split("").sort().join("");
  const nextSort = nextHand.split("").sort().join("");
  const prevGroup = prevSort.match(/(.)\1*/g);
  const nextGroup = nextSort.match(/(.)\1*/g);
  if (prevGroup.length > nextGroup.length) {
    return -1;
  } else if (prevGroup.length < nextGroup.length) {
    return 1;
  } else {
    // 2 pairs and 3 of a kind
    const nextMax = nextGroup.reduce(
      (a, c) => (c.length > a ? c.length : a),
      1,
    );
    const prevMax = prevGroup.reduce(
      (a, c) => (c.length > a ? c.length : a),
      1,
    );
    if (prevMax > nextMax) {
      return 1;
    } else if (prevMax < nextMax) {
      return -1;
    } else {
      for (let i = 0; i < prevHand.length; i++) {
        if (nextHand[i] === prevHand[i]) {
          continue;
        }
        if (ranking[`${nextHand[i]}`] > ranking[`${prevHand[i]}`]) {
          return -1;
        } else {
          return 1;
        }
      }
    }
  }
};

const partOne = (fileLines: string[]) => {
  const sort: Record<string, number>[] = [];

  for (const line of fileLines) {
    const [hand, bid] = line.split(" ").map((x) => (isNaN(+x) ? x : +x));
    sort.push({ [`${hand}`]: +bid });
  }
  sort.sort(sortRanking);
  const res = sort.reduce((a, c, i) => {
    return a + Object.values(c)[0] * (i + 1);
  }, 0);
  console.log("res", res);
};

const partTwo = (fileLines: string[]) => {};

export { partOne, partTwo };
