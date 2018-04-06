package kubespec

import (
	"fmt"
	"regexp"
)

var (
	regexes = []*regexp.Regexp{
		// Core API, pre-1.8 Kubernetes OR non-Kubernetes codebase APIs
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.api\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Core API, 1.8+ Kubernetes
		regexp.MustCompile(`io\.k8s\.api\.(?P<packageType>core)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Other APIs, pre-1.8 Kubernetes OR non-Kubernetes codebase APIs
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>apis)\.(?P<group>\S+)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Other APIs, 1.8+ Kubernetes
		regexp.MustCompile(`io\.k8s\.api\.(?P<group>\S+)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Util packageType
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>util)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Version packageType
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>version)\.(?P<kind>\S+)`),
		// Runtime packageType
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>runtime)\.(?P<kind>\S+)`),
	}
)

var (
	packageTypeMap = map[string]Package{
		"core":    Core,
		"apis":    APIs,
		"util":    Util,
		"runtime": Runtime,
		"version": Version,
	}
)

type description struct {
	name        string
	codebase    string
	version     string
	kind        ObjectKind
	packageType Package
	group       string
}

func (d *description) Validate() error {
	if d.version == "" {
		return fmt.Errorf("version is nil for %q", d.name)
	}

	return nil
}

func describeDefinition(name string) (*description, error) {
	for _, r := range regexes {
		if match := r.FindStringSubmatch(name); len(match) > 0 {

			result := make(map[string]string)
			for i, name := range r.SubexpNames() {
				if i != 0 {
					result[name] = match[i]
				}
			}

			// Hacky heuristics to fix missing fields
			if result["codebase"] == "" {
				result["codebase"] = "kubernetes"
			}
			if result["packageType"] == "" && result["group"] == "" {
				result["packageType"] = "core"
			}
			if result["packageType"] == "" && result["group"] != "" {
				result["packageType"] = "apis"
			}

			d := &description{
				name:        name,
				codebase:    result["codebase"],
				version:     result["version"],
				kind:        ObjectKind(result["kind"]),
				packageType: packageTypeMap[result["packageType"]],
				group:       result["group"],
			}

			return d, nil
		}
	}

	return nil, fmt.Errorf("unknown definition %q", name)
}
