#Center for Internet Security - Controls Assessment Module for Windows Server 2016
#CIS Controls v7.1 Sub-Control 10.4
#Checks to see if both Bitlocker and Windows-Server-Backup are installed.  Then checks to see if the drive of the last backup is encrypted with native Windows Encryption (such as Bitlocker).  
#Passes if all of these are true.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 10.4");

#Check to see if the BitLocker feature is installed.  Print result.  If not, exit with a FAIL.
$bitLockerInstalled = Get-WindowsFeature -Name BitLocker
if (!$bitLockerInstalled.Installed) {
    Write-Host ("Fail - BitLocker feature is not installed.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("BitLocker feature is installed.");
}

#Check to see if the Windows-Server-Backup feature is installed.  Print result.  If not, exit with a FAIL.
$serverBackupInstalled = Get-WindowsFeature -Name Windows-Server-Backup
if (!$serverBackupInstalled.Installed) {
    Write-Host ("Fail - Windows-Server-Backup feature is not installed.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("Windows-Server-Backup feature is installed.");
}

#get the Windows Server Backup Summary and make sure it is not null
$backupSummary = Get-WBSummary;
if (!$backupSummary) {
    Write-Host ("Fail - Get-WBSummary failed.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("WBSummary retrieved.");
}

#check that the LastBackupTarget has a length
if ($backupSummary.LastBackupTarget.Length -le 0) {
    Write-Host ("Fail - No Last Backup Target destination found.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#check that the LastBackupTarget has the length of expected drive format: "C:" or "C"
if ($backupSummary.LastBackupTarget.Length -gt 2) {
    Write-Host ("Fail - Last Backup Target not in expected drive format.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("Last Backup Target destination drive was", $backupSummary.LastBackupTarget);
}

#Check the drive encryption status for the Last Backup Target.  Write the result and exit with the appropriate value
$bitLockerVolumeInfo = Get-BitLockerVolume -MountPoint $backupSummary.LastBackupTarget;
if ($bitLockerVolumeInfo.EncryptionPercentage -le 0) {
    Write-Host ("Fail - Last Backup Target", $backupSummary.LastBackupTarget, "is not encrypted.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("Pass - Last Backup Target", $backupSummary.LastBackupTarget, "is encrypted with", $bitLockerVolumeInfo.EncryptionMethod);
    Exit $env:XCCDF_RESULT_PASS;
}

#Should not get here.  If we did, return FAIL because something went wrong
Write-Host ("Fail - Unknown error");
Exit $env:XCCDF_RESULT_FAIL;