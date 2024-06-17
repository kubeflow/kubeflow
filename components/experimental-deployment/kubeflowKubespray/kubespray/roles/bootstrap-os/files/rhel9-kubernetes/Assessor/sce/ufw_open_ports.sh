#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   12/11/19   Check ufw open ports
# E. Pinnell   03/12/21   Modified to allow for entries without protocol
# E. Pinnell   06/21/22   Modified to allow for IPv6 and simplification
# E. Pinnell   03/21/23   Modified to use less potentially fragile check
# E. Pinnell   04/21/23   Modified regex in awk to account for IPv6 enabled systems correctly

l_output="" l_output2=""
unset a_ufwout
unset a_openports
while read -r l_ufwport; do
	[ -n "$l_ufwport" ] && a_ufwout+=("$l_ufwport")
done < <(ufw status verbose | grep -Po '^\h*\d+\b' | sort -u)
while read -r l_openport; do
	[ -n "$l_openport" ] && a_openports+=("$l_openport")
done < <(ss -tuln | awk '($5!~/%lo:/ && $5!~/127.0.0.1:/ && $5!~/\[?::1\]?:/) {split($5, a, ":"); print a[2]}' | sort -u)
a_diff=("$(printf '%s\n' "${a_openports[@]}" "${a_ufwout[@]}" "${a_ufwout[@]}" | sort | uniq -u)")
if [[ -n "${a_diff[*]}" ]]; then
	l_output2="- The following port(s) don't have a rule in UFW: $(printf '%s\n' \\n"${a_diff[*]}")\n- End List"
else
	l_output=" - All open ports have a rule in UFW"
fi
# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi