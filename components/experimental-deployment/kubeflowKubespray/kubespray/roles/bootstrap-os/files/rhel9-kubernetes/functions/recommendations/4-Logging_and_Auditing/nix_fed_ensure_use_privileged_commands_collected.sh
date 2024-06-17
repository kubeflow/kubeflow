#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_use_privileged_commands_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/05/20    Recommendation "Ensure use of privileged commands is collected"
# David Neilson	     09/05/22	 Updated to current standards
# David Neilson	     09/14/22	 Made minor syntax changes

fed_ensure_use_privileged_commands_collected()
{
	echo
        echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
        l_test=""

	# Check UID_MIN for the system
	l_umin=$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)

	fed_ensure_use_privileged_commands_collected_chk()
	{
		l_test1="passed"
                l_test1a="passed"
                l_test2=""
		l_tmp_file="/tmp/l_tmp_file$$" && touch $l_tmp_file

		# Check rules file for privileged command rules, and output of auditctl for privileged command rules
		for l_file in $(find / -xdev \( -perm -4000 -o -perm -2000 \) -type f); do
			l_rule="-a always,exit -F path=$l_file -F perm=x -F auid>=$l_umin -F auid!=4294967295 -k privileged"
			l_rfile="$(echo $l_file | sed 's/\//\\\//g')"
			XCCDF_VALUE_REGEX="^\s*-a\s+(always,exit|exit,always)\s+-F\s+path=$l_rfile\s+-F\s+perm=x\s+-F\s+auid>=$l_umin\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b"
			if grep -Eqs -- "$XCCDF_VALUE_REGEX" '\s*-a\s+(always,exit|exit,always)\s+-F\s+path=$l_rfile\s+-F\s+perm=x\s+-F\s+auid>=$l_umin\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules; then
				:
			else
				l_test1="failed"
				echo $l_rule >> $l_tmp_file
			fi

			XCCDF_VALUE_REGEX="^-a\s+(always,exit|exit,always)\s+-F\s+path=$l_file\s+-F\s+perm=x\s+-F\s+auid>=$l_umin\s+-F\s+auid!=-1\s+-F\s+key=\S+\b"
			if auditctl -l | grep -Eqs -- "$XCCDF_VALUE_REGEX"; then
				:
			else
				l_test1a="failed"
			fi
		done

		if [ "$l_test1" = "passed" -a "$l_test1a" = "passed" ]; then
			echo -e "- PASS:\n- ensure the use of privileged commands is being collected"  | tee -a "$LOG" 2>> "$ELOG"
                        echo "- End check - use of privileged commands" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-101}"
                elif [ "$l_test1" = "passed" ]; then
                        l_test2="failed"
                        echo -e "- MANUAL:\n- Reboot required to ensure the use of privileged commands is being collected"  | tee -a "$LOG" 2>> "$ELOG"
                        echo "- End check - use of privileged commands" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-106}"
                else
                        echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
                        echo "- the use of privileged commands is NOT being collected"  | tee -a "$LOG" 2>> "$ELOG"
                        echo "- End check - use of privileged commands" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_FAIL:-102}"
                fi
	}

	fed_ensure_use_privileged_commands_collected_fix()
	{
		echo "- Start remediation - ensure the use of privileged commands is being collected" | tee -a "$LOG" 2>> "$ELOG"

                cat $l_tmp_file >> /etc/audit/rules.d/50-privileged.rules

                echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
                G_REBOOT_REQUIRED="yes"
        }

	fed_ensure_use_privileged_commands_collected_chk
        if [ "$?" = "101" ]; then
                [ -z "$l_test" ] && l_test="passed"
        elif [ "$l_test2" = "failed" ]; then
                G_REBOOT_REQUIRED="yes"
                l_test="manual"
        else
                fed_ensure_use_privileged_commands_collected_fix
                [ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
                fed_ensure_use_privileged_commands_collected_chk
                if [ "$?" = "102" ]; then
                        l_test="failed"
                fi
        fi

	rm -f $l_tmp_file

	# Set return code, end recommendation entry in verbose log, and return
        case "$l_test" in
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