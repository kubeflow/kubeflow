#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/25/21   Verify file is owned by owner (file and owner need to be seporated by a ':')

passing=""
FILE=$(echo "$XCCDF_VALUE_REGEX" | awk -F : '{print $1}')
GRP=$(echo "$XCCDF_VALUE_REGEX" | awk -F : '{print $2}')

stat -c "%U" "$FILE" | grep -Eq "^$GRP\s*$" && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "PASS. \"$FILE\" is owned by \"$(stat -c "%U" "$FILE")\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAIL. \"$FILE\" is owned by \"$(stat -c "%U" "$FILE")\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
