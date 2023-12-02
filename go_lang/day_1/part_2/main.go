package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"slices"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

var num_text = []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}

func convert(i string) string {
	dict := make(map[string]string)
	for index, value := range num_text {
		dict[value] = strconv.Itoa(index + 1)
	}

	if slices.Contains(num_text, i) {
		return dict[i]
	}

	return i
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

func main() {
	dir, _ := os.Getwd()
	f, err := os.Open(dir + "/data/day_1.txt")
	check(err)
	defer f.Close()

	dict := make(map[string]string)
	for index, value := range num_text {
		dict[value] = strconv.Itoa(index + 1)
	}

	scanner := bufio.NewScanner(f)
	regex := regexp.MustCompile("\\d|(?:(one))|(?:(two))|(?:(three))|(?:(four))|(?:(five))|(?:(six))|(?:(seven))|(?:(eight))|(?:(nine))|")

	var res int64

	for scanner.Scan() {
		parsed_string := regex.ReplaceAllStringFunc(scanner.Text(), func(match string) string {
			if len(match) > 0 {
				return match[0:1] + dict[match] + match[1:]
			}
			return match
		})

		arr := regex.FindAllString(parsed_string, -1)
		trimmedSlice := trimEmptyStrings(arr)
		first := convert(trimmedSlice[0])
		last := convert(trimmedSlice[len(trimmedSlice)-1])

		num, _ := strconv.ParseInt(first+last, 10, 16)
		res += num
	}

	fmt.Println(res)
}
