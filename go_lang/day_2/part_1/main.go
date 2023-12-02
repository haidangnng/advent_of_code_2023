package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func is_game_possible(steps string) bool {
	step_regex := regexp.MustCompile("\\d+|(?:(\\w+))")
	var res bool = false
	for _, step := range strings.Split(steps, ";") {
		for _, round := range strings.Split(step, ",") {
			arr := step_regex.FindAllString(round, -1)
			color := arr[1]
			num, _ := strconv.ParseInt(arr[0], 10, 16)

			switch color {
			case "red":
				res = num <= 12
			case "green":
				res = num <= 13
			case "blue":
				res = num <= 14
			}

			if res == false {
				return res
			}
		}
	}

	return res
}

func main() {
	dir, _ := os.Getwd()
	f, err := os.Open(dir + "/data/day_2.txt")
	check(err)
	defer f.Close()

	scanner := bufio.NewScanner(f)
	regex := regexp.MustCompile("\\d+")

	var res int16
	for scanner.Scan() {
		result := strings.Split(scanner.Text(), ":")

		id := regex.FindString(result[0])
		num_id, _ := strconv.ParseInt(id, 10, 16)
		if is_game_possible(result[1]) {
			res += int16(num_id)
		}
	}

	fmt.Println(res)
}
