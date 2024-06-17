#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_nonessential_services_removed_or_masked.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/03/20    Recommendation "Ensure nonessential services are removed or masked"
# Justin Brown       08/02/22    Updated to add better info and use modern format
#

ensure_nonessential_services_removed_or_masked()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""

   ensure_nonessential_services_removed_or_masked_chk()
   {
      echo -e "- Start check - Ensure nonessential services are removed or masked" | tee -a "$LOG" 2>> "$ELOG"
      l_svcs=""

      l_svcs="$(lsof -i -P -n | grep -v '(ESTABLISHED)')"

      if [ -z "$l_svcs" ]; then
			echo -e "- PASS:\n- No services appear to be listening"  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure nonessential services are removed or masked" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Services that appear to be listing: \n$l_svcs" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure nonessential services are removed or masked" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   }

   ensure_nonessential_services_removed_or_masked_fix()
   {
      echo -e "- Start remediation - Ensure nonessential services are removed or masked" | tee -a "$LOG" 2>> "$ELOG"

      echo -e "- If a listed service is not required, remove the package containing the service.\n - If the package containing the service is required, stop and mask the service." | tee -a "$LOG" 2>> "$ELOG"
      test=manual

      echo -e "- End remediation - Ensure nonessential services are removed or masked" | tee -a "$LOG" 2>> "$ELOG"
   }

   ensure_nonessential_services_removed_or_masked_chk
   if [ "$?" = "101" ]; then
      [ -z "$test" ] && test="passed"
   else
      ensure_nonessential_services_removed_or_masked_fix
      if [ "$test" != "manual" ]; then
         ensure_nonessential_services_removed_or_masked_chk
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