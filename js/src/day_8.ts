const partOne = (fileLines: string[]) => {
  const nodeMap = new Map();
  const [instructions, _, ...nodes] = fileLines;

  for (const node of nodes) {
    const [name, neighbors] = node.split(" = ");
    nodeMap.set(name, neighbors.match(/\w+/g));
  }

  let step: number = 0;
  let currentNode: string = "AAA";
  while (currentNode !== "ZZZ") {
    const direction = instructions[step % instructions.length] === "R" ? 1 : 0;
    currentNode = nodeMap.get(currentNode)[direction];
    ++step;
  }
  console.log("node", step);
};

const gcd = (a: number, b: number): number => {
  let r = -1;
  while (r != 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
};

const partTwo = (fileLines: string[]) => {
  const nodeMap = new Map();
  const [instructions, _, ...nodes] = fileLines;

  for (const node of nodes) {
    const [name, neighbors] = node.split(" = ");
    nodeMap.set(name, neighbors.match(/\w+/g));
  }

  const startNodes: string[] = Array.from(nodeMap.keys()).filter((x: string) =>
    x.endsWith("A"),
  );

  const steps = startNodes
    .map((node: string) => {
      let step: number = 0;
      let currentNode = node;
      while (!currentNode.endsWith("Z")) {
        const direction =
          instructions[step % instructions.length] === "R" ? 1 : 0;
        currentNode = nodeMap.get(currentNode)[direction];
        ++step;
      }
      return step;
    })
    .reduce((a, c) => (a * c) / gcd(a, c), 1);

  console.log("response", steps);
};

export { partOne, partTwo };
