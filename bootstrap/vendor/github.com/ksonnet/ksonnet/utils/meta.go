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

package utils

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/blang/semver"
	log "github.com/sirupsen/logrus"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/version"
	"k8s.io/client-go/discovery"
)

// ServerVersion captures k8s major.minor version in a parsed form
type ServerVersion struct {
	Major int
	Minor int
}

// ParseVersion parses version.Info into a ServerVersion struct
func ParseVersion(v *version.Info) (ret ServerVersion, err error) {
	//
	// Note: It is not advisable to use the Major / Minor version pair returned
	// by The ServerVersion as it may be empty. We will use the GitVersion as
	// it appears to always be populated, and is the return value provided by
	// client-go's v.String().
	//
	// As a safety precaution, we will still default to the Major / Minor version,
	// if the GitVersion fails.
	//

	versionString := v.String()
	if len(versionString) >= 1 {
		// trim off "v" infront of version since it is invalid semver syntax.
		versionString = versionString[1:]
	}

	version, err := semver.Make(versionString)
	if err != nil {
		ret, err = parseFromMajorMinor(v)
		if err != nil {
			err = fmt.Errorf("Server version '%s' does not conform to semver format", versionString)
		}
		return
	}

	ret.Major = int(version.Major)
	ret.Minor = int(version.Minor)

	return
}

func parseFromMajorMinor(v *version.Info) (ret ServerVersion, err error) {
	re := regexp.MustCompile("[0-9]+")

	major := re.FindAllString(v.Major, 1)
	if len(major) < 1 {
		err = fmt.Errorf("Parse major version failed for %s", v.Major)
		return
	}

	ret.Major, err = strconv.Atoi(major[0])
	if err != nil {
		return
	}

	minor := re.FindAllString(v.Minor, 1)
	if len(minor) < 1 {
		err = fmt.Errorf("Parse minor version failed for %s", v.Minor)
		return
	}

	ret.Minor, err = strconv.Atoi(minor[0])
	if err != nil {
		return
	}

	return
}

// FetchVersion fetches version information from discovery client, and parses
func FetchVersion(v discovery.ServerVersionInterface) (ret ServerVersion, err error) {
	version, err := v.ServerVersion()
	if err != nil {
		return ServerVersion{}, err
	}
	return ParseVersion(version)
}

// Compare returns -1/0/+1 iff v is less than / equal / greater than major.minor
func (v ServerVersion) Compare(major, minor int) int {
	a := v.Major
	b := major

	if a == b {
		a = v.Minor
		b = minor
	}

	var res int
	if a > b {
		res = 1
	} else if a == b {
		res = 0
	} else {
		res = -1
	}
	return res
}

func (v ServerVersion) String() string {
	return fmt.Sprintf("%d.%d", v.Major, v.Minor)
}

// SetMetaDataAnnotation sets an annotation value
func SetMetaDataAnnotation(obj metav1.Object, key, value string) {
	a := obj.GetAnnotations()
	if a == nil {
		a = make(map[string]string)
	}
	a[key] = value
	obj.SetAnnotations(a)
}

// ResourceNameFor returns a lowercase plural form of a type, for
// human messages.  Returns lowercased kind if discovery lookup fails.
func ResourceNameFor(disco discovery.ServerResourcesInterface, o runtime.Object) string {
	gvk := o.GetObjectKind().GroupVersionKind()
	rls, err := disco.ServerResourcesForGroupVersion(gvk.GroupVersion().String())
	if err != nil {
		log.Debugf("Discovery failed for %s: %s, falling back to kind", gvk, err)
		return strings.ToLower(gvk.Kind)
	}

	for _, rl := range rls.APIResources {
		if rl.Kind == gvk.Kind {
			return rl.Name
		}
	}

	log.Debugf("Discovery failed to find %s, falling back to kind", gvk)
	return strings.ToLower(gvk.Kind)
}

// GroupVersionKindFor returns a lowercased kind for an Kubernete's object
func GroupVersionKindFor(o runtime.Object) string {
	gvk := o.GetObjectKind().GroupVersionKind()
	return strings.ToLower(gvk.Kind)
}

// FqName returns "namespace.name"
func FqName(o metav1.Object) string {
	if o.GetNamespace() == "" {
		return o.GetName()
	}
	return fmt.Sprintf("%s.%s", o.GetNamespace(), o.GetName())
}
