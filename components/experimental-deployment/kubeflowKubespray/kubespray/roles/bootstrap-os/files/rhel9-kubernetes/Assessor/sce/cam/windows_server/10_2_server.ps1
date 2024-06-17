#Center for Internet Security - Controls Assessment Module for Windows Server 2016
#CIS Controls v7.1 Sub-Control 10.2
#This script checks the date of the next scheduled Windows Server Backup to see if it is set to occur within the specified time frame from the current date.
#It also checks to see if the Bare Metal Recovery, SystemState, and VssFullBackup options are selected.  
#If all of these are true, the script passes.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 10.2");

#Check to see if the Windows-Server-Backup feature is installed.  Print result.  If not, exit with a FAIL.
$serverBackupInstalled = Get-WindowsFeature -Name Windows-Server-Backup
if (!$serverBackupInstalled.Installed) {
    Write-Host ("Fail - Windows-Server-Backup feature is not installed.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("Windows-Server-Backup feature is installed.");
}

#Set the maximum number of days allowed without a Windows Server Backup.  Default value is 7 days.
#Change this value as appropriate for your organization 
#$maxDaysWithoutBackup = 7;
$maxDaysWithoutBackup = $env:XCCDF_VALUE_10_2_MAX_DAYS_WITHOUT_BACKUP; #this value can be customized in the CIS-CAT Assessor properties file, 7 days is default

#Check that the maximum number of days allowed without a Windows Server Backup is a valid value
if ($maxDaysWithoutBackup -lt 0) {
    Write-Host ("Fail - Invalid value for Maximum Days Without Backup.  Check Assessor Properties file.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#get the Windows Server Backup Policy and make sure it is not null
$backupPolicy = Get-WBPolicy;
if (!$backupPolicy) {
    Write-Host ("Fail - Get-WBPolicy failed.  There does not appear to be a backup schedule created with Windows Server Backup.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("WBPolicy retrieved.");
}

#Calculate the date window for the next backup based on that number of days
$requiredNextBackup = (get-date).adddays($maxDaysWithoutBackup);
Write-Host ("next backup required by =", $requiredNextBackup);

#Check if the next backup date is within the required time window
if (($backupPolicy.Schedule -lt (get-date)) -or ($backupPolicy.Schedule -gt $requiredNextBackup)) {
    Write-Host ("Fail -", $backupPolicy.Schedule.ToLocalTime(), "is not within the specified", $maxDaysWithoutBackup, "day time window since the last successful backup.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ($backupPolicy.Schedule.ToLocalTime(), "is within the specified", $maxDaysWithoutBackup, "day time window from the current date.");
}

#Check if the Bare Metal Recovery option is selected for the scheduled update
if (!$backupPolicy.BMR) {
    Write-Host ("Fail - Bare Metal Recovery (BMR) is not selected for the scheduled backup.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("Bare Metal Recovery (BMR) is selected for the scheduled backup.");
}

#Check if the System State backup option is selected for the scheduled update
if (!$backupPolicy.SystemState) {
    Write-Host ("Fail - System State backup is not selected for the scheduled backup.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("System State backup is selected for the scheduled backup.");
}

#Check if the VSSFullBackup option is selected for the scheduled update
if ($backupPolicy.VssBackupOptions.ToString() -ne "VssFullBackup") {
    Write-Host ("Fail - VssFullBackup is not selected for the scheduled backup.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("VssFullBackup is selected for the scheduled backup.");
}

#If we've gotten here, all checks have passed, so write "Pass" and exit with a Pass
Write-Host ("Pass");
Exit $env:XCCDF_RESULT_PASS;