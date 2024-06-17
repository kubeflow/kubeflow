#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ------------------------------------------------------------
# J. Brown   10/27/21     Check an rpm version against a regex

# XCCDF_VALUE_REGEX should contain the required rpm name/version regex
# example: "redhat-release-8\.[0-1]-.+"

passing=""

pkg_version=$(rpm -qa | grep -P "$XCCDF_VALUE_REGEX")

if [ -z "$pkg_version" ] ; then
	passing=false
fi

# If passing is true we pass
if [ "$passing" = false ] ; then
	echo "FAILED:"
	echo "No package matching '$XCCDF_VALUE_REGEX' was found"
	exit "${XCCDF_RESULT_FAIL:-102}"
else
	# print the reason why we are failing 
	echo "PASSED:"
	echo "Package matching '$XCCDF_VALUE_REGEX' was found:"
	echo "$pkg_version"
	exit "${XCCDF_RESULT_PASS:-101}"
fi