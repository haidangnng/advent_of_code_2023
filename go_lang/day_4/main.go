package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
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

func isInArray(itemToFind string, array []string) bool {
	for _, element := range array {
		if element == itemToFind {
			return true
		}
	}
	return false
}

func part_one() {
	var total uint64 = 0

	lines := readFile("/data/day_4.txt")
	num_regex := regexp.MustCompile("\\d+")

	for _, line := range lines {
		card := strings.Split(line, ":")[1]
		var binaryVariable uint16 = 0b00000000
		winning_number := num_regex.FindAllString(strings.Split(card, "|")[0], -1)
		scratch_number := num_regex.FindAllString(strings.Split(card, "|")[1], -1)

		for _, num := range scratch_number {
			if isInArray(num, winning_number) {
				if binaryVariable == 0 {
					binaryVariable |= 0b1
				} else {
					binaryVariable = (binaryVariable << 1) | 0b0
				}
			}
		}

		total += uint64(binaryVariable)
	}

	fmt.Println(total)
}

func part_two() {
	var total uint64 = 0

	lines := readFile("/data/day_4.txt")
	num_regex := regexp.MustCompile("\\d+")

	for _, line := range lines {

		card := strings.Split(line, ":")[1]
		winning_number := num_regex.FindAllString(strings.Split(card, "|")[0], -1)
		scratch_number := num_regex.FindAllString(strings.Split(card, "|")[1], -1)

		for _, num := range scratch_number {
			if isInArray(num, winning_number) {
				total += 1
			}
		}
		total += 1
	}

	fmt.Println(total)
}

func main() {
	part_two()
}
