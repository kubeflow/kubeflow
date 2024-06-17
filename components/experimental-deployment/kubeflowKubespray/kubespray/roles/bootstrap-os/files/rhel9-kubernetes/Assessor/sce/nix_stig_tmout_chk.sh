#!/usr/bin/env sh

# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/23/21   Check that TMOUT is 600 or less (STIG)

passing="" test1="" test2="" output1="" output2=""

[ -f /etc/bashrc ] && bdir="/etc/bashrc"
[ -f /etc/bash.bashrc ] && bdir="/etc/bash.bashrc"

for f in "$bdir" /etc/profile /etc/profile.d/*.sh ; do
	if [ -f "$f" ]; then
		if grep -Pq '^\h*([^#\n\r]+;)?\h*(readonly|export(\h+[^$#;\n\r]+\h*)*)?\h*TMOUT=(600|[1-5][0-9][0-9]|[1-9][0-9]|[1-9])\b' "$f" && grep -Pq '^\h*([^#\n\r]+;)?\h*readonly\h+TMOUT\b' "$f" && grep -Pq '^\h*([^#\n\r]+;)?\h*export\h+([^$#;\n\r]+\h+)?TMOUT\b' "$f"; then
			test1=y
			output1="$f"
		fi
	else
		break
	fi
done
if ! grep -Pq '^\h*([^#\n\r]+;)?\h*TMOUT=(6[0-9][1-9]|[7-9][0-9][0-9]|0+|[1-9]\d{3,})\b' /etc/profile /etc/profile.d/*.sh "$bdir"; then
	test2="y"
else
	output2=$(grep -P '^\h*([^#\n\r]+;)?\h*TMOUT=(6[0-9][1-9]|[7-9][0-9][0-9]|0+|[1-9]\d{3,})\b' /etc/profile /etc/profile.d/*.sh $bdir)
fi

[ "$test1" = y ] && [ "$test2" = y ] && passing=true

# If the tests all pass, we pass
if [ "$passing" = true ] ; then
	echo "TMOUT is configured in: \"$output1\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	[ -z "$output1" ] && echo "TMOUT is not configured"
	[ "$test2" = n ] && echo "TMOUT is incorrectly configured in: \"$output2\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi