package main

import (
	"log"
	"net/http"
)

func main() {

	indexServer := http.FileServer(http.Dir("components/centraldashboard/frontend/index/"))
	http.Handle("/", indexServer)
	p := ":8082"
	log.Println("Listening on", p)
	http.ListenAndServe(p, nil)
}
