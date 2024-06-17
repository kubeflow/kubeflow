#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_single_firewall_configuration_utility.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# David Neilson	     04/24/23	 "Ensure a single firewall configuration utility is in use"  
# David Neilson      05/06/23    Added "tee -a" to every "echo -e" line
 
fed_ensure_single_firewall_configuration_utility()
{
	nix_package_manager_set()
	{
		echo -e "- Start - Determine system's package manager " | tee -a "$LOG" 2>> "$ELOG"

		if command -v rpm 2>/dev/null; then
			echo -e "- system is rpm based" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="rpm -q"
			command -v yum 2>/dev/null && G_PM="yum" && echo "- system uses yum package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v dnf 2>/dev/null && G_PM="dnf" && echo "- system uses dnf package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v zypper 2>/dev/null && G_PM="zypper" && echo "- system uses zypper package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PR="$G_PM -y remove"
			export G_PQ G_PM G_PR
			echo -e "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		elif command -v dpkg 2>/dev/null; then
			echo -e "- system is apt based\n- system uses apt package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="dpkg -s"
			G_PM="apt"
			G_PR="$G_PM -y purge"
			export G_PQ G_PM G_PR
			echo -e "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Unable to determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="unknown"
			G_PM="unknown"
			export G_PQ G_PM G_PR
			echo -e "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}	

	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test="" 

	fed_ensure_single_firewall_configuration_utility_chk()
	{
		l_output="" l_output2="" l_fwd_status="" l_nft_status="" l_fwutil_status="" l_pkgmgr=""

		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && l_output="- Unable to determine system's package manager"
		fi

        # Determine FirewallD utility Status
        $G_PQ firewalld > /dev/null 2>&1 && l_fwd_status="$(systemctl is-enabled firewalld.service):$(systemctl is-active firewalld.service)"

        # Determine NFTables utility Status
        $G_PQ nftables > /dev/null 2>&1 && l_nft_status="$(systemctl is-enabled nftables.service):$(systemctl is-active nftables.service)"

        l_fwutil_status="$l_fwd_status:$l_nft_status"

        case $l_fwutil_status in
            enabled:active:masked:inactive|enabled:active:disabled:inactive) 
                l_output="\n - FirewallD utility is in use, enabled and active\n - NFTables utility is correctly disabled or masked and inactive" ;;
            masked:inactive:enabled:active|disabled:inactive:enabled:active) 
                l_output="\n - NFTables utility is in use, enabled and active\n - FirewallD utility is correctly disabled or masked and inactive" ;;
            enabled:active:enabled:active)
                l_output2="\n - Both FirewallD and NFTables utilities are enabled and active" ;;
            enabled:*:enabled:*)
                l_output2="\n - Both FirewallD and NFTables utilities are enabled" ;;
            *:active:*:active) 
                l_output2="\n - Both FirewallD and NFTables utilities are enabled" ;;
            :enabled:active) 
                l_output="\n - NFTables utility is in use, enabled, and active\n - FirewallD package is not installed" ;;
            :) 
                l_output2="\n - Neither FirewallD or NFTables is installed." ;;
            *:*:) 
                l_output2="\n - NFTables package is not installed on the system" ;;
            *) 
                l_output2="\n - Unable to determine firewall state" ;;
        esac

        if [ -z "$l_output2" ]; then
            echo -e "\n- Audit Results:\n ** Pass **\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- PASSED:\n- Ensure single firewall configuration utility in use" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - single firewall configuration utility" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
        else
            echo -e "\n- Audit Results:\n ** Fail **\n$l_output2\n" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- FAILED:\n- Ensure single firewall configuration utility in use" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - single firewall configuration utility" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
        fi

    }

	fed_ensure_single_firewall_configuration_utility_fix()
	{
		l_output="" l_output2="" l_fwd_status="" l_nft_status="" l_fwutil_status="" l_pkgmgr=""
        echo "- Start remediation - Ensure single firewall configuration utility in use" | tee -a "$LOG" 2>> "$ELOG"
		
        # Determine FirewallD utility Status
        rpm -q firewalld > /dev/null 2>&1 && l_fwd_status="$(systemctl is-enabled firewalld.service):$(systemctl is-active firewalld.service)"

        # Determine NFTables utility Status
        rpm -q nftables > /dev/null 2>&1 && l_nft_status="$(systemctl is-enabled nftables.service):$(systemctl is-active nftables.service)"

        l_fwutil_status="$l_fwd_status:$l_nft_status"

		case $l_fwutil_status in
            enabled:active:masked:inactive|enabled:active:disabled:inactive) 
                echo -e "\n - FirewallD utility is in use, enabled and active\n - NFTables utility is correctly disabled or masked and inactive\n - no remediation required" | tee -a "$LOG" 2>> "$ELOG" ;;
            masked:inactive:enabled:active|disabled:inactive:enabled:active) 
                echo -e "\n - NFTables utility is in use, enabled and active\n - FirewallD utility is correctly disabled or masked and inactive\n - no remediation required" | tee -a "$LOG" 2>> "$ELOG" ;;
            enabled:active:enabled:active)
                echo -e "\n - Both FirewallD and NFTables utilities are enabled and active\n - stopping and masking NFTables utility" | tee -a "$LOG" 2>> "$ELOG"
                systemctl stop nftables && systemctl --now mask nftables ;;
            disabled:active:disabled:inactive)
                echo -e "\n - Both FirewallD and NFTables utilities are disabled, but FirewallD is active - enabling the FirewallD utility" | tee -a "$LOG" 2>> "$ELOG"
                systemctl enable firewalld ;;
            disabled:active:masked:inactive)
                echo -e "\n - Both FirewallD and NFTables utilities are disabled, but FirewallD is active - enabling the FirewallD utility" | tee -a "$LOG" 2>> "$ELOG"
                systemctl enable firewalld ;;
            disabled|masked:inactive:disabled:active)
                echo -e "\n - Both FirewallD and NFTables utilities are disabled, but NFTables is active - enabling the NFTables utility" | tee -a "$LOG" 2>> "$ELOG"
                systemctl enable nftables ;; 
            disabled:inactive:disabled:inactive)
                echo -e "\n - Both FirewallD and NFTables utilities are disabled and inactive, enabling and starting the FirewallD utility" | tee -a "$LOG" 2>> "$ELOG"
                systemctl enable firewalld 
                systemctl start firewalld ;;
            enabled:inactive:disabled:inactive)
                echo -e "\n - FirewallD is enabled but not active, while NFTables is disabled and inactive. Starting the FirewallD utility"
                systemctl start firewalld ;;
            enabled:*:enabled:*)
                echo -e "\n - Both FirewallD and NFTables utilities are enabled\n - remediating" | tee -a "$LOG" 2>> "$ELOG"
                if [ "$(awk -F: '{print $2}' <<< "$l_fwutil_status")" = "active" ] && [ "$(awk -F: '{print $4}' <<< "$l_fwutil_status")" = "inactive" ]; then
                    echo " - masking NFTables utility"
                    systemctl stop nftables && systemctl --now mask nftables
                elif [ "$(awk -F: '{print $4}' <<< "$l_fwutil_status")" = "active" ] && [ "$(awk -F: '{print $2}' <<< "$l_fwutil_status")" = "inactive" ]; then
                    echo " - masking FirewallD utility"
                    systemctl stop firewalld && systemctl --now mask firewalld
                fi ;;
            *:active:*:active) 
                echo -e "\n - Both FirewallD and NFTables utilities are active\n - remediating" | tee -a "$LOG" 2>> "$ELOG"
                if [ "$(awk -F: '{print $1}' <<< "$l_fwutil_status")" = "enabled" ] && [ "$(awk -F: '{print $3}' <<< "$l_fwutil_status")" != "enabled" ]; then
                    echo " - stopping and masking NFTables utility"
                    systemctl stop nftables && systemctl --now mask nftables
                elif [ "$(awk -F: '{print $3}' <<< "$l_fwutil_status")" = "enabled" ] && [ "$(awk -F: '{print $1}' <<< "$l_fwutil_status")" != "enabled" ]; then
                    echo " - stopping and masking FirewallD utility"
                    systemctl stop firewalld && systemctl --now mask firewalld
                fi ;;
            :enabled:active) 
                echo -e "\n - NFTables utility is in use, enabled, and active\n - FirewallD package is not installed\n - no remediation required" | tee -a "$LOG" 2>> "$ELOG" ;;
            :) 
                echo -e "\n - Neither FirewallD or NFTables is installed.\n - remediating\n - installing NFTables" | tee -a "$LOG" 2>> "$ELOG"
                $G_PM -y install nftables ;;
            *:*:) 
                echo -e "\n - NFTables package is not installed on the system\n - remediating\n - installing NFTables" | tee -a "$LOG" 2>> "$ELOG"
               $G_PM -y install nftables ;;
            *) 
                echo -e "\n - Unable to determine firewall state" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- Verify and configure the appropriate firewall utility based on organizational policies." | tee -a "$LOG" 2>> "$ELOG"
			    l_test="manual" ;;
        esac

        echo "- End remediation - Ensure single firewall configuration utility in use" | tee -a "$LOG" 2>> "$ELOG"
	}	
	
	fed_ensure_single_firewall_configuration_utility_chk
	if [ "$?" = "101" ] ; then
		[ -z "$l_test" ] && l_test="passed"
	else
        fed_ensure_single_firewall_configuration_utility_fix
		fed_ensure_single_firewall_configuration_utility_chk
		if [ "$?" = "101" ]; then
            [ -z "$l_test" ] && l_test="remediated"
        fi
    fi

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