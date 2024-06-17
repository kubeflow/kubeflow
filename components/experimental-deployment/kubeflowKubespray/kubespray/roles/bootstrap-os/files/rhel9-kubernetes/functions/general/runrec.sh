#!/usr/bin/env bash

#
# CIS-LBK General Function
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/27/20   executes the reccomendation
#

runrec()
{
	recommendation_applicable
	oc1="$?"
	if [ "$oc1" = "101" ]; then
		$REC
		output_code="$?"
	else
		output_code="$oc1"
	fi
	remediation_output
	return
} 