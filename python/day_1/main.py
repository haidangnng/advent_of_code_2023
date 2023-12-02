from utils import parse_number, read_lines
import regex as re

lines = read_lines("../../data/day_1.txt")


def part_1():
    total = 0
    for line in lines:
        count = ""
        for c in line:
            if c.isdigit():
                count = count + c
                break

        for c in line[::-1]:
            if c.isdigit():
                count = count + c
                break
        total += int(count)

    print(total)


def part_2():
    regex = re.compile(r"\d|one|two|three|four|five|six|seven|eight|nine")

    total = 0
    for line in lines:
        result = re.findall(regex, line, overlapped=True)
        num = parse_number(result[0]) * 10 + parse_number(result[-1])

        total += num

    print(total)


part_2()
