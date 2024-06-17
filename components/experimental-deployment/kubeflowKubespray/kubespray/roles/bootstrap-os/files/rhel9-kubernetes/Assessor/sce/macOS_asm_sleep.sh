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
# Edward Byrd		  06/26/23	 Forked from previous 2.9.3 to account for the different settings in Intel and Apple Silicon Macs
#

passing=""

processor=$(
sysctl -n machdep.cpu.brand_string | grep -c "Apple"
)

sleepdelay=$(
pmset -g | /usr/bin/grep -e "^ sleep"  | awk '{print $2}'
)

displaysleepdelay=$(
pmset -g | /usr/bin/grep -e "displaysleep" | awk '{print $2}'
)

hibernatemode=$(
pmset -g | grep -e hibernatemode | awk '{print $2}'
)

hardwaretype=$(
system_profiler SPHardwareDataType | awk '/MacBook/ {print $3}' | head -1
)

if  [ $processor -eq 0 ]; then
	output="PASSED: This recommendation is not applicable because it is not an Apple Silicon processor" && passing=true 
elif [ -z $hardwaretype ]; then
	output="PASSED: This recommendation is not applicable because this is not a laptop/portable" && passing=true 
elif [ $sleepdelay -le 15 ] && [ $displaysleepdelay -le 10 ] && [ $displaysleepdelay -le $sleepdelay ] && [ $hibernatemode -eq 25 ]; then
		echo "PASSED: Sleep, display sleep, and hibernate mode are set with the recommendaed values" && passing=true
fi

# If result contains string pass, otherwise fail.
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: Sleep is set to \"$sleepdelay\""
    echo "Display sleep is set to \"$displaysleepdelay\""
    echo "Hibernate Mode is set to \"$hibernatemode\""
    echo "These settings are not within the recommended values and need to be corrected"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

