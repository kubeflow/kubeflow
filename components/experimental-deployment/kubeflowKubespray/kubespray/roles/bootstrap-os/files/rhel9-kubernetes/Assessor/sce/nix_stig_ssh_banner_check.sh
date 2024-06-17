#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -----------------------------------------------------------------------
# J. Brown   10/15/21     Collect and verify banner file from sshd_config

passing="false"
banner_param=$(grep -P -- "^\s*[Bb]anner\s" /etc/ssh/sshd_config)
exp_banner="\"You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only. By using this IS (which includes any device attached to this IS), you consent to the following conditions:

-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

-At any time, the USG may inspect and seize data stored on this IS.

-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.\""

clean_exp=$(echo $exp_banner | tr -d " \t\n\r")

if [ -z  "$banner_param" ]; then
	passing=false
else
	banner_file=$(echo "$banner_param" | awk -F" " '{print $2}')
	conf_banner="$(cat "$banner_file")"
	clean_conf=$(echo $conf_banner | tr -d " \t\n\r")
	if [ "$clean_conf" == "$clean_exp" ];then
		passing=true
	fi
fi

# If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	echo "Standard Mandatory DoD Notice and Consent Banner found."
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED: Standard Mandatory DoD Notice and Consent Banner NOT found."
	echo ""
	echo "$conf_banner"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
