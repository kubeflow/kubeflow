#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Disable Remote Management
# Edward Byrd		  09/21/20	 Update to system call

ardagent=$(
ps -ef | awk '/ARDAgent/ {print $8}' | head -1
)


if [ "$ardagent" == "/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/MacOS/ARDAgent" ]; then
  output=False
else
  output=True
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi