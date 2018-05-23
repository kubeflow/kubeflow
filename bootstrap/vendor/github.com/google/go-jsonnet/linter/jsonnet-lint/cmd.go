package main

import (
	"fmt"
	"io/ioutil"
	"os"

	"github.com/google/go-jsonnet/linter"

	jsonnet "github.com/google/go-jsonnet"
)

// ExitProblemsFound is used if we find problems with the code
func ExitProblemsFound() {
	os.Exit(2)
}

// ExitError is used if the file doesn't exist etc.
func ExitError() {
	os.Exit(1)
}

func die(err error) {
	fmt.Fprintf(os.Stderr, "Error: %s\n", err.Error())
	ExitError()
}

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s <path>\n", os.Args[0])
		os.Exit(2)
	}
	p := os.Args[1]
	inputFile, err := os.Open(p)
	if err != nil {
		die(err)
	}
	data, err := ioutil.ReadAll(inputFile)
	if err != nil {
		die(err)
	}
	inputFile.Close()
	node, err := jsonnet.SnippetToAST(p, string(data))
	if err != nil {
		die(err)
	}
	errWriter := &linter.ErrorWriter{
		Writer: os.Stderr,
	}
	linter.Lint(node, errWriter)
	if errWriter.ErrorsFound {
		fmt.Fprintf(os.Stderr, "Problems found!\n")
		ExitProblemsFound()
	}
}
