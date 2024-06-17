#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/nix_ensure_root_path_integrity.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/25/20    Recommendation "Ensure root PATH Integrity"
# Justin Brown		 04/25/22    Update to modern format
# Justin Brown			09/08/22		Small syntax changes

ensure_root_path_integrity()
{
	# Checks root PATH integrity
	echo -e "- Start check - Ensure root PATH Integrity" | tee -a "$LOG" 2>> "$ELOG"
	
	ensure_root_path_integrity_chk()
	{
	output=""
	
	# Collect root PATH
	RPCV="$(sudo -Hiu root env | grep '^PATH' | cut -d= -f2)"
#	RPCV="/usr/local/sbin:/sbin:/bin:/usr/sbin:/usr/bin::.:/home/ec2-user:"
	# Check for empty string
	echo "$RPCV" | grep -q "::" && output="$output root's path contains a empty directory (::)"
	# Check for trailing :
	echo "$RPCV" | grep -q ":$" && output="$output root's path contains a trailing (:)"
	# Check directories
	for x in $(echo "$RPCV" | tr ":" " "); do
		if [ -d "$x" ]; then
			output="$output $(ls -ldH "$x" | awk '$9 == "." {print "PATH contains current working directory (.)"}
			$3 != "root" {print $9, "is not owned by root"}
			substr($1,6,1) != "-" {print $9, "is group writable"}
			substr($1,9,1) != "-" {print $9, "is world writable"}')"
		else
			output="$output $x is not a directory"
		fi
	done
	
	output=$(echo $output | sed -e 's/^[:space:]*//g')

	if [ -z "$output" ]; then
		echo -e "- PASS: - Root PATH passed all tests."  | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End check - Ensure root PATH Integrity." | tee -a "$LOG" 2>> "$ELOG"
		return "${XCCDF_RESULT_PASS:-101}"
	else
		echo -e "- FAIL: - \n$output" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End check - Ensure root PATH Integrity." | tee -a "$LOG" 2>> "$ELOG"
		return "${XCCDF_RESULT_FAIL:-102}"
	fi	
	}
	
	ensure_root_path_integrity_fix()
	{
		test=""
		echo -e "- Start remediation - Ensure root PATH Integrity" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Making modifications to the root users PATH could have significant unintended consequences or result in outages and unhappy users. Therefore, it is recommended that the current PATH contents be reviewed and determine the action to be taken in accordance with site policy. -" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End remediation - Ensure root PATH Integrity" | tee -a "$LOG" 2>> "$ELOG"
		test="manual"
	}
	
	ensure_root_path_integrity_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_root_path_integrity_fix
		if [ "$test" != "manual" ]; then
		    ensure_root_path_integrity_chk
        fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
		passed)
			echo -e "- Result - No remediation required\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
			;;
		remediated)
			echo -e "- Result - successfully remediated\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-103}"
			;;
		manual)
			echo -e "- Result - requires manual remediation\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-106}"
			;;
		NA)
			echo -e "- Result - Recommendation is non applicable\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-104}"
			;;
		*)
			echo -e "- Result - remediation failed\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}