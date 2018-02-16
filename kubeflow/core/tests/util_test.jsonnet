local util = import '../util.libsonnet';

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
std.assertEqual(util.toBool(123), true)
