// Copyright 2018 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package template

import (
	"fmt"
	"net/http"

	"github.com/ksonnet/ksonnet/utils"
	log "github.com/sirupsen/logrus"
)

func (spec *Expander) buildResolver() (utils.Resolver, error) {
	ret := resolverErrorWrapper{}

	switch spec.FailAction {
	case "ignore":
		ret.OnErr = func(error) error { return nil }
	case "warn":
		ret.OnErr = func(err error) error {
			log.Warning(err.Error())
			return nil
		}
	case "error":
		ret.OnErr = func(err error) error { return err }
	default:
		return nil, fmt.Errorf("Unknown resolve failure type: %s", spec.FailAction)
	}

	switch spec.Resolver {
	case "noop":
		ret.Inner = utils.NewIdentityResolver()
	case "registry":
		ret.Inner = utils.NewRegistryResolver(&http.Client{
			Transport: utils.NewAuthTransport(http.DefaultTransport),
		})
	default:
		return nil, fmt.Errorf("Unknown resolver type: %s", spec.Resolver)
	}

	return &ret, nil
}

type resolverErrorWrapper struct {
	Inner utils.Resolver
	OnErr func(error) error
}

func (r *resolverErrorWrapper) Resolve(image *utils.ImageName) error {
	err := r.Inner.Resolve(image)
	if err != nil {
		err = r.OnErr(err)
	}
	return err
}
