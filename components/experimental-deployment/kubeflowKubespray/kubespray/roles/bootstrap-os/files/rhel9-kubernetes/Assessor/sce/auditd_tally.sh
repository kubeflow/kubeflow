#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell 02/19/20   Test for correct auditd entry based on the passwork lockout methiod 
# 

grep -Eq '^\s*auth\s+required\s+pam_faillock\.so\s+(\S+\s+)*deny=[1-5]\s+(\S+\s*)*(\s+#.*)?$' /etc/pam.d/system-auth && grep -Eq '^\s*auth\s+\[default=die\]\s+pam_faillock\.so\s+(\S+\s+)*deny=[1-5]\s+(\S+\s*)*(\s+#.*)?$' /etc/pam.d/system-auth && grep -Eq '^\s*account\s+required\s+pam_faillock\.so\s*(\s+\S+\s*)*(\s+#.*)?$' /etc/pam.d/system-auth && test1=pass
grep -Eq '^\s*auth\s+required\s+pam_faillock\.so\s+(\S+\s+)*deny=[1-5]\s+(\S+\s*)*(\s+#.*)?$' /etc/pam.d/password-auth && grep -Eq '^\s*auth\s+\[default=die\]\s+pam_faillock\.so\s+(\S+\s+)*deny=[1-5]\s+(\S+\s*)*(\s+#.*)?$' /etc/pam.d/password-auth && grep -Eq '^\s*account\s+required\s+pam_faillock\.so\s*(\s+\S+\s*)*(\s+#.*)?$' /etc/pam.d/password-auth && test2=pass
[ "$test1" = pass ] && [ "$test2" = pass ] && tally=faillock

grep -Eq '^\s*auth\s+required\s+pam_tally2\.so\s+(\S+\s+)*deny=[1-5]\s+(\S+\s*)*(\s+#.*)?$' /etc/pam.d/system-auth && grep -Eq '^\s*account\s+required\s+pam_tally2\.so\s*(\s+\S+\s*)*(\s+#.*)?$' /etc/pam.d/system-auth && test3=pass
grep -Eq '^\s*auth\s+required\s+pam_tally2\.so\s+(\S+\s+)*deny=[1-5]\s+(\S+\s*)*(\s+#.*)?$' /etc/pam.d/password-auth && grep -Eq '^\s*account\s+required\s+pam_tally2\.so\s*(\s+\S+\s*)*(\s+#.*)?$' /etc/pam.d/password-auth && test4=pass
[ "$test3" = pass ] && [ "$test4" = pass ] && tally=tally2

if [ "$tally" = faillock ] ; then
	auditctl -l | grep -Eq '^\s*-w \/var\/run\/faillock(\/)*\s+-p\s+wa\s+-k\s+\S+ *$' && grep -Eq '^\s*-w \/var\/run\/faillock(\/)*\s+-p\s+wa\s+-k\s+\S+ *$' /etc/audit/rules.d/*.rules && passing=true
elif [ "$tally" = tally2 ] ; then
	auditctl -l | grep -Eq '^\s*-w\s+\/var\/log\/tallylog\s+-p\s+wa\s+-k\s+\S+ *$' && grep -Eq '^\s*-w\s+\/var\/log\/tallylog\s+-p\s+wa\s+-k\s+\S+ *$' /etc/audit/rules.d/*.rules && passing=true
fi

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = "true" ] ; then
	[ "$tally" = faillock ] && echo "The pam_faillock.so module is being used, and the rule \"-w /var/run/faillock/ -p wa -k logins\" exists in both the running auditd config and in a *.rules file"
	[ "$tally" = tally2 ] && echo "The pam_tally2.so module is being used, and the rule \"-w /var/log/tallylog -p wa -k logins\" exists in both the running auditd config and in a *.rules file"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	[ "$tally" != faillock ] && [ "$tally" != tally2 ] && echo "Neither pam_faillock.so or pam_tally2.so is configured"
	[ "$tally" = faillock ] && [ -z "$(auditctl -l | grep -Eq '^\s*-w \/var\/run\/faillock(\/)*\s+-p\s+wa\s+-k\s+\S+ *$')" ] && echo "The pam_faillock.so module is being used, but the rule \"-w /var/run/faillock/ -p wa -k logins\" is not in the running auditd config"
	[ "$tally" = faillock ] && [ -z "$(grep -Eq '^\s*-w \/var\/run\/faillock(\/)*\s+-p\s+wa\s+-k\s+\S+ *$' /etc/audit/rules.d/*.rules)" ] && echo "The pam_faillock.so module is being used, but the rule \"-w /var/run/faillock/ -p wa -k logins\" is not in a /etc/audit/rules.d/*.rules file"
	[ "$tally" = faillock ] && [ -z "$(auditctl -l | grep -Eq '^\s*-w\s+\/var\/log\/tallylog\s+-p\s+wa\s+-k\s+\S+ *$')" ] && echo "The pam_faillock.so module is being used, but the rule \"-w /var/log/tallylog -p wa -k logins\" is not in the running auditd config"
	[ "$tally" = faillock ] && [ -z "$(grep -Eq '^\s*-w\s+\/var\/log\/tallylog\s+-p\s+wa\s+-k\s+\S+ *$' /etc/audit/rules.d/*.rules)" ] && echo "The pam_faillock.so module is being used, but the rule \"-w /var/log/tallylog -p wa -k logins\" is not in a /etc/audit/rules.d/*.rules file"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
