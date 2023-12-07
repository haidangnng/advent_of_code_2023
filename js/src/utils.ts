import { open } from "fs/promises";
import * as fs from "fs";

type ReadLinesProps = {
  path: string;
  callback: (fileValue: string[] | string) => void;
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

const readFile = (props: ReadLinesProps) => {
  fs.readFile(props.path, "utf8", (_err, data) => {
    props.callback(data);
  });
};

export { readLines, readFile };
