#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Eric Pinnell        04/23/20   Test Systemwide Applications for other write
# 

#find /Applications -name '*.app' -exec ls -l {} \; | while read -r file; do
#	if echo "$file" | grep -Eq '^\s*d\S\S\S\S\S\S\Sw\S'; then
#	    # If we have a match, we failed, so fail and exit the shell
#		echo "Failed: Other has write permissions on *.app in /Applications"
#		exit "${XCCDF_RESULT_FAIL:-102}"
#	fi
## If shell hasn't exited, we passed.
#echo "Passed: Other does not have write permissions on *.app in /Applications"
#exit "${XCCDF_RESULT_PASS:-101}"

failing=""
passing=""

for file in $(find /Applications -name '*.app' -exec ls -l {} \;);do
        echo "$file" | grep -Eq '^\s*d\S\S\S\S\S\S\Sw\S' && failing=true
done
[ "$failing" = "" ] && passing=true

# If results returns pass, otherwise fail.
if [ "$passing" = "true" ] ; then
	echo "Passed: Other does not have write permissions on *.app in /Applications"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: Other has write permissions on *.app in /Applications"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi