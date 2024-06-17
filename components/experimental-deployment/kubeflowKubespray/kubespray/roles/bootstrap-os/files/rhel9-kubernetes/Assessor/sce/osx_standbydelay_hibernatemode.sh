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
#

passing=""

processor=$(
sysctl -n machdep.cpu.brand_string | grep -c "Intel"
)

standby=$(
pmset -g | egrep standby | awk '{print $2}'
)


standbydelaylow=$(
pmset -g | egrep standbydelaylow | awk '{print $2}'
)

standbydelayhigh=$(
pmset -g | egrep standbydelayhigh | awk '{print $2}'
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
elif [ $processor ==0 ] && [ $standbydelaylow -le 900 ] && [ $standbydelayhigh -le 900 ] && [ $hibernatemode -eq 1 ] && [ $destroykey -eq 1 ] || [ $processor == 0 ] && [ $standby -le 900 ] && [ $hibernatemode -eq 1 ] && [ $destroykey -eq 1 ]; then
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
