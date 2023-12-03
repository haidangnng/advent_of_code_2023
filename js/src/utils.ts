import { open } from "fs/promises";

type ReadLinesProps = {
  path: string;
  callback: (fileValue: string[]) => void;
};

const readLines = async (props: ReadLinesProps) => {
  const { path, callback } = props;
  const file = await open(path);

  const fileLines: string[] = [];
  for await (const line of file.readLines()) {
    fileLines.push(line);
  }
  callback(fileLines);
};

export { readLines };
