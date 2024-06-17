#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/21/21   Check kernel parameter
# E. Pinnell   12/03/21   Modified to deal with potential white space in the XCCDF_VALUE_REGEX variable
# E. Pinnell   12/20/21   Modified to correct false positive and potential false negative
# E. Pinnell   01/20/22   Modified to simplify check and improve output
# E. Pinnell   08/05/22   Modified to account for UFW and improve output
# E. Pinnell   11/03/22   Modified to improve setting of variables
#

l_output="" l_output2=""
l_kpname="$(awk -F= '{print $1}' <<< "$XCCDF_VALUE_REGEX" | xargs)"
l_kpvalue="$(awk -F= '{print $2}' <<< "$XCCDF_VALUE_REGEX" | xargs)"
l_searchloc="/run/sysctl.d/*.conf /etc/sysctl.d/*.conf /usr/local/lib/sysctl.d/*.conf /usr/lib/sysctl.d/*.conf /lib/sysctl.d/*.conf /etc/sysctl.conf $([ -f /etc/default/ufw ] && awk -F= '/^\s*IPT_SYSCTL=/ {print $2}' /etc/default/ufw)"
l_krp="$(sysctl "$l_kpname" | awk -F= '{print $2}' | xargs)"
l_pafile="$(grep -Psl -- "^\h*$l_kpname\h*=\h*$l_kpvalue\b\h*(#.*)?$" $l_searchloc)"
l_fafile="$(grep -s -- "^\s*$l_kpname" $l_searchloc | grep -Pv -- "\h*=\h*$l_kpvalue\b\h*" | awk -F: '{print $1}')"
if [ "$l_krp" = "$l_kpvalue" ]; then
   l_output="$l_output\n - \"$l_kpname\" is set to \"$l_kpvalue\" in the running configuration"
else
   l_output2="$l_output2\n - \"$l_kpname\" is set to \"$l_krp\" in the running configuration"
fi
if [ -n "$l_pafile" ]; then
   l_output="$l_output\n - \"$l_kpname\" is set to \"$l_kpvalue\" in \"$l_pafile\""
else
   l_output2="$l_output2\n - \"$l_kpname = $l_kpvalue\" is not set in a kernel parameter configuration file"
fi
[ -n "$l_fafile" ] && l_output2="$l_output2\n - \"$l_kpname\" is set incorrectly in \"$l_fafile\""
# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi