#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Reduce the sudo timeout period
# Eric Pinnell        04/23/20   Fixed Test
# Edward Byrd		  06/16/22   Updated for new audit
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Update to output and audit
#

sudotimeout=$(
/usr/bin/sudo /usr/bin/sudo -V | /usr/bin/grep -c "Authentication timestamp timeout: 0.0 minutes"
)

sudotovalue=$(
/usr/bin/sudo -V | /usr/bin/grep -e "Authentication timestamp timeout:" | /usr/bin/awk '{print$4}'
)

sudoersowner=$(
/bin/ls -al /etc/ | /usr/bin/grep sudoers.d | /usr/bin/awk '{print$3}'
)

sudoersgroup=$(
/bin/ls -al /etc/ | /usr/bin/grep sudoers.d | /usr/bin/awk '{print$4}'
)

# If results returns pass, otherwise fail.
if [ $sudotimeout == 1 ] && [ "$sudoersowner" == "root" ] && [ "$sudoersgroup" == "wheel" ]; then
	echo "PASSED: The sudo timeout period is 0.0, the owner is root, and the group is wheel"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The sudo timeout period, the owner of /etc/sudoers.d/, or the group of /etc/sudoers.d/ is incorrect"
    echo "The sudo timeout is \"sudotimeout\""
    echo "The owner of the sudoers.d folder is \"sudoersowner\""
    echo "The group of the sudoers.d folder is \"sudoersgroup\""
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

