package main

import (
	"flag"
	"github.com/gorilla/mux"
	"io/ioutil"
	"log"
	"net/http"
)

var (
	configFile = ""
	hostPath   = ""
)

func main() {
	flag.StringVar(&configFile, "keyfile", "/var/pubkey/public_key-jwk", "Path to key file")
	flag.StringVar(&hostPath, "path", "/iap/verify/public_key-jwk", "Path to key file")
	log.Printf("Server started")

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc(hostPath, WriteStaticConfig)

	log.Fatal(http.ListenAndServe(":8087", router))
}

func WriteStaticConfig(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	buf, err := ioutil.ReadFile(configFile)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if _, err := w.Write(buf); err != nil {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}
}