package jsonnet

import "testing"
import "github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"

var fieldKeyTests = map[kubespec.PropertyName]FieldKey{
	"assert":    "\"assert\"",
	"else":      "\"else\"",
	"error":     "\"error\"",
	"false":     "\"false\"",
	"for":       "\"for\"",
	"function":  "\"function\"",
	"if":        "\"if\"",
	"import":    "\"import\"",
	"importstr": "\"importstr\"",
	"in":        "\"in\"",
	// TODO: this needs to be resolved
	// "local":      "\"local\"",
	"null":       "\"null\"",
	"tailstrict": "\"tailstrict\"",
	"then":       "\"then\"",
	"self":       "\"self\"",
	"super":      "\"super\"",
	"true":       "\"true\"",
}

var funcParamTests = map[kubespec.PropertyName]FuncParam{
	"assert":    "assertParam",
	"else":      "elseParam",
	"error":     "errorParam",
	"false":     "falseParam",
	"for":       "forParam",
	"function":  "functionParam",
	"if":        "ifParam",
	"import":    "importParam",
	"importstr": "importstrParam",
	"in":        "inParam",
	// TODO: this needs to be resolved
	// "local":      "localParam",
	"null":       "nullParam",
	"tailstrict": "tailstrictParam",
	"then":       "thenParam",
	"self":       "selfParam",
	"super":      "superParam",
	"true":       "trueParam",
}

var identifierTests = map[kubespec.PropertyName]Identifier{
	"hostIPC":                        "hostIpc",
	"hostPID":                        "hostPid",
	"targetCPUUtilizationPercentage": "targetCpuUtilizationPercentage",
	"externalID":                     "externalId",
	"podCIDR":                        "podCidr",
	"providerID":                     "providerId",
	"bootID":                         "bootId",
	"machineID":                      "machineId",
	"systemUUID":                     "systemUuid",
	"volumeID":                       "volumeId",
	"diskURI":                        "diskUri",
	"targetWWNs":                     "targetWwns",
	"datasetUUID":                    "datasetUuid",
	"pdID":                           "pdId",
	"scaleIO":                        "scaleIo",
	"podIP":                          "podIp",
	"hostIP":                         "hostIp",
	"clusterIP":                      "clusterIp",
	"externalIPs":                    "externalIps",
	"loadBalancerIP":                 "loadBalancerIp",
}

func TestRewriteAsFieldKey(t *testing.T) {
	for keyword, target := range fieldKeyTests {
		actual := RewriteAsFieldKey(keyword)
		if target != actual {
			t.Errorf("Expected '%s' got '%s'", target, actual)
		}
	}

	// Test rewrite is a no-op for other identifiers.
	for id := range identifierTests {
		target := FieldKey(id)
		actual := RewriteAsFieldKey(kubespec.PropertyName(id))
		if target != actual {
			t.Errorf("Expected '%s' got '%s'", target, actual)
		}
	}
}

func TestRewriteAsFuncParam(t *testing.T) {
	for keyword, target := range funcParamTests {
		actual := RewriteAsFuncParam("v1.7.0", keyword)
		if target != actual {
			t.Errorf("Expected '%s' got '%s'", target, actual)
		}
	}

	// Test we also do aliasing for func parameters
	for id, target := range identifierTests {
		actual := RewriteAsFuncParam("v1.7.0", id)
		if FuncParam(target) != actual {
			t.Errorf("Expected '%s' got '%s'", target, actual)
		}
	}
}

func TestRewriteAsIdentifier(t *testing.T) {
	for id, target := range identifierTests {
		actual := RewriteAsIdentifier("v1.7.0", id)
		if target != actual {
			t.Errorf("Expected '%s' got '%s'", target, actual)
		}
	}

	// Test rewrite is a no-op for keywords.
	for keyword := range fieldKeyTests {
		target := Identifier(keyword)
		actual := RewriteAsIdentifier("v1.7.0", kubespec.PropertyName(keyword))
		if target != actual {
			t.Errorf("Expected '%s' got '%s'", target, actual)
		}
	}
}
