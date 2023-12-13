package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func readFile(filename string) []string {
	dir, _ := os.Getwd()
	f, err := os.Open(dir + filename)
	check(err)
	defer f.Close()

	scanner := bufio.NewScanner(f)

	var lines []string
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func part_one() {
	var total uint16 = 1

	lines := readFile("/data/day_6.txt")

	num_regex := regexp.MustCompile("\\d+")

	fmt.Println(lines[1])
	times := num_regex.FindAllString(lines[0], -1)
	distances := num_regex.FindAllString(lines[1], -1)

	for index, time := range times {
		int_time, _ := strconv.Atoi(time)
		int_distance, _ := strconv.Atoi(distances[index])

		var ways uint16 = 0
		for i := 1; i < int_time; i++ {
			if i*(int_time-i) >= int_distance {
				ways += 1
			}
		}

		total *= ways
	}

	fmt.Println(total)
}

func part_two() {
}

func main() {
	part_one()
}
