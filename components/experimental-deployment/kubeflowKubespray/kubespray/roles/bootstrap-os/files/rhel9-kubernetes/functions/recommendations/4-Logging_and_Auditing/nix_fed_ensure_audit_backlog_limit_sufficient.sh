#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_audit_backlog_limit_sufficient.sh
#
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/03/20    Recommendation "Ensure audit_backlog_limit is sufficient"
# Eric Pinnell       01/14/21    Modified - Updated variable name to correct conflict with a global variable
# David Neilson      08/02/22    Updated to current standards.

fed_ensure_audit_backlog_limit_sufficient()
{
        # Start recommendation entry for verbose log and output to screen
        echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
        l_test=""

        fed_ensure_audit_backlog_limit_sufficient_chk()
        {
                echo -e "- Start check - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"
                l_grub=""
                l_test1=""
                l_test1a=""
                l_test2=""
                l_val=""
                l_val_tst=""
                l_test2a=""
                l_audit_backlog_limit=""

                # Determine the value of audit_backlog_limit.
                l_efidir=$(find /boot/efi/EFI/* -type d -not -name 'BOOT')
                l_gbdir=$(find /boot -maxdepth 1 -type d -name 'grub*')

                if [ -f "$l_efidir"/grub.cfg ]; then
                        echo -e "- System appears to be EFI" | tee -a "$LOG" 2>> "$ELOG"
                        l_grub="EFI"
                        if grep -P "(kernelopts=|linux|kernel)" "$l_efidir"/grub.cfg | grep -Eq "audit_backlog_limit"; then
                                l_test1="passed"
                                l_audit_backlog_limit=$(sed  -n 's/.*audit_backlog_limit=\([0-9]*\)\b.*$/\1/p' "$l_efidir"/grub.cfg)
                                echo -e "- Checking audit_backlog_limit value" | tee -a "$LOG" 2>> "$ELOG"
                                for l_val in $l_audit_backlog_limit; do
                                        echo -e "- Testing collected value:  $l_val" | tee -a "$LOG" 2>> "$ELOG"
                                        if [ "$l_val" -lt 8192 ]; then
                                                echo -e "- $l_val is less than 8192" | tee -a "$LOG" 2>> "$ELOG"
                                                l_val_tst="fail"
                                        fi
                                done
                                if [ -n "$l_audit_backlog_limit" ] && [ -z "$l_val_tst" ]; then
                                        l_test1a="passed"
                                else
                                        l_test1a="failed"
                                fi
                        else
                                l_test1="failed"
                        fi
                elif [ -f "$l_gbdir"/grub.cfg ]; then
                        echo -e "- System does NOT appear to be EFI" | tee -a "$LOG" 2>> "$ELOG"
                        l_grub="GB"
                        if grep -P "(kernelopts=|linux|kernel)" "$l_gbdir"/grub.cfg | grep -Eq "audit_backlog_limit"; then
                                l_test2="passed"
                                l_audit_backlog_limit=$(sed  -n 's/.*audit_backlog_limit=\([0-9]*\)\b.*$/\1/p' "$l_gbdir"/grub.cfg)
                                echo -e "- Checking audit_backlog_limit value" | tee -a "$LOG" 2>> "$ELOG"
                                for l_val in $l_audit_backlog_limit; do
                                        echo -e "- Testing collected value:  $l_val" | tee -a "$LOG" 2>> "$ELOG"
                                        if [ "$l_val" -lt 8192 ]; then
                                                echo -e "- $l_val is less than 8192" | tee -a "$LOG" 2>> "$ELOG"
                                                l_val_tst="fail"
                                        fi
                                done
                                if [ -n "$l_audit_backlog_limit" ] && [ -z "$l_val_tst" ]; then
                                        l_test2a="passed"
                                else
                                        l_test2a="failed"
                                fi
                        else
                                l_test2="failed"
                        fi
                else
                        l_test1="failed"
                        l_test2="failed"
                fi

                # Determine if the audit_backlog_limit variable exists in the grub file, and if it is >= 8192.
                if [ "$l_test1" = "passed" ]; then
                        if [ "$l_test1a" = "passed" ]; then
                                echo -e "- PASSED:\n- audit backlog limit is set to a sufficient value" | tee -a "$LOG" 2>> "$ELOG"
                                echo -e "- End check - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"
                                return "${XCCDF_RESULT_PASS:-101}"
                        else
                                echo -e "- FAILED:\n- audit backlog limit is NOT set to a sufficiently high value" | tee -a "$LOG" 2>> "$ELOG"
                                echo -e "- End check - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"
                                return "${XCCDF_RESULT_PASS:-102}"
                        fi
                elif [ "$l_test2" = "passed" ]; then
                        if [ "$l_test2a" = "passed" ]; then
                                echo -e "- PASSED:\n- audit backlog limit is set to a sufficient value" | tee -a "$LOG" 2>> "$ELOG"
                                echo -e "- End check - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"
                                return "${XCCDF_RESULT_PASS:-101}"
                        else
                                echo -e "- FAILED:\n- audit backlog limit is NOT set to a sufficiently high value" | tee -a "$LOG" 2>> "$ELOG"
                                echo -e "- End check - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"
                                return "${XCCDF_RESULT_PASS:-102}"
                        fi
                else
                        echo -e "- FAILED:\n- audit backlog limit is NOT set" | tee -a "$LOG" 2>> "$ELOG"
                        echo -e "- End check - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-102}"
                fi
        }

        fed_ensure_audit_backlog_limit_sufficient_fix()
        {
                echo -e "- Start remediation - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"

                # If both l_test1 and l_test2 equal "failed", we don't know what the bootloader is.
                if [ "$l_test1" = "failed" ] && [ "$l_test2" = "failed" ]; then
                        echo -e "- Unknown bootloader" | tee -a "$LOG" 2>> "$ELOG"
                else
                        echo -e "- Remediation required:\n- setting audit backlog limit" | tee -a "$LOG" 2>> "$ELOG"
                        if [ "$l_test1" = "passed" ] && [ "$l_test1a" != "passed" ] || [ "$l_test2" = "passed" ] && [ "$l_test2a" != "passed" ]; then
                                echo -e "- Updating audit_backlog_limit value in /etc/default/grub" | tee -a "$LOG" 2>> "$ELOG"
                                sed -ri 's/^\s*(GRUB_CMDLINE_LINUX=")([^#"]*\s*)?(audit_backlog_limit=)([0-9]+)?(.*)$/\1\2\38192\5/' /etc/default/grub
                        else
                                if grep -Pq "^\s*GRUB_CMDLINE_LINUX=" /etc/default/grub; then
                                        echo -e "- Adding audit_backlog_limit value to GRUB_CMDLINE_LINUX in /etc/default/grub" | tee -a "$LOG" 2>> "$ELOG"
                                        sed -ri 's/^\s*(GRUB_CMDLINE_LINUX=")([^#"]*\s*)?(")(.*)$/\1\2 audit_backlog_limit=8192\3\4/' /etc/default/grub
                                else
                                        echo -e "- Inserting GRUB_CMDLINE_LINUX=\"audit_backlog_limit=8192\" to /etc/default/grub" | tee -a "$LOG" 2>> "$ELOG"
                                        echo "GRUB_CMDLINE_LINUX=\"audit_backlog_limit=8192\"" >> /etc/default/grub
                                fi
                        fi
                        echo -e "- Running 'grub2-mkconfig'" | tee -a "$LOG" 2>> "$ELOG"
                        if [ "$l_grub" = "GB" ]; then
                                grub2-mkconfig -o "$l_gbdir"/grub.cfg
                        else
                                grub2-mkconfig -o "$l_efidir"/grub.cfg
                        fi
                fi

                echo -e "- End remediation - Ensure audit_backlog_limit is sufficient" | tee -a "$LOG" 2>> "$ELOG"
        }

        fed_ensure_audit_backlog_limit_sufficient_chk
        if [ "$?" = "101" ]; then
                [ -z "$l_test" ] && l_test="passed"
        else
                fed_ensure_audit_backlog_limit_sufficient_fix
                fed_ensure_audit_backlog_limit_sufficient_chk
                if [ "$?" = "101" ]; then
                        [ "$l_test" != "failed" ] && l_test="remediated"
                else
                        l_test="failed"
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