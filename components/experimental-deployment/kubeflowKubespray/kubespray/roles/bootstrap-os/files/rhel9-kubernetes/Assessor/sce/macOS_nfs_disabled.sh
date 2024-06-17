#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         01/20/21   Verifying status of nfs server and /etc/exports
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Updated the output and audit
#

nfsstatus=$(
/bin/launchctl list | /usr/bin/grep -c com.apple.nfsd
)

exportsexist=$(
ls /etc/exports 2>/dev/null
)


if [ $nfsstatus -eq 0 ] && [ $exportsexist -n ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: NFS server is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The NFS server needs to be unloaded and disabled and/or the export folders needs to be deleted"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

