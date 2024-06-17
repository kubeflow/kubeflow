#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_var_log_separate_partition.sh
#
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       07/25/22    Recommendation "Ensure separate partition exists for /var/log"

ensure_var_log_separate_partition()
{

echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""

   ensure_var_log_separate_partition_chk()
   {
      echo -e "- Start check - Ensure separate partition exists for /var/log" | tee -a "$LOG" 2>> "$ELOG"
      XCCDF_VALUE_REGEX="/var/log"
      l_partition_test=""

      if findmnt --kernel "$XCCDF_VALUE_REGEX"; then
            echo -e "- $XCCDF_VALUE_REGEX is a separate partition\n$(findmnt --kernel $XCCDF_VALUE_REGEX)" | tee -a "$LOG" 2>> "$ELOG"
            l_partition_test="passed"
      else
            echo -e "- $XCCDF_VALUE_REGEX is NOT a separate partition" | tee -a "$LOG" 2>> "$ELOG"
      fi

      if [ "$l_partition_test" = "passed" ]; then
         echo -e "- PASS:\n- $XCCDF_VALUE_REGEX is properly configured"  | tee -a "$LOG" 2>> "$ELOG"
         echo -e "- End check - Ensure separate partition exists for /var/log" | tee -a "$LOG" 2>> "$ELOG"
         return "${XCCDF_RESULT_PASS:-101}"
      else
         echo -e "- FAIL:\n- $XCCDF_VALUE_REGEX is NOT properly configured" | tee -a "$LOG" 2>> "$ELOG"
         echo -e "- End check - Ensure separate partition exists for /var/log" | tee -a "$LOG" 2>> "$ELOG"
         return "${XCCDF_RESULT_FAIL:-102}"
      fi
   }


   ensure_var_log_separate_partition_fix()
   {
      echo -e "- Start remediation - Ensure separate partition exists for /var/log" | tee -a "$LOG" 2>> "$ELOG"

      echo -e "- For new installations, during installation create a custom partition setup and specify a separate partition for /var/log.\n- For systems that were previously installed, create a new partition and configure /etc/fstab as appropriate." | tee -a "$LOG" 2>> "$ELOG"

      test=manual

      echo -e "- End remediation - Ensure separate partition exists for /var/log" | tee -a "$LOG" 2>> "$ELOG"
   }

   ensure_var_log_separate_partition_chk
   if [ "$?" = "101" ]; then
      [ -z "$test" ] && test="passed"
   else
      ensure_var_log_separate_partition_fix
      if [ "$test" != "manual" ]; then
         ensure_var_log_separate_partition_chk
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