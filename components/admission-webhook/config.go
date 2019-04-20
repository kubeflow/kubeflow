/*
Copyright 2017 The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"crypto/tls"

	"sigs.k8s.io/controller-runtime/pkg/client"

	"k8s.io/klog"
	"sigs.k8s.io/controller-runtime/pkg/client/config"
)

func getCrdClient() client.Client {
	config, err := config.GetConfig()
	if err != nil {
		klog.Fatal(err)
	}
	crdclient, err := client.New(config, client.Options{Scheme: scheme})
	if err != nil {
		klog.Fatal(err)
	}

	return crdclient
}

func configTLS(config Config) *tls.Config {
	sCert, err := tls.LoadX509KeyPair(config.CertFile, config.KeyFile)
	if err != nil {
		klog.Fatalf("config=%#v Error: %v", config, err)
	}
	return &tls.Config{
		Certificates: []tls.Certificate{sCert},
		// TODO: uses mutual tls after we agree on what cert the apiserver should use.
		//ClientAuth: tls.RequireAndVerifyClientCert,
	}
}
