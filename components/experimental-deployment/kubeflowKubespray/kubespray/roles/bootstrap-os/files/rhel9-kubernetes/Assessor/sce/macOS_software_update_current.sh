#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure Software is up to date
# Edward Byrd		  09/21/20	 Updated script for better results
# Edward Byrd		  11/10/22	 Updated for new naming convention
# Edward Byrd		  06/18/23	 Updated for better results and to not fail if a newer major release of macOS is available
#

swversion=$(
(sw_vers -productVersion | cut -c1-2)
)

swversion1=$(($swversion+1))

swversion2=$(($swversion+2))

swuptodate=$(
softwareupdate -l | grep -e Version | grep -v "macOS.*$swversion1" | grep -v "macOS.*$swversion2" 2> /dev/null
)

if [ "$swuptodate" == "" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: There are no updates available"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: There are available updates that need to be installed"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
fi


