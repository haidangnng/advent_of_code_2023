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

func get_max(list []string) int64 {
	var max_value int64
	for _, value := range list {
		num, _ := strconv.ParseInt(value, 10, 16)
		if num > max_value {
			max_value = num
		}
	}

	return max_value
}

func trimEmptyStrings(input []string) []string {
	var result []string

	for _, str := range input {
		trimmed := strings.TrimSpace(str)
		if trimmed != "" {
			result = append(result, trimmed)
		}
	}

	return result
}

func get_power(steps string) int64 {
	red_regex := regexp.MustCompile("(\\d+)[^\\d]+?(green|blue)|red|,|;")
	green_regex := regexp.MustCompile("(\\d+)[^\\d]+?(red|blue)|green|,|;")
	blue_regex := regexp.MustCompile("(\\d+)[^\\d]+?(green|red)|blue|,|;")

	red_list := trimEmptyStrings(red_regex.Split(steps, -1))
	green_list := trimEmptyStrings(green_regex.Split(steps, -1))
	blue_list := trimEmptyStrings(blue_regex.Split(steps, -1))

	return get_max(red_list) * get_max(green_list) * get_max(blue_list)
}

func main() {
	dir, _ := os.Getwd()
	f, err := os.Open(dir + "/data/day_2.txt")
	check(err)
	defer f.Close()

	scanner := bufio.NewScanner(f)

	var res int64
	for scanner.Scan() {
		line := strings.Split(scanner.Text(), ":")
		res += get_power(line[1])
	}

	fmt.Println(res)
}

