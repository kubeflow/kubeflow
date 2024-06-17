#!/usr/bin/env bash
#
# CIS-LBK general function
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/28/20   Outputs run summary to terminal and main log
# J. Brown     04/08/22   Update to add setting final exit code

summary_report()
{
	clear
	echo ""
	echo " ***** Please review the logs: *****"
	echo " \"$SLOG\""
	echo " \"$MANLOG\""
	echo " \"$FRLOG\""
	echo " \"$ELOG\""
	echo "" | tee -a "$SLOG" 2>> "$ELOG"
	echo " ---------------------------TOTALS----------------------------" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - Total      - Total number of recommendations:         - $total_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - Skipped    - Recommendations not in selected profile: - $skipped_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - NA         - Recommendations that are not applicable: - $not_applicable_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - Excluded   - Recommendations on the excluded list:    - $excluded_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - Passed     - Recommendations already remediated:      - $passed_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - Remediated - Recommendations successfully remediated: - $remediated_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - Manual     - Recommendations need manual remediation  - $manual_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " - Failed     - Recommendations failed remediation:      - $failed_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo " -------------------------------------------------------------" | tee -a "$SLOG" 2>> "$ELOG"
	echo ""
	echo "            ----------------SUMMARY---------------" | tee -a "$SLOG" 2>> "$ELOG"
	echo "            -  TOTAL RECOMMENDATIONS         - $total_recommendations" | tee -a "$SLOG" 2>> "$ELOG"
	echo "            -  APPLICABLE RECOMMENDATIONS    - $((total_recommendations-skipped_recommendations-excluded_recommendations-not_applicable_recommendations))" | tee -a "$SLOG" 2>> "$ELOG"
	echo "            -  PASSING RECOMMENDATIONS       - $((passed_recommendations+remediated_recommendations))" | tee -a "$SLOG" 2>> "$ELOG"
	echo "            -  MANUAL REMEDIATION NEEDED     - $((failed_recommendations+manual_recommendations))" | tee -a "$SLOG" 2>> "$ELOG"
	echo "            --------------------------------------" | tee -a "$SLOG" 2>> "$ELOG"

	# Set final exit code
	if [ $failed_recommendations == 0 ] ; then
		exit 0
	else
		exit 1
	fi
}