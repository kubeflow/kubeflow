#!/usr/bin/env sh

# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/31/20   Check that default umask is configured

passing=""
test1=""
test2=""

[ -f /etc/bashrc ] && BRC="/etc/bashrc"
[ -f /etc/bash.bashrc ] && BRC="/etc/bash.bashrc"

! grep -Ev '^\s*umask\s+\s*(0[0-7][2-7]7|[0-7][2-7]7|u=(r?|w?|x?)(r?|w?|x?)(r?|w?|x?),g=(r?x?|x?r?),o=)\s*(\s*#.*)?$' /etc/profile /etc/profile.d/*.sh "$BRC" | grep -Eq '(^|^[^#]*)umask' && test1=y
grep -Eq '^\s*umask\s+\s*(0[0-7][2-7]7|[0-7][2-7]7|u=(r?|w?|x?)(r?|w?|x?)(r?|w?|x?),g=(r?x?|x?r?),o=)\s*(\s*#.*)?$' /etc/profile /etc/profile.d/*.sh "$BRC" && test2=y

[ "$test1" = y ] && [ "$test2" = y ] && passing=true

# If the tests all pass, we pass
if [ "$passing" = true ] ; then
	echo "System Wide Default umask correctly configured"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "System Wide Default umask not correctly configured"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi