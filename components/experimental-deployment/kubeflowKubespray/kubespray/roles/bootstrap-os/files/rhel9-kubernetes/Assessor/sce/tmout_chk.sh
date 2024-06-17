#!/usr/bin/env bash

# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/01/20   Check that TMOUT is configured
# E. Pinnell   03/29/21   Corrected regex and simplified script
# E. Pinnell   09/01/22   Corrected #! and changed to horizontal whitespace
# E. Pinnell   04/04/23   Modified to improve output
# E. Pinnell   05/22/23   Modified to use "<<<" opposed to "< <" for redirect into loop for FED28 based distributions with CIS-CAT

l_output="" l_output2=""
l_tmv_max="900"
l_searchloc="/etc/bashrc /etc/bash.bashrc /etc/profile /etc/profile.d/*.sh"
a_tmofile=()
while read -r l_file; do
	[ -e "$l_file" ] && a_tmofile+=("$(readlink -f "$l_file")")
done <<< "$(grep -PRils '^\h*([^#\n\r]+\h+)?TMOUT=\d+\b' $l_searchloc)"
if ! (( ${#a_tmofile[@]} > 0 )); then
	l_output2="$l_output2\n - TMOUT is not set"
elif (( ${#a_tmofile[@]} > 1 )); then
	l_output2="$l_output2\n - TMOUT is set in multiple locations.\n  - List of files where TMOUT is set:\n$(printf '%s\n' "${a_tmofile[@]}")\n  - end of list\n"
else
	for l_file in "${a_tmofile[@]}"; do
		if (( "$(grep -Pci '^\h*([^#\n\r]+\h+)?TMOUT=\d+' "$l_file")" > 1 )); then
			l_output2="$l_output2\n - TMOUT is set multiple times in \"$l_file\""
		else
			l_tmv="$(grep -Pi '^\h*([^#\n\r]+\h+)?TMOUT=\d+' "$l_file" | grep -Po '\d+')"
			if (( "$l_tmv" > "$l_tmv_max" )); then
				l_output2="$l_output\n - TMOUT is \"$l_tmv\" in \"$l_file\"\n  - Should be \"$l_tmv_max\" or less and not \"0\""
			else
				l_output="$l_output\n- TMOUT is correctly set to \"$l_tmv\" in \"$l_file\""
				if grep -Piq '^\h*([^#\n\r]+\h+)?readonly\h+TMOUT\b' "$l_file"; then
					l_output="$l_output\n- TMOUT is correctly set to \"readonly\" in \"$l_file\""
				else
					l_output2="$l_output2\n- TMOUT is not set to \"readonly\""
				fi
				if grep -Piq '^(\h*|\h*[^#\n\r]+\h*;\h*)export\h+TMOUT\b' "$l_file"; then
					l_output="$l_output\n- TMOUT is correctly set to \"export\" in \"$l_file\""
				else
					l_output2="$l_output2\n- TMOUT is not set to \"export\""
				fi
			fi
		fi
	done
fi
unset a_tmofile # Remove array
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n$l_output\n"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
	[ -n "$l_output" ] && echo -e "- * Correctly configured * :\n$l_output\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi