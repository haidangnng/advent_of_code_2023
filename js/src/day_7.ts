const ranking: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 0,
  Q: 12,
  K: 13,
  A: 14,
};

const sortRanking = (
  prev: Record<string, string>,
  next: Record<string, string>,
  isPartTwo?: boolean,
) => {
  const prevHand = isPartTwo ? prev.parsed : prev.hand;
  const nextHand = isPartTwo ? next.parsed : next.hand;
  const prevSort = prevHand.split("").sort().join("");
  const nextSort = nextHand.split("").sort().join("");
  const prevGroup = prevSort.match(/(.)\1*/g);
  const nextGroup = nextSort.match(/(.)\1*/g);
  if (prevGroup.length > nextGroup.length) {
    return -1;
  } else if (prevGroup.length < nextGroup.length) {
    return 1;
  } else {
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
        const prevComp = prev.hand;
        const nextComp = next.hand;
        if (nextComp[i] === prevComp[i]) {
          continue;
        }
        if (ranking[`${nextComp[i]}`] > ranking[`${prevComp[i]}`]) {
          return -1;
        } else {
          return 1;
        }
      }
    }
  }
};

const partOne = (fileLines: string[]) => {
  const sort: Record<string, string>[] = [];

  for (const line of fileLines) {
    const [hand, bid] = line.split(" ");
    sort.push({
      hand,
      bid,
    });
  }
  sort.sort(sortRanking);
  const res = sort.reduce((a, c, i) => {
    return a + +c.bid * (i + 1);
  }, 0);
  console.log("res", res);
};

const parseHand = (hand: string): string => {
  if (hand === "JJJJJ") return "11111";
  const handSort = hand.split("").sort().join("");
  const handGroup = handSort.match(/(.)\1*/g);

  const maxVal = handGroup.reduce((a, c) => {
    if (c.includes("J") || c.length < a.length) {
      return a;
    }
    if (c.length > a.length) {
      return c;
    }
    if (a.length === c.length) {
      return ranking[a[0]] > ranking[c[0]] ? a : c;
    }
  }, "")[0];

  const newHand = hand.replaceAll(/J/gi, maxVal);
  // console.log("newHand", {
  //   maxVal,
  //   hand,
  //   newHand,
  //   length: newHand.length,
  // });
  return newHand;
};

const partTwo = (fileLines: string[]) => {
  const sort: Record<string, string>[] = [];

  for (const line of fileLines) {
    const [hand, bid] = line.split(" ");
    sort.push({
      hand,
      bid,
      parsed: parseHand(`${hand}`),
    });
  }
  sort.sort((a, b) => sortRanking(a, b, true));
  const res = sort.reduce((a, c, i) => {
    return a + +c.bid * (i + 1);
  }, 0);

  console.log("res", res);
};

export { partOne, partTwo };
