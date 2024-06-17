#!/usr/bin/env bash

#
# CIS-LBK General Function
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/27/20   Outputs if the recomendation should be run
#

recommendation_applicable()
{
	if [ -s "$BDIR"/exclusion_list.txt ]; then
		grep -Eq "^\s*$RN\b" "$BDIR"/exclusion_list.txt && return "${XCCDF_RESULT_FAIL:-105}"
	elif [ -s "$BDIR"/not_applicable_list.txt ]; then
		grep -Eq "^\s*$RN\b" "$BDIR"/not_applicable_list.txt && return "${XCCDF_RESULT_FAIL:-104}"
	fi
#	if [ -z "$run_profile" ]; then
#		select_profile
#	fi
	case "$run_profile" in
		L1S)
			if echo "$profile" | grep -Eq 'L1S\b'; then
				return "${XCCDF_RESULT_PASS:-101}"
			else
				return "${XCCDF_RESULT_FAIL:-107}"
			fi
			;;
		L2S)
			if echo "$profile" | grep -Eq 'L[12]S\b'; then
				return "${XCCDF_RESULT_PASS:-101}"
			else
				return "${XCCDF_RESULT_FAIL:-107}"
			fi
			;;
		L1W)
			if echo "$profile" | grep -Eq 'L1W\b'; then
				return "${XCCDF_RESULT_PASS:-101}"
			else
				return "${XCCDF_RESULT_FAIL:-107}"
			fi
			;;
		L2W)
			if echo "$profile" | grep -Eq 'L[12]W\b'; then
				return "${XCCDF_RESULT_PASS:-101}"
			else
				return "${XCCDF_RESULT_FAIL:-107}"
			fi
			;;
		*)
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}