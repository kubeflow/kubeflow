#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure EFI version is valid and being regularly checked
# Eric Pinnell        04/22/20   Update to exclude systems where no check is required
# Edward Byrd		  06/14/22	 Update to exclude Apple Silicon
# 

passing=""

processor=$(
sysctl -n machdep.cpu.brand_string | grep -c "Intel"
)

daemoneunning=$(
launchctl list | grep -c com.apple.driver.eficheck 
)


if [ $processor == 0 ] ; then
	output=$(sysctl -n machdep.cpu.brand_string) && passing=true
elif [ -n "$(system_profiler SPiBridgeDataType)" ] ; then
	output=$(system_profiler SPiBridgeDataType | awk -F: '/Model Name/ {print $NF}' | sed 's/^ *//')
	system_profiler SPiBridgeDataType | grep -q 'Apple T2 Security Chip' && passing=true
elif [ $daemoneunning == 0 ]; then
	output=$(EFI check daemon is not running) launchctl list | grep -c com.apple.driver.eficheck 
elif command -v /usr/libexec/firmwarecheckers/eficheck/eficheck ; then
	output=$(/usr/libexec/firmwarecheckers/eficheck/eficheck --integrity-check |  awk 'NR==2') 
	/usr/libexec/firmwarecheckers/eficheck/eficheck --integrity-check | grep -q 'No changes detected in primary hashes' && passing=true
else
	output="Command not found or efi check failed"
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
