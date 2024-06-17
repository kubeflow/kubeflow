#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Retain install.log for 365 or more days
# Eric Pinnell        04/23/20   Corrected test
# Edward Byrd		  10/21/20	 Forked from osx_365_install_log.sh to also check for no maximum

output=$(grep -i ttl /etc/asl/com.apple.install)
grep -Eq '^\s*\*\s+file\s+\/var\/log\/install.log\s+([^#]+\s+)*ttl=(36[5-9]|3[7-9][0-9]|[4-9][0-9][0-9]|[[1-9][0-9]{3,})\b(\s*\S+\s*)*(\s+#.*)?$' /etc/asl/com.apple.install && passing=true

anymax=$(grep -i all_max= /etc/asl/com.apple.install)

# If results returns pass, otherwise fail.
if [ "$passing" = "true" ] && [ $anymax -n ]; then
	echo "Passed: \"$output\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: \"$output\""
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
