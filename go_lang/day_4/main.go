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
	myMap := make(map[int]uint64)

	for index, line := range lines {
		card := strings.Split(line, ":")[1]
		winning_number := num_regex.FindAllString(strings.Split(card, "|")[0], -1)
		scratch_number := num_regex.FindAllString(strings.Split(card, "|")[1], -1)
		myMap[index]++
		var winning_numbers uint64 = 0
		for _, num := range scratch_number {
			if isInArray(num, winning_number) {
				winning_numbers += 1
			}
		}

		for i := index + 1; i <= index+int(winning_numbers); i++ {
			if _, exists := myMap[i]; exists {
				myMap[i] += myMap[index]
			} else {
				myMap[i] = myMap[index]
			}
		}

		// fmt.Printf("%d", total)
		// fmt.Println()
		// fmt.Println()
		total += 1 * myMap[index]
	}

	fmt.Println(total)
}

func main() {
	part_two()
}
