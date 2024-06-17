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
#

passing=""

processor=$(
sysctl -n machdep.cpu.brand_string | grep -c "Intel"
)

standby=$(
pmset -g | grep -e standby | awk '{print $2}'
)

standbydelay=$(
pmset -g | grep -e standbydelay | awk '{print $2}'
)

standbydelaylow=$(
pmset -g | grep -e standbydelaylow | awk '{print $2}'
)

standbydelayhigh=$(
pmset -g | grep -e standbydelayhigh | awk '{print $2}'
)

hibernatemode=$(
pmset -g | grep -c 'hibernatemode        25'
)

destroykey=$(
pmset -g | grep -c 'DestroyFVKeyOnStandby            1'
)

hardwaretype=$(
system_profiler SPHardwareDataType | awk '/MacBook/ {print $3}' | head -1
)

if [ -z $hardwaretype ] ; then
	output="Not a Portable" && passing=true && echo $hardwaretype
elif [ $processor == 0 ] && [ $standby -le 900 ] && [ $hibernatemode -eq 1 ] && [ $destroykey -eq 1 ] || [ $processor == 0 ] && [ $standby -le 900 ] && [ $hibernatemode -eq 1 ] && [ $destroykey -eq 1 ]; then
	passing=true
fi

# If result contains string pass, otherwise fail.
if [ "$passing" = true ] ; then
	echo "Passed: \"$output\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: \"$output\""
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
