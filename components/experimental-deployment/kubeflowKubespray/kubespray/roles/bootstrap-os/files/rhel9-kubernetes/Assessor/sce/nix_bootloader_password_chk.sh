#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/08/21   Check that bootloader password is set
# E. Pinnell   07/19/21   Modified to correct error
# E. Pinnell   07/27/21   Modified to simplify script
# E. Pinnell   02/12/22   Modified to look at grub.cfg not grubenv in newer versions

tst1="" tst2="" output="" grubdir=""

# Determine directory containg grub files
grubdir=$(dirname "$(find /boot -type f \( -name 'grubenv' -o -name 'grub.conf' -o -name 'grub.cfg' \) -exec grep -El -- '^\s*(kernelopts=|linux|kernel)' {} \;)")

# Check user.cfg first
if [ -f "$grubdir/user.cfg" ]; then
	grep -Piq -- '^\h*GRUB2_PASSWORD\h*=\h*.+$' "$grubdir/user.cfg" && output="bootloader password set in \"$grubdir/user.cfg\""
fi

# If password isn't configured in user.cfg, check grub.cfg
if [ -z "$output" ] && [ -f "$grubdir/grub.cfg" ]; then
	grep -Piq -- '^\h*set\h+superusers\h*=\h*"?[^"\n\r]+"?(\h+.*)?$' "$grubdir/grub.cfg" && tst1=pass
	grep -Piq -- '^\h*password(_pbkdf2)?\h+\H+\h+.+$' "$grubdir/grub.cfg" && tst2=pass
	[ "$tst1" = pass ] && [ "$tst2" = pass ] && output="bootloader password set in \"$grubdir/grub.cfg\""
fi

# IF password isn't configured in either user.cfg or grub.cfg, check grub.conf
if [ -z "$output" ] && [ -f "$grubdir/grub.conf" ]; then
	grep -Piq -- '^\h*password\h+\H+\h+.+$' "$grubdir/grub.conf" && output="bootloader password set in \"$grubdir/grub.conf\""
fi

# If the output variable is set, we pass
if [ -n "$output" ] ; then
	echo "PASSED
	$output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	[ -f "$grubdir/user.cfg" ] && echo "bootloader password is not set in \"$grubdir/user.cfg\""
	[ -f "$grubdir/grub.cfg" ] && echo "bootloader password is not set in \"$grubdir/grub.cfg\""
	[ -f "$grubdir/grub.conf" ] && echo "bootloader password is not set in \"$grubdir/grub.conf\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi