package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"

	// Uncomment the following line to load the gcp plugin (only required to authenticate against GKE clusters).
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
)

var (
	port = os.Getenv("PORT_1")
)

// Call GetClient from client/manager.go to obtain Cluster configs.
// Use client info from GetClient to call SearchKatib from findservice/findservice.go.
// SearchKatib will return a boolean true if Katib is deployed.

func main() {

	clientset := GetClient()
	isKatibDeployed := SearchKatibPods(clientset)

	indexServer := http.FileServer(http.Dir("frontend/layout/"))
	if isKatibDeployed {
		indexServer = http.FileServer(http.Dir("frontend/index/"))
	}

	http.Handle("/", indexServer)
	log.Println("Listening on", ":"+port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// GetClient gets client information
func GetClient() *kubernetes.Clientset {
	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}
	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	return clientset
}

//SearchKatibPods searches across the cluster to see if Katib is deployed.
func SearchKatibPods(clientset *kubernetes.Clientset) bool {

	pods, err := clientset.CoreV1().Pods("").List(metav1.ListOptions{})
	if err != nil {
		fmt.Printf("Error in regexp")
	}

	katibpod := "vizier*"
	r, err := regexp.Compile(katibpod)

	if err != nil {
		fmt.Printf("There is a problem with your regexp.\n")
	}

	for _, pod := range pods.Items {
		if r.MatchString(pod.Name) == true {
			fmt.Printf("Match found\npod namespace: %s\npod name: %s\n", pod.Namespace, pod.Name)
		}
	}

	return true
}
