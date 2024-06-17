#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure system is set to hibernate
# Edward Byrd		  09/18/20   Forked from osx_standbydelay.sh to check 10.13 and earlier versions of macOS
# Edward Byrd		  09/18/20   Forked from osx_standbydelay.sh to check for delay as well as hibernate mode
# Edward Byrd		  06/14/22	 Updated for Apple Silicon Processor
# Edward Byrd         11/08/22   Updated for the new naming and updated Apple Silicon check
# Edward Byrd		  06/26/23	 Forked from previous 2.9.3 to check the FileVault Destroy key to its own recommendation
#

passing=""

hardwaretype=$(
system_profiler SPHardwareDataType | awk '/MacBook/ {print $3}' | head -1
)

filevaultdestroy=$(
/usr/bin/pmset -b -g | /usr/bin/grep DestroyFVKeyOnStandby | awk '{print $2}'
)


if [ -z $hardwaretype ]; then
	output="PASSED: This recommendation is not applicable because this is not a laptop/portable" && passing=true 
elif [ $filevaultdestroy -eq 1 ]; then
		echo "PASSED: The destroy FileVault key is set to the correct value" && passing=true
fi

# If result contains string pass, otherwise fail.
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: The destroy FileVault key is not set to the correct value and needs to be modified"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

