#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/17/21   Check default kernel parameter

tst1="" tst2="" passing=""

kpname=$(echo $XCCDF_VALUE_REGEX | cut -d= -f1)
kpvalue=$(echo $XCCDF_VALUE_REGEX | cut -d= -f2)

sysctl "$kpname" | grep -q "$kpvalue" && tst1=pass
! grep -Ps "^\h*$kpname\h*=\h*\d+\h*(\h+.*)?$" /run/sysctl.d/*.conf /etc/sysctl.d/*.conf /usr/local/lib/sysctl.d/*.conf /usr/lib/sysctl.d/*.conf /lib/sysctl.d/*.conf /etc/sysctl.conf | grep -Evq "$kpvalue" && tst2=pass
[ "$tst1" = pass ] && [ "$tst2" = pass ] && passing=true


# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "PASSED: kernel parameter: \"$kpname\" is set to: \"$kpvalue\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED:"
	[ "$tst1" != pass ] && echo "\"$kpname\" not set correctly in the running config"
	[ "$tst2" != pass ] && echo "\"$kpname\" set incorrectly: \"$(grep -Ps "^\h*$kpname\h*=\h*\d+\h*(\h+.*)?$" /run/sysctl.d/*.conf /etc/sysctl.d/*.conf /usr/local/lib/sysctl.d/*.conf /usr/lib/sysctl.d/*.conf /lib/sysctl.d/*.conf /etc/sysctl.conf | grep -Ev "$kpvalue")\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi