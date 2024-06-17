#!/usr/bin/env bash
#
# CIS-LBK general Function
# ~/CIS-LBK/functions/general/nix_root_user_check.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/08/20    General Function "Root user check"
#
ROOTUSRCK()
{
	echo "- $(date +%D-%H:%M:%S) - Starting user check" | tee -a "$LOG" 2>> "$ELOG"
	echo "- $(date +%D-%H:%M:%S) -  Verifying that this Remediation Kit is being run as the root user" | tee -a "$LOG" 2>> "$ELOG"
	echo "- $(date +%D-%H:%M:%S) -  ### Script will exit if it's not being run as root ###" | tee -a "$LOG" 2>> "$ELOG"
	if [ "$(id -u)" = 0 ]; then
		echo "- $(date +%D-%H:%M:%S) - User is root - continuing..." | tee -a "$LOG" 2>> "$ELOG"
	else
		exit 1
	fi
	echo "- $(date +%D-%H:%M:%S) - root user verification successful" | tee -a "$LOG" 2>> "$ELOG"
}
# End of Root user check