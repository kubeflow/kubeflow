#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/09/21   Check bootloader file permissions
# E. Pinnell   10/20/21   Modified to correct error and simplify script

tst1="" tst2="" tst3="" tst4="" output="" output2="" output3="" output4=""

grubfile=$(find /boot -type f \( -name 'grubenv' -o -name 'grub.conf' -o -name 'grub.cfg' \) -exec grep -Pl '^\h*(kernelopts=|linux|kernel)' {} \;)
grubdir=$(dirname "$grubfile")

stat -c "%a" "$grubfile" | grep -Pq '^\h*[0-7]00$' && tst1=pass
output="Permissions on \"$grubfile\" are \"$(stat -c "%a" "$grubfile")\""

stat -c "%u:%g" "$grubfile" | grep -Pq '^\h*0:0$' && tst2=pass
output2="\"$grubfile\" is owned by \"$(stat -c "%U" "$grubfile")\" and belongs to group \"$(stat -c "%G" "$grubfile")\""

if [ -f "$grubdir/user.cfg" ]; then
	stat -c "%a" "$grubdir/user.cfg" | grep -Pq '^\h*[0-7]00$' && tst3=pass
	output3="Permissions on \"$grubdir/user.cfg\" are \"$(stat -c "%a" "$grubdir/user.cfg")\""

	stat -c "%u:%g" "$grubdir/user.cfg" | grep -Pq '^\h*0:0$' && tst4=pass
	output4="\"$grubdir/user.cfg\" is owned by \"$(stat -c "%U" "$grubdir/user.cfg")\" and belongs to group \"$(stat -c "%G" "$grubdir/user.cfg")\""
else
	tst3=pass
	tst4=pass
fi

if [ "$tst1" = "pass" ] && [ "$tst2" = "pass" ] && [ "$tst3" = "pass" ] && [ "$tst4" = "pass" ]; then
	passing=true
fi

# If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED!"
	[ -n "$output" ] && echo "$output"
	[ -n "$output2" ] && echo "$output2"
	[ -n "$output3" ] && echo "$output3"
	[ -n "$output4" ] && echo "$output4"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED!"
	[ -n "$output" ] && echo "$output"
	[ -n "$output2" ] && echo "$output2"
	[ -n "$output3" ] && echo "$output3"
	[ -n "$output4" ] && echo "$output4"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi