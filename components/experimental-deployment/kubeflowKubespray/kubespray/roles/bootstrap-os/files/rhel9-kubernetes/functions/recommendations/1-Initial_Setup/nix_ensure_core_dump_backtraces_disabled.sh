#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_core_dump_backtraces_disabled.sh
# 
# Name              Date        Description
# ------------------------------------------------------------------------------------------------
# Justin Brown      03/10/23    Recommendation "Ensure core dump backtraces are disabled"
#

ensure_core_dump_backtraces_disabled()
{
   	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   	l_test=""

    ensure_core_dump_backtraces_disabled_chk()
	{
        echo -e "- Start check - Ensure core dump backtraces are disabled" | tee -a "$LOG" 2>> "$ELOG"
        l_output="" l_output2=""

        if grep -Pq -- '^\h*ProcessSizeMax\h*=\h*0' /etc/systemd/coredump.conf; then
            l_output="$(grep -PHi -- '^\h*ProcessSizeMax\h*=\h*0' /etc/systemd/coredump.conf)"
        else
            l_output2="$(grep -PHi -- '^\h*[#]?\h*ProcessSizeMax' /etc/systemd/coredump.conf)"
        fi       

        if [ -n "$l_output" ]; then
			echo -e "- PASS: Core dump backtraces ARE disabled\n  $l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure core dump backtraces are disabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: Core dump backtraces are NOT disabled" | tee -a "$LOG" 2>> "$ELOG"
            if [ -n "$l_output2" ]; then
                echo -e "  $l_output2"  | tee -a "$LOG" 2>> "$ELOG"
            else
                echo -e "'ProcessSizeMax' entry was NOT found in '/etc/systemd/coredump.conf'"  | tee -a "$LOG" 2>> "$ELOG"
            fi
			echo -e "- End check - Ensure core dump backtraces are disabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi 
    }

    ensure_core_dump_backtraces_disabled_fix()
	{
        echo -e "- Start remediation - Ensure core dump backtraces are disabled" | tee -a "$LOG" 2>> "$ELOG"

        if [ -n "$l_output2" ]; then
            echo -e "- Updating 'ProcessSizeMax' entry in /etc/systemd/coredump.conf" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/(^\s*[#]?\s*)(ProcessSizeMax\s*=\s*)(\S+\b)(.*)$/\20\4/' /etc/systemd/coredump.conf
        else
            echo -e "- Inserting 'ProcessSizeMax' entry into /etc/systemd/coredump.conf" | tee -a "$LOG" 2>> "$ELOG"
            echo "ProcessSizeMax=0" >> /etc/systemd/coredump.conf
        fi
      
        echo -e "- End remediation - Ensure core dump backtraces are disabled" | tee -a "$LOG" 2>> "$ELOG"
    }

    ensure_core_dump_backtraces_disabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_core_dump_backtraces_disabled_fix
            if [ "$l_test" != "manual" ]; then
                ensure_core_dump_backtraces_disabled_chk
                if [ "$?" = "101" ] ; then
                    [ "$l_test" != "failed" ] && l_test="remediated"
                else
                    l_test="failed"
                fi
            fi
        fi
	fi
	
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