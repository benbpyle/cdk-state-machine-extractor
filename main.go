package main

import (
	"flag"
	"fmt"
	"log"
)

func main() {
	file := flag.String("file-name", "", "CloudFormation template file")
	help := flag.String("help", "", "Usage printout")

	flag.Parse()

	if *help != "" || *file == "" {
		flag.PrintDefaults()
		return
	}

	contents, err := extractFileContents(*file)

	if err != nil {
		log.Fatalf("(Error)=%v\n", err)
	}

	definitions, err := extractDefinition(contents)

	if err != nil {
		log.Fatalf("(Error)=%v\n", err)
	}

	fmt.Printf("%v", definitions)
}
