#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell 03/30/21   Check symbolic link permissions
#

passing="" output="" output2="" output3=""

if [ -e "$XCCDF_VALUE_REGEX" ]; then
   if stat -Lc "%a" "$XCCDF_VALUE_REGEX" | grep -Eq '[640][40][40]'; then
      passing=true
   else
      passing=false && output="File: \"$(readlink -f "$XCCDF_VALUE_REGEX")\" has permissions: \"$(stat -Lc "%a" "$XCCDF_VALUE_REGEX")\""
   fi

   if [ "$(stat -Lc "%u" "$XCCDF_VALUE_REGEX")" = 0 ]; then
      [ "$passing" != false ] && passing=true
   else
      passing=false && output2="File: \"$(readlink -f "$XCCDF_VALUE_REGEX")\" is owned by \"$(stat -Lc "%U" "$XCCDF_VALUE_REGEX")\""
   fi

   if [ "$(stat -Lc "%g" "$XCCDF_VALUE_REGEX")" = 0 ]; then
      [ "$passing" != false ] && passing=true
   else
      passing=false && output3="File: \"$(readlink -f "$XCCDF_VALUE_REGEX")\" belongs to group  \"$(stat -Lc "%G" "$XCCDF_VALUE_REGEX")\""
   fi
fi


# If passing is true, we pass
if [ "$passing" = true ] ; then
   echo "PASSED!"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   # print the reason why we are failing
   echo "FAILED!"
   [ -n "$output" ] && echo "$output"
   [ -n "$output2" ] && echo "$output2"
   [ -n "$output3" ] && echo "$output3"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi