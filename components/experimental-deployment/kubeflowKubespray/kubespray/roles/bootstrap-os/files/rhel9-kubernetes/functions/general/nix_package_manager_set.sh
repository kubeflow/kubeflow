#!/usr/bin/env bash
#
# CIS-LBK Remediation function
# ~/CIS-LBK/functions/general/nix_package_manager_set.sh
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   09/14/20   Set package manager to use

nix_package_manager_set()
{
	if command -v rpm 2>/dev/null; then
		PQ="rpm -q"
		command -v yum 2>/dev/null && PM="yum"
		command -v dnf 2>/dev/null && PM="dnf"
		command -v zypper 2>/dev/null && PM="zypper"
		PR="$PM -y remove"
	elif command -v dpkg 2>/dev/null; then
		PQ="dpkg -s"
		PM="apt"
		PR="$PM -y purge"
	else
		PQ="unknown"
		PM="unknown"
	fi
	export PQ PM PR
}
