#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 16.9
#This script checks the local user accounts for dormancy.  If any local user accounts are enabled and have been inactive for too long, this script fails.

#Change Log
#2019-05-16 Added the 32-bit check to rerun the script using 64-bit PowerShell so the Get-LocalUser module would work.  
    #Also, added another output statement in the foreach loop to write the last logon time of enabled users.
    #Also, removed redundant check for maximum inactivity days

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 16.9");

#Check if 32-bit PowerShell is running.  If so, relaunch script using 64-bit PowerShell
if ([IntPtr]::size -eq 4) {
    Write-Host ("32-bit detected - relaunching script under 64-bit PowerShell");
    & (Join-Path ($PSHOME -replace 'syswow64', 'sysnative') powershell.exe) -File $script:MyInvocation.MyCommand.Path @args
    Exit $LastExitCode;
}

#Get the local user accounts and write the total number
$localUsers = Get-LocalUser;
Write-Host ($localUsers.Count, "local users found.");

#Set the Maximum number of Inactivity Days before an account is considered dormant.  Default value is 30 days.
#Change this value as appropriate for your organization 
#$maxInactivityDays = 30;
$maxInactivityDays = $env:XCCDF_VALUE_16_9_MAX_INACTIVITY_DAYS; #this value can be customized in the CIS-CAT Assessor properties file, 30 days is default

#Check that the maximum inactivity days is a valid value
if ($maxInactivityDays -lt 0) {
    Write-Host ("Fail - Invalid Maximum Inactivity Days.  Check Assessor Properties file.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Calculate the date window based on that number of days
$inactivityDate = (get-date).adddays(-1 * $maxInactivityDays);

#loop through each of the local user accounts and for those that are enabled, check to see if the last logon date is within the time window
foreach ($localUser in $localUsers) {    
    if ($localUser.Enabled) {
        Write-Host ($localUser, "enabled.  Last logon date =", $localUser.LastLogon);
        if ($localUser.LastLogon -lt $inactivityDate) {
            #if the account has never been logged into, see if the password was last set within the time window (ex: new account created, but not yet logged into)
            if ($localUser.LastLogon.Year -le 0) {
                Write-Host ($localUser.Name, "has no LastLogon date, checking PasswordLastSet instead");
                if ($localUser.PasswordLastSet -lt $inactivityDate) {
                    Write-Host ("Fail -", $localUser.Name, "account was not active within the", $maxInactivityDays, "day window");
                    Exit $env:XCCDF_RESULT_FAIL;
                } #end if $localUser.PasswordLastSet -lt $inactivityDate
            } #end $localUser.LastLogon.Year -le 0
            else {
                Write-Host ("Fail -", $localUser.Name, "has not logged in within the", $maxInactivityDays, "day window");
                Exit $env:XCCDF_RESULT_FAIL;
            } #end else
        } #end if $localUser.LastLogon -lt $inactivityDate
    } #end if $localUser.Enabled
} #end foreach

#if this point is reached, no dormant local user accounts were discovered, so exit with a Pass
Write-Host ("Pass - All enabled local user accounts have logged in within", $maxInactivityDays, "days.");
Exit $env:XCCDF_RESULT_PASS;