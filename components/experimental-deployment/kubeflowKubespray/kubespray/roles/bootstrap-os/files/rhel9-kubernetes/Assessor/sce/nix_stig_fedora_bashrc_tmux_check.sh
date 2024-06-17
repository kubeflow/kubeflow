#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ---------------------------------------------------------------
# J. Brown   10/28/21     Check tmux is configures in /etc/bashrc

passing=""

tmux_out=$(grep -P -- "(?i)^\h*\[ -n \"[$]ps1\" -a -z \"[$]tmux\" \] && exec tmux" /etc/bashrc)

if [ -z "$tmux_out" ]; then
	passing=false
else
	passing=true
fi

# If passing is true we pass
if [ "$passing" = false ] ; then
	echo "FAILED:"
	echo "tmux is NOT configured in /etc/bashrc"
	exit "${XCCDF_RESULT_FAIL:-102}"
else
	# print the reason why we are failing 
	echo "PASSED:"
	echo "tmux is configured in /etc/bashrc:"
	echo "$tmux_out"
	exit "${XCCDF_RESULT_PASS:-101}"
fi