#!/usr/bin/env sh


# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ---------------------------------------------------------------------------
# J. Brown   10/22/21    Check system commands group ownership (including symlinks)
# J. Brown   12/8/21     Made outputs more generic and useful

# XCCDF_VALUE_REGEX should contain the required group or a space separated list of allowed groups
# example: "/bin /sbin /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin:root tty slocate"

passing=false
grp_cmd=""

dirs=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $1}')
grp_var=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $2}')

# Create group owner list for find commands
for grp in $grp_var; do
	if [ -z $grp_cmd ] ; then
		grp_cmd="$grp"
	else
		grp_cmd="$grp_cmd -o -group $grp"
	fi
done

file_list=$(find -L $dirs ! "(" -group $grp_cmd ")" -type f -exec ls -l {} \;)

if [ -z "$file_list" ] ; then
	passing=true
fi

# If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	echo "All group ownership on $dirs is proper."
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing 
	echo "FAILED: File(s) exist with improper groups:"
	echo "$file_list"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi