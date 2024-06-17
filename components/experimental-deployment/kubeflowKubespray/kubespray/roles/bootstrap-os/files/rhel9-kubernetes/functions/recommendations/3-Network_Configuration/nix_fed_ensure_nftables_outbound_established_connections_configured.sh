#!/usr/bin/env bash

#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_nftables_outbound_established_connections_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       06/30/22    Recommendation "Ensure nftables outbound and established connections are configured"
#

fed_ensure_nftables_outbound_established_connections_configured()
{
	# Start recommendation entirely for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	test=""
	nix_package_manager_set()
	{
		echo "- Start - Determine system's package manager " | tee -a "$LOG" 2>> "$ELOG"
		if command -v rpm > /dev/null 2>&1; then
			echo "- system is rpm based" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="rpm -q"
			command -v yum > /dev/null 2>&1 && G_PM="yum" && echo "- system uses yum package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v dnf > /dev/null 2>&1 && G_PM="dnf" && echo "- system uses dnf package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v zypper > /dev/null 2>&1 && G_PM="zypper" && echo "- system uses zypper package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PR="$G_PM -y remove"
			export G_PQ G_PM G_PR
			echo "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		elif command -v dpkg-query > /dev/null 2>&1; then
			echo -e "- system is apt based\n- system uses apt package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="dpkg-query -W"
			G_PM="apt"
			G_PR="$G_PM -y purge"
			export G_PQ G_PM G_PR
			echo "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Unable to determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="unknown"
			G_PM="unknown"
			export G_PQ G_PM G_PR
			echo "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	fed_firewall_chk()
	{
		echo "- Start - Check to determine Firewall in use on the system" | tee -a "$LOG" 2>> "$ELOG"
		# Firewall Options:
		# Firewalld               - FWd
		# NFTables                - NFt
		# IPTables                - IPt
		# No firewall installed   - FNi
		# Multiple firewalls used - MFu
		# Firewall Unknown        - UKn	
		G_FWIN=""

		# Check is package manager is defined
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
		fi

		# Check FirewallD status
		echo "- Start - Determine FirewallD status" | tee -a "$LOG" 2>> "$ELOG"
		l_fwds=""
		if ! $G_PQ firewalld >/dev/null; then
			l_fwds="nnn"
			echo "- FirewallD is not install on the system" | tee -a "$LOG" 2>> "$ELOG"
		else
			echo "- FirewallD is installed on the system"  | tee -a "$LOG" 2>> "$ELOG"
			if systemctl is-enabled firewalld | grep -q 'enabled' && systemctl is-active firewalld | grep -q 'active'; then
				l_fwds="yyy"
				echo "- FirewallD is installed on the system, is enabled, and is active" | tee -a "$LOG" 2>> "$ELOG"
			elif systemctl is-enabled firewalld | grep -q 'enabled' && ! systemctl is-active firewalld | grep -q 'active'; then
				l_fwds="yyn"
				echo "- FirewallD is installed on the system, is enabled, but is not active" | tee -a "$LOG" 2>> "$ELOG"
			elif ! systemctl is-enabled firewalld | grep -q 'enabled' && systemctl is-active firewalld | grep -q 'active'; then
				l_fwds="yny"
				echo "- FirewallD is installed on the system, is disabled, but is active" | tee -a "$LOG" 2>> "$ELOG"
			else
				l_fwds="ynn"
				echo "- FirewallD is installed on the system, is disabled, and is not active"  | tee -a "$LOG" 2>> "$ELOG"
			fi
		fi	
		echo "- End - Determine FirewallD status" | tee -a "$LOG" 2>> "$ELOG"
		
		# Check NFTables status
		echo "- Start - Determine NFTables status" | tee -a "$LOG" 2>> "$ELOG"
		l_nfts=""
		l_nftr=""
		if ! $G_PQ nftables >/dev/null; then
			l_nfts="nnn"
			echo "- NFTables is not install on the system" | tee -a "$LOG" 2>> "$ELOG"
		else
			echo "- NFTables is installed on the system"  | tee -a "$LOG" 2>> "$ELOG"
			if systemctl is-enabled nftables | grep -q 'enabled' && systemctl is-active nftables | grep -q 'active'; then
				l_nfts="yyy"
				echo "- NFTables is installed on the system, is enabled, and is active" | tee -a "$LOG" 2>> "$ELOG"
			elif systemctl is-enabled nftables | grep -q 'enabled' && ! systemctl is-active nftables | grep -q 'active'; then
				l_nfts="yyn"
				echo "- NFTables is installed on the system, is enabled, but is not active" | tee -a "$LOG" 2>> "$ELOG"
			elif ! systemctl is-enabled nftables | grep -q 'enabled' && systemctl is-active nftables | grep -q 'active'; then
				l_nfts="yny"
				echo "- NFTables is installed on the system, is disabled, but is active" | tee -a "$LOG" 2>> "$ELOG"
			else
				l_nfts="ynn"
				echo "- NFTables is installed on the system, is disabled, and is not active"  | tee -a "$LOG" 2>> "$ELOG"
			fi
			if [ -n "$(nft list ruleset)" ]; then
				l_nftr="y"
				echo "- NFTables rules exist on the system" | tee -a "$LOG" 2>> "$ELOG"
			fi
		fi
		echo "- End - Determine NFTables status" | tee -a "$LOG" 2>> "$ELOG"
		
		# Check IPTables status
		echo "- Start - Determine IPTables status" | tee -a "$LOG" 2>> "$ELOG"
		l_ipts=""
		l_iptr=""
		if ! $G_PQ iptables >/dev/null; then
			l_ipts="nnn"
			echo "- IPTables is not install on the system" | tee -a "$LOG" 2>> "$ELOG"
		else
			echo "- IPTables is installed on the system" | tee -a "$LOG" 2>> "$ELOG"
			if iptables -n -L -v --line-numbers | grep -Eq '^[0-9]+'; then
				l_iptr="y"
				echo "- IPTables rules exist on the system" | tee -a "$LOG" 2>> "$ELOG"
			fi
			if $G_PQ iptables-services >/dev/null; then
				echo "- IPTables service package \"iptables-services\" is installed" | tee -a "$LOG" 2>> "$ELOG"
				if systemctl is-enabled iptables | grep -q 'enabled' && systemctl is-active iptables | grep -q 'active'; then
					l_ipts="yyy"
					echo "- iptables-service is installed on the system, is enabled, and is active" | tee -a "$LOG" 2>> "$ELOG"
				elif systemctl is-enabled iptables | grep -q 'enabled' && ! systemctl is-active iptables | grep -q 'active'; then
					l_ipts="yyn"
					echo "- iptables-service is installed on the system, is enabled, but is not active" | tee -a "$LOG" 2>> "$ELOG"
				elif ! systemctl is-enabled iptables | grep -q 'enabled' && systemctl is-active iptables | grep -q 'active'; then
					l_ipts="yny"
					echo "- iptables-service is installed on the system, is disabled, but is active" | tee -a "$LOG" 2>> "$ELOG"
				else
					l_ipts="ynn"
					echo "- iptables-service is installed on the system, is disabled, and is not active"  | tee -a "$LOG" 2>> "$ELOG"
				fi
			else
				echo "- iptables-service is not installed on the system"
				l_ipts="ynn"
			fi	
		fi
		echo "- End - Determine IPTables status" | tee -a "$LOG" 2>> "$ELOG"
		
		# Determin which firewall is in use
		echo "- Start - Determine which firewall is in use" | tee -a "$LOG" 2>> "$ELOG"
		# Check for no installed firewall
		if [[ "$l_fwds" = "nnn" && "$l_nfts" = "nnn" && "$l_ipts" = "nnn" ]]; then
			G_FWIN="NFi"
		# Check for multiple firewalls
		elif [[ "$l_nftr" = "y" && "$l_iptr" = "y" ]] || [[ "$l_fwds" =~ yy. && "$l_nfts" =~ yy. ]] || [[ "$l_fwds" =~ yy. && "$l_ipts" =~ yy. ]] || [[ "$l_nfts" =~ yy. && "$l_ipts" =~ yy. ]]; then
			G_FWIN="MFu"
		else
			# Check for which firewall
			# Check for FirewallD
			if [[ "$l_fwds" =~ yy. && "$l_nfts" =~ .nn && "$l_ipts" =~ .nn ]] && [[ "$l_nfts" =~ y.. || "$l_ipts" =~ y.. ]]; then
				G_FWIN="FWd"
			fi
			# Check for NFTables
			if [[ "$l_nfts" =~ yy. && "$l_fwds" =~ .nn && "$l_ipts" =~ .nn && -z "$l_iptr" ]]; then
				G_FWIN="NFt"
			fi
			# Check for IPTables
			if [[ -z "$G_FWIN" && "$l_ipts" =~ y.. && "$l_fwds" =~ .nn && "$l_nfts" =~ .nn && -z "$l_nftr" ]]; then
				G_FWIN="IPt"
			fi
		fi
		echo "- End - Determine which firewall is in use" | tee -a "$LOG" 2>> "$ELOG"
		
		# Output results
		case "$G_FWIN" in
			FWd)
				echo "- Firewall determined to be FirewallD. Checks for NFTables and IPTables will be marked as Non Applicable" | tee -a "$LOG" 2>> "$ELOG"
				;;
			NFt)
				echo "- Firewall determined to be NFTables. Checks for FirewallD and IPTables will be marked as Non Applicable" | tee -a "$LOG" 2>> "$ELOG"
				;;
			IPt)
				echo "- Firewall determined to be IPTables. Checks for FirewallD and NFTables will be marked as Non Applicable" | tee -a "$LOG" 2>> "$ELOG"
				;;
			NFi)
				echo "- No firewall is installed on the system. Firewall recommendations will be marked as MANUAL" | tee -a "$LOG" 2>> "$ELOG"
				G_FWIN="UKn"
				;;
			MFu)
				echo "- Multiple firewalls in use on the system. Firewall recommendations will be marked as MANUAL" | tee -a "$LOG" 2>> "$ELOG"
				G_FWIN="UKn"
				;;
			*)
				echo "- Unable to determine firewall. Firewall recommendations will be marked as MANUAL" | tee -a "$LOG" 2>> "$ELOG"
				G_FWIN="UKn"
				;;
		esac
		export G_FWIN
		echo "- End - Check to determine Firewall in use on the system" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	fed_ensure_nftables_outbound_established_connections_configured_chk()
	{
		echo "- Start check - Ensure nftables outbound and established connections are configured" | tee -a "$LOG" 2>> "$ELOG"
		output=""
      l_input_tcp_established="" l_input_udp_established="" l_input_icmp_established="" l_input_ruleset=""
      l_output_tcp_established="" l_output_udp_established="" l_output_icmp_established="" l_output_ruleset=""
			
		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && output="- Unable to determine system's package manager"
		fi
		
      # Collect nftables tables
      l_input_tcp_established=$(nft list ruleset | awk '/hook input/,/}/' | grep -E 'ip protocol tcp ct state established')
      l_input_udp_established=$(nft list ruleset | awk '/hook input/,/}/' | grep -E 'ip protocol udp ct state established')
      l_input_icmp_established=$(nft list ruleset | awk '/hook input/,/}/' | grep -E 'ip protocol icmp ct state established')
      
      l_output_tcp_established=$(nft list ruleset | awk '/hook output/,/}/' | grep -E 'ip protocol tcp ct state established,related,new')
      l_output_udp_established=$(nft list ruleset | awk '/hook output/,/}/' | grep -E 'ip protocol udp ct state established,related,new')
      l_output_icmp_established=$(nft list ruleset | awk '/hook output/,/}/' | grep -E 'ip protocol icmp ct state established,related,new')
		
      # Check INPUT rules
      if [ -n "$l_input_tcp_established" ]; then
         echo "- Found INPUT TCP Established rule" | tee -a "$LOG" 2>> "$ELOG"
         if [ -n "$l_input_udp_established" ]; then
            echo "- Found INPUT UDP Established rule" | tee -a "$LOG" 2>> "$ELOG"
            if [ -n "$l_input_icmp_established" ]; then
               echo "- Found INPUT ICMP Established rule" | tee -a "$LOG" 2>> "$ELOG"
               l_input_ruleset=passed
            else
               echo "- NO INPUT ICMP Established rule found" | tee -a "$LOG" 2>> "$ELOG"
            fi
         else
            echo "- NO INPUT UDP Established rule found" | tee -a "$LOG" 2>> "$ELOG"
         fi
      else
         echo "- NO INPUT TCP Established rule found" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      # Check OUTPUT rules
      if [ -n "$l_output_tcp_established" ]; then
         echo "- Found OUTPUT TCP Established rule" | tee -a "$LOG" 2>> "$ELOG"
         if [ -n "$l_output_udp_established" ]; then
            echo "- Found OUTPUT UDP Established rule" | tee -a "$LOG" 2>> "$ELOG"
            if [ -n "$l_output_icmp_established" ]; then
               echo "- Found OUTPUT ICMP Established rule" | tee -a "$LOG" 2>> "$ELOG"
               l_output_ruleset=passed
            else
               echo "- NO OUTPUT ICMP Established rule found" | tee -a "$LOG" 2>> "$ELOG"
            fi
         else
            echo "- NO OUTPUT UDP Established rule found" | tee -a "$LOG" 2>> "$ELOG"
         fi
      else
         echo "- NO OUTPUT TCP Established rule found" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      # if ruleset passes, we pass
		if [ "$l_input_ruleset" = passed ] && [ "$l_output_ruleset" = passed ] ; then
			echo "- Rules for new outbound and established connections were found" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - Ensure nftables outbound and established connections are configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
			echo "- Some Rules for new outbound and established connections were missing" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - Ensure nftables outbound and established connections are configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	fed_ensure_nftables_outbound_established_connections_configured_fix()
	{
		echo -e "- Start remediation - Ensure nftables outbound and established connections are configured" | tee -a "$LOG" 2>> "$ELOG"
		
      echo -e "- Add rules to allow new outbound and established connections according to your local site policies." | tee -a "$LOG" 2>> "$ELOG"
      echo -e "- These example rules can be used if desired:\n nft add rule inet filter input ip protocol tcp ct state established accept\n nft add rule inet filter input ip protocol udp ct state established accept\n nft add rule inet filter input ip protocol icmp ct state established accept\n nft add rule inet filter output ip protocol tcp ct state new,related,established accept\n nft add rule inet filter output ip protocol udp ct state new,related,established accept\n nft add rule inet filter output ip protocol icmp ct state new,related,established accept" | tee -a "$LOG" 2>> "$ELOG"
      test=manual
      
		echo -e "- End remediation - Ensure nftables outbound and established connections are configured" | tee -a "$LOG" 2>> "$ELOG"
	}

	# Set firewall applicability
	[ -z "$G_FWIN" ] && fed_firewall_chk
	# Check to see if recommendation is applicable
   echo "- Firewall is: $G_FWIN" | tee -a "$LOG" 2>> "$ELOG"
	if [ "$G_FWIN" = "UKn" ]; then
		echo "- Firewall is unknown, Manual review is required" | tee -a "$LOG" 2>> "$ELOG"
		test="manual"
	elif [ "$G_FWIN" != "NFt" ]; then
		echo "- NFTables is not in use on the system, recommendation is not applicable" | tee -a "$LOG" 2>> "$ELOG"
		test="NA"
	else
		fed_ensure_nftables_outbound_established_connections_configured_chk
		if [ "$?" = "101" ]; then
			[ -z "$test" ] && test="passed"
		else
			fed_ensure_nftables_outbound_established_connections_configured_fix
			fed_ensure_nftables_outbound_established_connections_configured_chk
			if [ "$?" = "101" ]; then
				[ "$test" != "failed" ] && test="remediated"
			fi
		fi
	fi

	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
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