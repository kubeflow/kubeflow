#Center for Internet Security - Controls Assessment Module for Windows Server 2016
#CIS Controls v7.1 Sub-Control 10.1
#This script checks to see if the last successful Windows Server Backup and the next scheduled one are within the specified time frame

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 10.1");

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

#get the Windows Server Backup Summary and make sure it is not null
$backupSummary = Get-WBSummary;
if (!$backupSummary) {
    Write-Host ("Fail - Get-WBSummary failed.");
    Exit $env:XCCDF_RESULT_FAIL;
}
Write-Host ("WBSummary retrieved.");

#Calculate the date window for the last backup based on that number of days
$requiredLastBackup = (get-date).adddays(-1 * $maxDaysWithoutBackup);
Write-Host ("required last backup date window =", $requiredLastBackup);

#Check if the last backup date is within the required time window
if ($backupSummary.LastSuccessfulBackupTime -lt $requiredLastBackup) {
    Write-Host ("Fail -", $backupSummary.LastSuccessfulBackupTime.ToLocalTime(), "is not within the specified", $maxDaysWithoutBackup, "day time window.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ($backupSummary.LastSuccessfulBackupTime.ToLocalTime(), "is within the specified", $maxDaysWithoutBackup, "day time window.");
}

#Calculate the date window for the next backup based on that number of days
$requiredNextBackup = ($backupSummary.LastSuccessfulBackupTime).adddays($maxDaysWithoutBackup);
Write-Host ("next backup required by =", $requiredNextBackup);

#Check if the next backup date is within the required time window
if (($backupSummary.NextBackupTime -lt (get-date)) -or ($backupSummary.NextBackupTime -gt $requiredNextBackup)) {
    Write-Host ("Fail -", $backupSummary.NextBackupTime.ToLocalTime(), "is not within the specified", $maxDaysWithoutBackup, "day time window since the last successful backup.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ($backupSummary.NextBackupTime.ToLocalTime(), "is within the specified", $maxDaysWithoutBackup, "day time window since the last successful backup.");
}

#If we've gotten here, all checks have passed, so write "Pass" and exit with a Pass
Write-Host ("Pass");
Exit $env:XCCDF_RESULT_PASS;