#Center for Internet Security - Controls Assessment Module for Windows Server 2016
#CIS Controls v7.1 Sub-Control 8.4
#This script checks that Windows Defender is installed and enabled on the machine.  It then checks to see if it is set to scan removable devices.
#If all of those are true, it returns PASS

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 8.4");

#Initialize variables
$defenderInstalled = $false; #bool;   will be set to $true if the Windows-Defender feature is installed
$defenderEnabled = $false;   #bool;   will be set to $true if Windows Defender Antivirus is enabled

#Check to see if the Windows-Defender feature is installed
$defenderFeature = Get-WindowsFeature -Name Windows-Defender
if ($defenderFeature.Installed) {
    $defenderInstalled = $true;
    Write-Host ("Windows-Defender feature is installed.");
}

#If the Windows-Defender feature is not installed, then print a message and exit with FAIL
if (!$defenderInstalled) {
    Write-Host ("Fail - the Windows-Defender feature is not installed");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Make sure that the windefend service is running and exit with a FAIL if not
if ((Get-Service windefend).Status -ne "Running") {
    Write-Host ("Fail - the windefend service is not running.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("windefend service is running.");
}

#Get the status of Windows Defender
$defenderStatus = Get-MpComputerStatus;

#Check to see if Windows Defender Antivirus is enabled
if ($defenderStatus.AntivirusEnabled) {
    $defenderEnabled = $true;
    Write-Host ("Windows Defender Antivirus is enabled.");
}

#If Windows Defender Antivirus is not enabled, then print a message and exit with FAIL
if (!$defenderEnabled) {
    Write-Host ("Fail - Windows Defender Antivirus is not enabled.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Get additional Windows Defender settings
$defenderSettings = Get-MpPreference;

#Check the DisableRemovableDriveScanning setting and write the appropriate message.  If disabled, exit with a FAIL
if ($defenderSettings.DisableRemovableDriveScanning) {
    Write-Host ("Fail - Removable Drive Scanning is disabled.");
    Exit $env:XCCDF_RESULT_FAIL;
}
else {
    Write-Host ("Removable Drive Scanning is enabled.");
}

#If Windows Defender is installed, enabled, and up to date, print a message and exit with a PASS
if ($defenderInstalled -and $defenderEnabled -and !$defenderSettings.disableRemovableDriveScanning) {
    Write-Host ("Pass - Windows Defender Antivirus is installed, enabled, and Removable Drive Scanning is on.");
    Exit $env:XCCDF_RESULT_PASS;
}

#Should not get here.  If we did, return FAIL because something went wrong
Write-Host ("Fail - Unknown error");
Exit $env:XCCDF_RESULT_FAIL;