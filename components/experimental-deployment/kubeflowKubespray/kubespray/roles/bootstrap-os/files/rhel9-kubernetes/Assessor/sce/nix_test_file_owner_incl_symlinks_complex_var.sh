#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ---------------------------------------------------------------------------
# J. Brown   10/22/21    Check system commands ownership (including symlinks)
# J. Brown   12/8/21     Made outputs more generic and useful

# XCCDF_VALUE_REGEX should contain the required owner or a space separated list of allowed owners
# example: "/bin /sbin /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin:root sshd"

passing=false
user_cmd=""

dirs=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $1}')
user_var=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $2}')

# Create owner list for find commands
for own in $user_var; do
	if [ -z $user_cmd ] ; then
		user_cmd="$own"
	else
		user_cmd="$user_cmd -o -user $own"
	fi
done

file_list=$(find -L $dirs ! "(" -user $user_cmd ")" -type f -exec ls -l {} \;)

if [ -z "$file_list" ] ; then
	passing=true
fi

# If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	echo "All ownership on $dirs is proper."
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing 
	echo "FAILED: File(s) exist with improper ownership:"
	echo "$file_list"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi