#Center for Internet Security - Controls Assessment Module for Windows Server 2016
#CIS Controls v7.1 Sub-Control 8.2
#This script checks that Windows Defender is enabled on the machine and is up to date.  It fails if either of those are false

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 8.2");

#Initialize variables
$defenderInstalled = $false; #bool;   will be set to $true if the Windows-Defender feature is installed
$defenderEnabled = $false;   #bool;   will be set to $true if Windows Defender Antivirus is enabled
$defenderUpToDate = $false;  #bool;   will be set to $true if Windows Defender Antivirus signatures were updated within the specified time frame
$maxDaysSinceSignatureUpdate = 7; #int; this value is the time frame used to determine $defenderUpToDate

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

#Check to see if Windows Defender Antivirus signatures are up to date
if ($defenderStatus.AntivirusSignatureAge -le $maxDaysSinceSignatureUpdate) {
    $defenderUpToDate = $true;
    Write-Host ("Windows Defender Antivirus signature age is", $defenderStatus.AntivirusSignatureAge, "which meets the", $maxDaysSinceSignatureUpdate, "maximum.");
}

#If Windows Defender Antivirus is not up to date, then print a message and exit with FAIL
if (!$defenderUpToDate) {
    Write-Host ("Fail - Windows Defender Antivirus signature age is", $defenderStatus.AntivirusSignatureAge, "which does not meet the", $maxDaysSinceSignatureUpdate, "maximum.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#If Windows Defender is installed, enabled, and up to date, print a message and exit with a PASS
if ($defenderInstalled -and $defenderEnabled -and $defenderUpToDate) {
    Write-Host ("Pass - Windows Defender Antivirus is installed, enabled, and up to date.");
    Exit $env:XCCDF_RESULT_PASS;
}

#Should not get here.  If we did, return FAIL because something went wrong
Write-Host ("Fail - Unknown error");
Exit $env:XCCDF_RESULT_FAIL;