package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	dir, _ := os.Getwd()
	f, err := os.Open(dir + "/day_1/data/input.txt")
	check(err)
	defer f.Close()

	scanner := bufio.NewScanner(f)
	regex := regexp.MustCompile("\\d")

	var res int64

	for scanner.Scan() {
		arr := regex.FindAllString(scanner.Text(), -1)
		num, _ := strconv.ParseInt(arr[0]+arr[len(arr)-1], 10, 16)
		res += num
	}

	fmt.Println(res)
}
