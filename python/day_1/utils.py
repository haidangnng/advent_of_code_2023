def read_lines(fname: str) -> list[str]:
    with open(fname) as f:
        return f.read().strip().splitlines()


def parse_number(i: str) -> int:
    dict = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
    }

    if i.isdigit():
        return int(i)
    return dict[i]
