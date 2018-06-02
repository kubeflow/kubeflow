package main

import (
	"log"
	"net/http"
	"os"
)

var (
	port = os.Getenv("PORT_1")
)

func main() {

	indexServer := http.FileServer(http.Dir("index/"))
	http.Handle("/", indexServer)
	log.Println("Listening on", ":"+port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
