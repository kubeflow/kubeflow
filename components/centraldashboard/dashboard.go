package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

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
	indexServer := http.FileServer(http.Dir("frontend/"))

	http.Handle("/", indexServer)
	log.Println("Listening on", ":"+port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// GetClient gets client information
func GetClient() *kubernetes.Clientset {
	config, err := rest.InClusterConfig()
	if err != nil {
		fmt.Printf("Error loading incluster config: %v", err.Error())
	}
	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		fmt.Printf("Error creating clientset from clusterconfig: %v", err.Error())
	}

	return clientset
}

//SearchKatibPods searches across the cluster to see if Katib is deployed.
func SearchKatibPods(clientset *kubernetes.Clientset) bool {

	pods, err := clientset.CoreV1().Pods("").List(metav1.ListOptions{})
	if err != nil {
		fmt.Printf("Error in retrieving pods")
	}

	for _, pod := range pods.Items {
		if strings.HasPrefix(pod.Name, "vizier") == true {
			fmt.Printf("Match found\npod namespace: %s\npod name: %s\n", pod.Namespace, pod.Name)
			return true
		}
	}

	return false
}
