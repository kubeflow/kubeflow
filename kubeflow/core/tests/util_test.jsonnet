local util = import "../util.libsonnet";

std.assertEqual(util.upper("True"), "TRUE") &&
std.assertEqual(util.upper("TrUe"), "TRUE") &&
std.assertEqual(util.upper("true"), "TRUE") &&
std.assertEqual(util.upper("TRUE"), "TRUE") &&
std.assertEqual(util.toBool(false), false) &&
std.assertEqual(util.toBool(true), true) &&
std.assertEqual(util.toBool("true"), true) &&
std.assertEqual(util.toBool("True"), true) &&
std.assertEqual(util.toBool("TRUE"), true) &&
std.assertEqual(util.toBool("false"), false) &&
std.assertEqual(util.toBool("False"), false) &&
std.assertEqual(util.toBool("FALSE"), false) &&
std.assertEqual(util.toBool("random string"), false) &&
std.assertEqual(util.toBool(1), true) &&
std.assertEqual(util.toBool(0), false) &&
std.assertEqual(util.toBool(123), true) &&
std.assertEqual(std.length(util.toArray("a,b,c,d")), 4) &&
std.assertEqual(std.length(util.toArray(2)), 0) &&
std.assertEqual(std.length(util.toArray("hello world")), 1) &&
std.assertEqual(std.length(util.toArray([1, 2, 3, 4])), 0) &&
std.assertEqual(util.isUpper(std.substr("Hi", 0, 1)), true) &&
std.assertEqual(util.isUpper(std.substr("lo", 0, 1)), false) &&
std.assertEqual(
  {
    new():: self + {
      local configMap = {
        kind: "ConfigMap",
      },
      local service = {
        kind: "Service",
      },
      list:: util.list([configMap, service]),
    },
  }.new().list,
  {
    apiVersion: "v1",
    items: [
      {
        kind: "ConfigMap",
      },
      {
        kind: "Service",
      },
    ],
    kind: "List",
  }
)
