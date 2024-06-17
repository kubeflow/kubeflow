#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/10/22   Check service process is owned by user

{
	echo -e "- Start check - systemd service process is owned by user"
	# XCCDF_VALUE_REGEX needs to be {[S]ERVICE_NAME}:{USER_NAME} example: "[c]hronyd:_chrony"
	sname="$(awk -F: '{print $1}' <<< "$XCCDF_VALUE_REGEX" | xargs)"
	uname="$(awk -F: '{print $2}'  <<< "$XCCDF_VALUE_REGEX" | xargs)"
	cmdout="$(ps -ef | grep "$sname")"
	# output="$(ps -ef | awk '/'"$sname"'/ { print "- systemd service: \""$8"\" with PID: \""$2"\"  is owned by user: \""$1"\"" }')"
	output="$(awk '{ print "- systemd service: \""$8"\" with PID: \""$2"\"  is owned by user: \""$1"\"" }' <<< "$cmdout")"
		
	if ! grep -vq "$uname" <<< "$cmdout"; then
		echo -e "- PASS!\n$output"
		echo -e "- End check - systemd service process is owned by user"
		exit "${XCCDF_RESULT_PASS:-101}"
	else
		echo -e "- FAIL!\n$output"
		echo -e "- End check - systemd service process is owned by user"
		exit "${XCCDF_RESULT_FAIL:-102}"
	fi
}