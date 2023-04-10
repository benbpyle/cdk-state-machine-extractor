package main

import "os"

func extractFileContents(filename string) (string, error) {
	fileContent, err := os.ReadFile(filename)
	if err != nil {
		return "", err
	}

	text := string(fileContent)
	return text, nil
}
