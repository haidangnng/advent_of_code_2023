package main

import (
	"bufio"
	"fmt"
	"os"
)

func readFile(filename string) []string {
	dir, _ := os.Getwd()
	f, err := os.Open(dir + "/data/day_2.txt")
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

func main() {
	lines := readFile("/data/day_4.tx")
	fmt.Println(lines)
}

