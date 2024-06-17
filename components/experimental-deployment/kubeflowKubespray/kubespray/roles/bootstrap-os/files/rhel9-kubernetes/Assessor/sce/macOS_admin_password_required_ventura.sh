#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  06/29/23	 New sce for checking for an admin password required in System Settings in 13.0 and beyond
#

adminpassreq=$(
authDBs=("system.preferences" "system.preferences.energysaver" "system.preferences.network" "system.preferences.printing" "system.preferences.sharing" "system.preferences.softwareupdate" "system.preferences.startupdisk" "system.preferences.timemachine")
  result="1"
  for section in ${authDBs[@]}; do
    if [[ $(/usr/bin/security -q authorizationdb read "$section" | /usr/bin/xmllint -xpath 'name(//*[contains(text(), "shared")]/following-sibling::*[1])' -) != "false" ]]; then
      result="0"
    fi
  done
  echo $result
)


if [ "$adminpassreq" = 1 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: An administrator password is required to access System Settings"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A password is not enabled to access System Settings, and it needs to be enabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi