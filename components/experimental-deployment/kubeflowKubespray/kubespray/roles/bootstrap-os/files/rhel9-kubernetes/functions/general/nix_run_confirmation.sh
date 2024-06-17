#!/usr/bin/env bash
#
# CIS-LBK general Function
# ~/CIS-LBK/functions/general/nix_run_confirmation.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/08/20    General Function "Confirm user wants to continue"
#
CONFIRM()
{
	read -p "Do you want to continue? y/n [n]: " -r
	RSP=$(echo "$REPLY" | tr '[:lower:]' '[:upper:]')
	if [[ ! $RSP =~ ^(YES|Y)$ ]]
	then
		echo "You responded with: $RSP exiting... " | tee -a "$LOG" 2>> "$ELOG"
		echo "- $(date +%D-%H:%M:%S) - user responded with $RSP - exiting Build Kit" | tee -a "$LOG" 2>> "$ELOG"
		exit 0
	else
		echo "You responded with: $RSP continuing... " | tee -a "$LOG" 2>> "$ELOG"
		echo "- $(date +%D-%H:%M:%S) - user responded with $RSP - continuing" | tee -a "$LOG" 2>> "$ELOG"
	fi


#	echo "Do you want to continue? y/n [n]: "
#	RSP=$(echo "$REPLY" | tr '[:upper:]' '[:lower:]')
#	if [ "$RSP" != yes ] && [ "$RSP" != "y" ]; then
#		echo "You responded with: $RSP exiting... " | tee -a "$LOG" 2>> "$ELOG"
#		echo "- $(date +%D-%H:%M:%S) - user responded with $RSP - exiting Remediation Kit" | tee -a "$LOG" 2>> "$ELOG"
#		exit 0
#	else
#		echo "You responded with: $RSP continuing... " | tee -a "$LOG" 2>> "$ELOG"
#		echo "- $(date +%D-%H:%M:%S) - user responded with $RSP - continuing" | tee -a "$LOG" 2>> "$ELOG"
#	fi
}
# End of Confirm user wants to continue