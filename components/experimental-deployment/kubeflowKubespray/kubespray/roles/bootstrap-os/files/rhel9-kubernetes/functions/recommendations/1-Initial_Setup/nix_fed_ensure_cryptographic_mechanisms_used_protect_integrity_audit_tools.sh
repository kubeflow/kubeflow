#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_cryptographic_mechanisms_protect_integrity_audit_tools.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# David Neilson      05/09/23    Recommendation "Ensure cryptographic mechanisms are used to protect the integrity of audit tools"
#

fed_ensure_cryptographic_mechanisms_used_protect_integrity_audit_tools()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	fed_ensure_cryptographic_mechanisms_used_protect_integrity_audit_tools_chk()
	{
		l_test1=""
		l_test2=""
		l_test3=""
		l_test4=""
		l_test5=""
		l_test6=""
				
		# Determine if "/sbin/auditctl p+i+n+u+g+s+b+acl+xattrs+sha512" exists in /etc/aide.conf.d/*.conf /etc/aide.conf
		if grep -Pqs -- '(^\h*\/sbin\/auditctl\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			l_test1="passed"
		fi
		
		# Determine if "/sbin/auditd p+i+n+u+g+s+b+acl+xattrs+sha512" exists in /etc/aide.conf.d/*.conf /etc/aide.conf
		if grep -Pqs -- '(^\h*\/sbin\/auditd\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			l_test2="passed"
		fi

		# Determine if "/sbin/ausearch p+i+n+u+g+s+b+acl+xattrs+sha512" exists in /etc/aide.conf.d/*.conf /etc/aide.conf
		if grep -Pqs -- '(^\h*\/sbin\/ausearch\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			l_test3="passed"
		fi

		# Determine if "/sbin/aureport p+i+n+u+g+s+b+acl+xattrs+sha512" exists in /etc/aide.conf.d/*.conf /etc/aide.conf
		if grep -Pqs -- '(^\h*\/sbin\/aureport\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			l_test4="passed"
		fi

		# Determine if "/sbin/autrace p+i+n+u+g+s+b+acl+xattrs+sha512" exists in /etc/aide.conf.d/*.conf /etc/aide.conf
		if grep -Pqs -- '(^\h*\/sbin\/autrace\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			l_test5="passed"
		fi
	
		# Determine if "/sbin/augenrules p+i+n+u+g+s+b+acl+xattrs+sha512" exists in /etc/aide.conf.d/*.conf /etc/aide.conf
		if grep -Pqs -- '(^\h*\/sbin\/augenrules\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			l_test6="passed"
		fi

		if [ "$l_test1" = "passed" -a "$l_test2" = "passed" -a "$l_test3" = "passed" -a "$l_test4" = "passed" -a "$l_test5" = "passed" -a "$l_test6" = "passed" ]; then
            echo -e "- PASS:\n- ensure cryptographic mechanisms are used to protect the integrity of audit tools"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - ensure cryptographic mechanisms are used" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		else
			echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- ensure cryptographic mechanisms are NOT being used to protect the integrity of audit tools"  | tee -a "$LOG" 2>> "$ELOG"
		 	echo "- End check - ensure cryptographic mechanisms are used" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	fed_ensure_cryptographic_mechanisms_used_protect_integrity_audit_tools_fix()
	{
		echo "- Start remediation - ensure cryptographic mechanisms are used to protect the integrity of audit tools" | tee -a "$LOG" 2>> "$ELOG"

		# Check and fix rule "/sbin/auditctl p+i+n+u+g+s+b+acl+xattrs+sha512" in /etc/aide.conf
		if ! grep -Pqs -- '(^\h*\/sbin\/auditctl\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			if grep -Pqs -- '^(#+|\h*)\h*(\/sbin\/auditctl)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
               sed -ri 's/^(#+|\s*)\s*?(\/sbin\/auditctl)(.*)$/\2 p+i+n+u+g+s+b+acl+xattrs+sha512/' /etc/aide.conf.d/*.conf /etc/aide.conf
			else
				echo "/sbin/auditctl p+i+n+u+g+s+b+acl+xattrs+sha512" >> /etc/aide.conf
			fi
		fi

		# Check and fix rule "/sbin/auditd p+i+n+u+g+s+b+acl+xattrs+sha512" in /etc/aide.conf
		if ! grep -Pqs -- '(^\h*\/sbin\/auditd\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			if grep -Pqs -- '^(#+|\h*)\h*(\/sbin\/auditd)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
               sed -ri 's/^(#+|\s*)\s*?(\/sbin\/auditd)(.*)$/\2 p+i+n+u+g+s+b+acl+xattrs+sha512/' /etc/aide.conf.d/*.conf /etc/aide.conf
			else
				echo "/sbin/auditd p+i+n+u+g+s+b+acl+xattrs+sha512" >> /etc/aide.conf
			fi
		fi

		# Check and fix rule "/sbin/ausearch p+i+n+u+g+s+b+acl+xattrs+sha512" in /etc/aide.conf
		if ! grep -Pqs -- '(^\h*\/sbin\/ausearch\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			if grep -Pqs -- '^(#+|\h*)\h*(\/sbin\/ausearch)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
               sed -ri 's/^(#+|\s*)\s*?(\/sbin\/ausearch)(.*)$/\2 p+i+n+u+g+s+b+acl+xattrs+sha512/' /etc/aide.conf.d/*.conf /etc/aide.conf
			else
				echo "/sbin/ausearch p+i+n+u+g+s+b+acl+xattrs+sha512" >> /etc/aide.conf
			fi
		fi
		
		# Check and fix rule "/sbin/aureport p+i+n+u+g+s+b+acl+xattrs+sha512" in /etc/aide.conf
		if ! grep -Pqs -- '(^\h*\/sbin\/aureport\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			if grep -Pqs -- '^(#+|\h*)\h*(\/sbin\/aureport)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
               sed -ri 's/^(#+|\s*)\s*?(\/sbin\/aureport)(.*)$/\2 p+i+n+u+g+s+b+acl+xattrs+sha512/' /etc/aide.conf.d/*.conf /etc/aide.conf
			else
				echo "/sbin/aureport p+i+n+u+g+s+b+acl+xattrs+sha512" >> /etc/aide.conf
			fi
		fi
		
		# Check and fix rule "/sbin/autrace p+i+n+u+g+s+b+acl+xattrs+sha512" in /etc/aide.conf
		if ! grep -Pqs -- '(^\h*\/sbin\/autrace\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			if grep -Pqs -- '^(#+|\h*)\h*(\/sbin\/autrace)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
               	sed -ri 's/^(#+|\s*)\s*?(\/sbin\/autrace)(.*)$/\2 p+i+n+u+g+s+b+acl+xattrs+sha512/' /etc/aide.conf.d/*.conf /etc/aide.conf
			else
				echo "/sbin/autrace p+i+n+u+g+s+b+acl+xattrs+sha512" >> /etc/aide.conf
			fi
		fi

		# Check and fix rule "/sbin/augenrules p+i+n+u+g+s+b+acl+xattrs+sha512" in /etc/aide.conf
		if ! grep -Pqs -- '(^\h*\/sbin\/augenrules\h+p\+i\+n\+u\+g\+s\+b\+acl\+xattrs\+sha512\b)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
			if grep -Pqs -- '^(#+|\h*)\h*(\/sbin\/augenrules)' /etc/aide.conf.d/*.conf /etc/aide.conf; then
				sed -ri 's/^(#+|\s*)\s*?(\/sbin\/augenrules)(.*)$/\2 p+i+n+u+g+s+b+acl+xattrs+sha512/' /etc/aide.conf.d/*.conf /etc/aide.conf
			else
				echo "/sbin/augenrules p+i+n+u+g+s+b+acl+xattrs+sha512" >> /etc/aide.conf
			fi
		fi

		echo "- End remediation - ensure cryptographic mechanisms are used to protect the integrity of audit tools" | tee -a "$LOG" 2>> "$ELOG"	
	}

	fed_ensure_cryptographic_mechanisms_used_protect_integrity_audit_tools_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		fed_ensure_cryptographic_mechanisms_used_protect_integrity_audit_tools_fix
		fed_ensure_cryptographic_mechanisms_used_protect_integrity_audit_tools_chk
		if [ "$?" = "101" ]; then
			[ -z "$l_test" ] && l_test="remediated"
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