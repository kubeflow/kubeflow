#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_cron_daemon_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/21/20    Recommendation "Ensure cron daemon is enabled and running"
# David Neilson	     04/16/22	 Added separate check and fix subfunctions, and standardized return code/recommendation entry.
# Justin Brown       09/08/22	 Small syntax changes
# David Neilson	     09/14/22    Made minor syntax changes

fed_ensure_cron_daemon_enabled()
{
        echo
        echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
        l_test=""

        fed_ensure_cron_daemon_enabled_chk()
        {
                echo -e "- Start check - Ensure cron daemon is enabled and running" | tee -a "$LOG" 2>> "$ELOG"

                # Determine if cron is enabled.
                echo "- Start check - Determining if \"cron\" is enabled and running" | tee -a "$LOG" 2>> "$ELOG"
                l_enabled=$(systemctl is-enabled crond)
                l_running=$(systemctl status  crond | grep 'Active: active (running)' | awk '{print $3}' | sed 's/[()]//g')

                if [ "$l_enabled" = "enabled" -a "$l_running" = "running" ]; then
                        echo -e "- PASS:\n- \"cron\" is enabled and running"  | tee -a "$LOG" 2>> "$ELOG"
                        echo "- End check - \"cron\"" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-101}"
                else
                        # print the reason why we are failing
                        echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
                        echo "\"cron\" is not enabled and/or running" | tee -a "$LOG" 2>> "$ELOG"
                        echo "- End check - \"cron\"" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_FAIL:-102}"
                fi

                echo -e "- End check - Ensure cron daemon is enabled and running" | tee -a "$LOG" 2>> "$ELOG"
        }

        fed_ensure_cron_daemon_enabled_fix()
        {
                echo -e "- Start remediation - Ensure cron daemon is enabled and running" | tee -a "$LOG" 2>> "$ELOG"

                if [ "$l_enabled" != "enabled" -o "$l_running" != "running" ]; then
                        if systemctl is-enabled crond | grep -q 'masked'; then
			        echo -e "- Unmasking crond service " | tee -a "$LOG" 2>> "$ELOG"
			        systemctl unmask crond
			        echo -e "- Enabling and starting crond service." | tee -a "$LOG" 2>> "$ELOG"
			        systemctl --now enable crond
		        else
			        echo -e "- Enabling and starting crond service." | tee -a "$LOG" 2>> "$ELOG"
			        systemctl --now enable crond
		        fi
                fi

                echo -e "- End remediation - Ensure cron daemon is enabled and running" | tee -a "$LOG" 2>> "$ELOG"
        }

       # Determine if cronie is installed.  If it is, run the chk and fix subfunctions.
        echo "- Determining if \"cron\" is installed on the system" | tee -a "$LOG" 2>> "$ELOG"
        if yum list installed | grep "^cronie" > /dev/null; then
                fed_ensure_cron_daemon_enabled_chk
                if [ $? -eq 101 ]; then
                        [ -z "$l_test" ] && l_test="passed"
                else
                         fed_ensure_cron_daemon_enabled_fix
                         fed_ensure_cron_daemon_enabled_chk
                         if [ "$?" = "101" ]; then
                                 [ "$l_test" != "failed" ] && l_test="remediated"
                         else
                                 l_test="failed"
                         fi
                fi
        else
                [ -z "$l_test" ] && l_test="passed"
                echo -e "- PASS:\n- \"cron\" is not installed"  | tee -a "$LOG" 2>> "$ELOG"
                echo "- End check - \"cron\"" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_PASS:-104}"
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
