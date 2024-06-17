#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell 08/17/21   Check symbolic link permissions
#

passing="" output="" output2="" output3=""
dpath=$(printf '%s' "$XCCDF_VALUE_REGEX" | awk -F: '{print $1}')
fpreg=$(printf '%s' "$XCCDF_VALUE_REGEX" | awk -F: '{print $2}')

if [ -e "$dpath" ]; then
   if stat -Lc "%a" "$dpath" | grep -Eq -- "$fpreg"; then
      passing=true
   else
      passing=false && output="File: \"$(readlink -f "$dpath")\" has permissions: \"$(stat -Lc "%a" "$dpath")\""
   fi

   if [ "$(stat -Lc "%u" "$dpath")" = 0 ]; then
      [ "$passing" != false ] && passing=true
   else
      passing=false && output2="File: \"$(readlink -f "$dpath")\" is owned by \"$(stat -Lc "%U" "$dpath")\""
   fi

   if [ "$(stat -Lc "%g" "$dpath")" = 0 ]; then
      [ "$passing" != false ] && passing=true
   else
      passing=false && output3="File: \"$(readlink -f "$dpath")\" belongs to group  \"$(stat -Lc "%G" "$dpath")\""
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