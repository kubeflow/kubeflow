local util = import "../util.libsonnet";

std.assertEqual(util.lower("aTruez"), "atruez") &&
std.assertEqual(util.lower("ATrUez"), "atruez") &&
std.assertEqual(util.lower("atruez"), "atruez") &&
std.assertEqual(util.lower("ATRUEZ"), "atruez") &&
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
std.assertEqual(util.toArray("a,b,c,d"), ["a", "b", "c", "d"]) &&
std.assertEqual(util.toArray("ca, or,fl, mo"), ["ca", "or", "fl", "mo"]) &&
std.assertEqual(std.length(util.toArray(2)), 0) &&
std.assertEqual(std.length(util.toArray("hello world")), 1) &&
std.assertEqual(std.length(util.toArray([1, 2, 3, 4])), 0) &&
std.assertEqual(util.sort(["Craydad", "CCall", "crayon"]), ["CCall", "Craydad", "crayon"]) &&
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
) &&
std.assertEqual(
  util.setDiff(
    util.sort(["CCall", "Craydad", "crayon", "fuzzball"]),
    util.sort(["CCall", "Craydad", "crayon"])
  ),
  ["fuzzball"]
)
