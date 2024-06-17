#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/22/20   Check dot files in users home directory

passing=""
output=""

#for dir in $(awk -F: '{ print $6 }' /etc/passwd); do
for dir in $(awk -F: '($1 !~ /^(root|halt|sync|shutdown)$/ && $7 != "'"$(which nologin)"'" && $7 != "/bin/false" && $7 != "/usr/bin/false") { print $6 }' /etc/passwd); do
	if [ -e "$dir"/"$XCCDF_VALUE_REGEX" ]; then
		[ -z "$output" ] && output="Failed, file(s) exist: \"$dir/$XCCDF_VALUE_REGEX\"" || output="$output, \"$dir/$XCCDF_VALUE_REGEX\""
	fi
done
[ -z "$output" ] && passing=true

# If the test passed for all home directories, we pass
if [ "$passing" = true ] ; then
	echo "Passed, no \"$XCCDF_VALUE_REGEX\" files exist"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

passing=""
output=""
output2=""
user=""
dir=""

for i in $(awk -F: '($1!~/(halt|sync|shutdown)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1":"$6}' /etc/passwd); do
	user=$(echo "$i" | cut -d: -f1)
	dir=$(echo "$i" | cut -d: -f2)
	if [ ! -d "$dir" ]; then
		[ -z "$output" ] && output="The following users' home directories don't exist: \"$user\"" || output="$output, \"$user\""
	else
		file="$dir/$XCCDF_VALUE_REGEX"
		if [ -e "$file" ]; then 
			[ -z "$output2" ] && output2="User: \"$user\" file: \"$file\" exists" || output2="$output2; User: \"$user\" file: \"$file\" exists"
		fi
	fi
done

[ -z "$output2" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed: No \"$XCCDF_VALUE_REGEX\" file exist in users' home directories"
	[ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    [ -n "$output2" ] && echo "$output2"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi