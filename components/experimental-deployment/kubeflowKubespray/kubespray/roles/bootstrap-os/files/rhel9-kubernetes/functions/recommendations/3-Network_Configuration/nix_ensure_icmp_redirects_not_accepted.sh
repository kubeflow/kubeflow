#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_icmp_redirects_not_accepted.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/23/20    Recommendation "Ensure ICMP redirects are not accepted"
# Eric Pinnell       04/08/22    Modified to enhance logging
# Justin Brown		 11/20/22	 Refactored to use common functions
#

ensure_icmp_redirects_not_accepted()
{

	# Start recommendation entriey for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_icmp_redirects_not_accepted_chk()
	{
		echo "- Start check - Ensure ICMP redirects are not accepted" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_output2="" 
		
		l_parlist="net.ipv4.conf.all.accept_redirects=0 net.ipv4.conf.default.accept_redirects=0 net.ipv6.conf.all.accept_redirects=0 net.ipv6.conf.default.accept_redirects=0"
		l_searchloc="/run/sysctl.d/*.conf /etc/sysctl.d/*.conf /usr/local/lib/sysctl.d/*.conf /usr/lib/sysctl.d/*.conf /lib/sysctl.d/*.conf /etc/sysctl.conf $([ -f /etc/default/ufw ] && awk -F= '/^\s*IPT_SYSCTL=/ {print $2}' /etc/default/ufw)" 
		
		KPC() 
		{ 
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
		} 
		
		ipv6_chk() 
		{ 
			l_ipv6s="" 
			grubfile=$(find /boot -type f \( -name 'grubenv' -o -name 'grub.conf' -o -name 'grub.cfg' \) -exec grep -Pl -- '^\h*(kernelopts=|linux|kernel)' {} \;) 
			
			if [ -s "$grubfile" ]; then 
				! grep -P -- "^\h*(kernelopts=|linux|kernel)" "$grubfile" | grep -vq -- ipv6.disable=1 && l_ipv6s="disabled" 
			fi 
			
			if grep -Pqs -- "^\h*net\.ipv6\.conf\.all\.disable_ipv6\h*=\h*1\h*(#.*)?$" $l_searchloc && grep -Pqs -- "^\h*net\.ipv6\.conf\.default\.disable_ipv6\h*=\h*1\h*(#.*)?$" $l_searchloc && sysctl net.ipv6.conf.all.disable_ipv6 | grep -Pqs -- "^\h*net\.ipv6\.conf\.all\.disable_ipv6\h*=\h*1\h*(#.*)?$" && sysctl net.ipv6.conf.default.disable_ipv6 | grep -Pqs -- "^\h*net\.ipv6\.conf\.default\.disable_ipv6\h*=\h*1\h*(#.*)?$"; then
				l_ipv6s="disabled" 
			fi 
			
			if [ -n "$l_ipv6s" ]; then 
				l_output="$l_output\n - IPv6 is disabled on the system, \"$l_kpname\" is not applicable" 
			else 
				KPC
			fi 
		} 
		
		for l_kpe in $l_parlist; do 
			l_kpname="$(awk -F= '{print $1}' <<< "$l_kpe")" 
			l_kpvalue="$(awk -F= '{print $2}' <<< "$l_kpe")" 
			
			if grep -q '^net.ipv6.' <<< "$l_kpe"; then 
				ipv6_chk 
			else 
				KPC 
			fi 
		done 
		
		if [ -z "$l_output2" ]; then 
			echo -e "- PASS:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - Ensure ICMP redirects are not accepted" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}" 
		else 
			echo -e "- FAIL:\n - Reason(s) for audit failure:\n$l_output2\n" | tee -a "$LOG" 2>> "$ELOG"
			[ -n "$l_output" ] && echo -e "- Correctly set:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - Ensure ICMP redirects are not accepted" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}" 
		fi
	}

	ensure_icmp_redirects_not_accepted_fix()
	{
		echo "- Start remediation - Ensure ICMP redirects are not accepted" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_output2="" 
		
		l_parlist="net.ipv4.conf.all.accept_redirects=0 net.ipv4.conf.default.accept_redirects=0 net.ipv6.conf.all.accept_redirects=0 net.ipv6.conf.default.accept_redirects=0"
		l_searchloc="/run/sysctl.d/*.conf /etc/sysctl.d/*.conf /usr/local/lib/sysctl.d/*.conf /usr/lib/sysctl.d/*.conf /lib/sysctl.d/*.conf /etc/sysctl.conf $([ -f /etc/default/ufw ] && awk -F= '/^\s*IPT_SYSCTL=/ {print $2}' /etc/default/ufw)" 
		
		KPF()
		{ 
			# comment out incorrect parameter(s) in kernel parameter file(s) 
			l_fafile="$(grep -s -- "^\s*$l_kpname" $l_searchloc | grep -Pv -- "\h*=\h*$l_kpvalue\b\h*" | awk -F: '{print $1}')"
			
			for l_bkpf in $l_fafile; do 
				echo -e "\n - Commenting out \"$l_kpname\" in \"$l_bkpf\"" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri "/$l_kpname/s/^/# /" "$l_bkpf" 
			done 
			
			# Set correct parameter in a kernel parameter file 
			if ! grep -Pslq -- "^\h*$l_kpname\h*=\h*$l_kpvalue\b\h*(#.*)?$" $l_searchloc; then
				echo -e "\n - Setting \"$l_kpname\" to \"$l_kpvalue\" in \"$l_kpfile\"" | tee -a "$LOG" 2>> "$ELOG"
				echo "$l_kpname = $l_kpvalue" >> "$l_kpfile" 
			fi 
			
			# Set correct parameter in active kernel parameters 
			l_krp="$(sysctl "$l_kpname" | awk -F= '{print $2}' | xargs)" 
			
			if [ "$l_krp" != "$l_kpvalue" ]; then 
				echo -e "\n - Updating \"$l_kpname\" to \"$l_kpvalue\" in the active kernel parameters" | tee -a "$LOG" 2>> "$ELOG"
				sysctl -w "$l_kpname=$l_kpvalue" 
				sysctl -w "$(awk -F'.' '{print $1"."$2".route.flush=1"}' <<< "$l_kpname")" 
			fi 
		} 
		
		IPV6F_CHK() 
		{ 
			l_ipv6s="" 
			grubfile=$(find /boot -type f \( -name 'grubenv' -o -name 'grub.conf' -o -name 'grub.cfg' \) -exec grep -Pl -- '^\h*(kernelopts=|linux|kernel)' {} \;) 
			
			if [ -s "$grubfile" ]; then 
				! grep -P -- "^\h*(kernelopts=|linux|kernel)" "$grubfile" | grep -vq -- ipv6.disable=1 && l_ipv6s="disabled" 
			fi 
			
			if grep -Pqs -- "^\h*net\.ipv6\.conf\.all\.disable_ipv6\h*=\h*1\h*(#.*)?$" $l_searchloc && \ grep -Pqs -- "^\h*net\.ipv6\.conf\.default\.disable_ipv6\h*=\h*1\h*(#.*)?$" $l_searchloc && \ sysctl net.ipv6.conf.all.disable_ipv6 | grep -Pqs -- "^\h*net\.ipv6\.conf\.all\.disable_ipv6\h*=\h*1\h*(#.*)?$" && \ sysctl net.ipv6.conf.default.disable_ipv6 | grep -Pqs -- "^\h*net\.ipv6\.conf\.default\.disable_ipv6\h*=\h*1\h*(#.*)?$"; then
				l_ipv6s="disabled" 
			fi 
			
			if [ -n "$l_ipv6s" ]; then
				echo -e "\n - IPv6 is disabled on the system, \"$l_kpname\" is not applicable" 
			else 
				KPF 
			fi 
		} 
		
		for l_kpe in $l_parlist; do
			l_kpname="$(awk -F= '{print $1}' <<< "$l_kpe")" 
			l_kpvalue="$(awk -F= '{print $2}' <<< "$l_kpe")" 
			
			if grep -q '^net.ipv6.' <<< "$l_kpe"; then 
				l_kpfile="/etc/sysctl.d/60-netipv6_sysctl.conf"
				IPV6F_CHK 
			else 
				l_kpfile="/etc/sysctl.d/60-netipv4_sysctl.conf"
				KPF 
			fi 
		done

		echo "- End remediation - Ensure ICMP redirects are not accepted" | tee -a "$LOG" 2>> "$ELOG"
	}
			
	ensure_icmp_redirects_not_accepted_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_icmp_redirects_not_accepted_fix
		ensure_icmp_redirects_not_accepted_chk
		if [ "$?" = "101" ]; then
			[ "$l_test" != "failed" ] && l_test="remediated"
		else
			l_test="failed"
		fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$l_test" in
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