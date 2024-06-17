#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 10.1
#This script checks to see if File History is turned on.
#It Passes if the File History service configuration registry key contains a valid path.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 10.1");

#Check the file history service configuration registry key.  If it doesn't contain any values, print message and exit with a FAIL
$fileHistory = Get-Item "Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\fhsvc\Parameters\Configs";
if ($fileHistory.ValueCount -le 0) {
    Write-Host ("Fail - File History backups are not configured.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Check that the path to the File History configuration file is valid, print message and PASS if so
#Only consider the first entry, even if File History is configured for multiple users
if (Test-Path -Path $fileHistory.Property[0] -IsValid) {
    Write-Host ($fileHistory.Property[0]);
    Write-Host ("Pass - File History backups are configured");
    Exit $env:XCCDF_RESULT_PASS;
}

#Should not get here.  If we did, return FAIL because something went wrong
Write-Host ("Fail - Unknown error");
Exit $env:XCCDF_RESULT_FAIL;