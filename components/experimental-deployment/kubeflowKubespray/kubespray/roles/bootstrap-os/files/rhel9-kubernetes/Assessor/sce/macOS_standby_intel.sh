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
sysctl -n machdep.cpu.brand_string | grep -c "Intel"
)

standbythreshold=$(
pmset -g | grep -e highstandbythreshold | awk '{print $2}'
)

standbydelaylow=$(
pmset -g | grep -e standbydelaylow | awk '{print $2}'
)

standbydelayhigh=$(
pmset -g | grep -e standbydelayhigh | awk '{print $2}'
)

hibernatemode=$(
pmset -g | grep -e hibernatemode | awk '{print $2}'
)

hardwaretype=$(
system_profiler SPHardwareDataType | awk '/MacBook/ {print $3}' | head -1
)

if  [ $processor -eq 0 ]; then
	output="PASSED: This recommendation is not applicable because it is not an Intel processor" && passing=true 
elif [ -z $hardwaretype ]; then
	output="PASSED: This recommendation is not applicable because this is not a laptop/portable" && passing=true 
elif [ $standbydelaylow -le 900 ] && [ $standbydelayhigh -le 900 ] && [ $hibernatemode -eq 25 ] &&  [ $standbythreshold -ge 90 ]; then
	echo "PASSED: Standby delay, standby delay low, standby delay high, and hibernate mode are set with the recommendaed values" && passing=true
fi

# If result contains string pass, otherwise fail.
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: Standby Delay Low is set to \"$standbydelaylow\""
    echo "Standby Delay High is set to \"$standbydelayhigh\""
    echo "Standby Threshold is set to \"$standbythreshold\""
    echo "Hibernate Mode is set to \"$hibernatemode\""
    echo "These settings are not within the recommended values and need to be corrected"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi



