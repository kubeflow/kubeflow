#!/usr/bin/env bash
#
# CIS-LBK General Function
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/27/20   output remediation to logs and update counters
remediation_output()
{
	case "$output_code" in
		101)
			passed_recommendations=$((passed_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - PASSED - Remediation not required" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			;;
		102)
			failed_recommendations=$((failed_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - FAILED - Recommendation failed remediation" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			# Send Failed Recommendations to the FRLOG
			echo "*****************************************************************" | tee -a "$FRLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$FRLOG" 2>> "$ELOG"
			echo " - FAILED - Recommendation failed remediation" | tee -a "$FRLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$FRLOG" 2>> "$ELOG"
			;;
		103)
			remediated_recommendations=$((remediated_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - REMEDIATED - Recommendation successfully remediated" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			;;
		104)
			not_applicable_recommendations=$((not_applicable_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - N/A - Recommendation is non applicable" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			;;
		105)
			excluded_recommendations=$((excluded_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - EXCLUDED - Recommendation on the excluded list" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			;;
		106)
			manual_recommendations=$((manual_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - MANUAL - Recommendation needs to be remediated manually" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			# Send Manual recommendations to the MANLOG
			echo "*****************************************************************" | tee -a "$MANLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$MANLOG" 2>> "$ELOG"
			echo " - MANUAL - Recommendation needs to be remediated manually" | tee -a "$MANLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$MANLOG" 2>> "$ELOG"
			;;
		107)
			skipped_recommendations=$((skipped_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - SKIPPED - Recommendation not in selected profile" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			;;
		201)
			remediated_recommendations=$((remediated_recommendations+1))
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - REMEDIATED - Recommendation remediation run" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			;;
		*)
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - $RN - $RNA -" | tee -a "$SLOG" 2>> "$ELOG"
			echo " - ERROR - Output code not set" | tee -a "$SLOG" 2>> "$ELOG"
			echo "*****************************************************************" | tee -a "$SLOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-108}"
			;;
	esac
	output_code=""
}