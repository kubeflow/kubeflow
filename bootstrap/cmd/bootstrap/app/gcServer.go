package app

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/pkg/errors"
	"github.com/prometheus/common/log"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	kubeclientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"net/http"
	"time"
)

type gcServer struct {
	k8sclient       kubeclientset.Interface
	targetnamespace string
	thresholdInSec  int
}

type GcService interface {
	StartGC() error
}

func decodeFreezeResponse(_ context.Context, r *http.Response) (interface{}, error) {
	if r.StatusCode != http.StatusOK {
		// Try to decode the error as an httpError
		h := httpError{}
		err := json.NewDecoder(r.Body).Decode(&h)
		if err == nil {
			return nil, &h
		}
		return nil, errors.New(r.Status)
	}
	var resp bool
	err := json.NewDecoder(r.Body).Decode(&resp)
	return resp, err
}

func NewGcServer(targetnamespace string) (*gcServer, error) {
	if targetnamespace == "" {
		return nil, errors.WithStack(fmt.Errorf("targetnamespace must be provided"))
	}

	log.Infof("Getting K8s client")

	// Create a K8s client to talk to the cluster in which the server is running.
	// This will be used by the router to spin up statefulsets to handle the requests.
	config, err := getClusterConfig(true)

	if err != nil {
		return nil, err
	}

	log.Info("Creating GC Server")

	kubeClientSet, err := kubeclientset.NewForConfig(rest.AddUserAgent(config, "kfctl-gc"))

	if err != nil {
		return nil, err
	}

	return &gcServer{
		k8sclient:       kubeClientSet,
		targetnamespace: targetnamespace,
		// Use default threshold 20 minutes: gc statefulset if no request in previous 20 minutes
		thresholdInSec: 1200,
	}, nil
}

func (gc *gcServer) StartGC() error {
	// Infinite loop except error occurs
	for {
		time.Sleep(5 * time.Minute)
		statefulSets, err := gc.k8sclient.AppsV1().StatefulSets(gc.targetnamespace).List(metav1.ListOptions{})
		if err != nil {
			return errors.WithStack(fmt.Errorf("Error listing StatefulSets in %v: %v", gc.targetnamespace, err))
		}
		for _, statefulSet := range statefulSets.Items {
			rawTime, ok := statefulSet.Annotations[LastRequestTime]
			if ok {
				lastRequestTime := time.Time{}
				if err := lastRequestTime.UnmarshalText([]byte(rawTime)); err == nil {
					if time.Now().Sub(lastRequestTime).Seconds() < float64(gc.thresholdInSec) {
						// Keep statefulset which have not expired yet.
						continue
					}
				}
			}
			// We delete statefulset & service in reverse of creating them.
			if err := gc.k8sclient.AppsV1().StatefulSets(gc.targetnamespace).Delete(statefulSet.Name,
				&metav1.DeleteOptions{}); err != nil {
				//	TODO(kunming): add alert signal
				log.Errorf("Unexpected error during deleting statefulset: %v", err)
				continue
			}
			if err := gc.k8sclient.CoreV1().Services(gc.targetnamespace).Delete(statefulSet.Name,
				&metav1.DeleteOptions{}); err != nil {
				//	TODO(kunming): add alert signal
				log.Errorf("Unexpected error during deleting statefulset: %v", err)
			}
		}
	}
}
