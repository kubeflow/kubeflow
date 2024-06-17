#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 8.5 (one of two scripts for 8.5)
#This script checks various registry keys to see if AutoRun is disabled.  If AutoRun is not disabled, this script fails.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 8.5");

#Function Get-RegValue
#Input:a registry key path, and the name of a registry key value at that path
#Checks to see if the key path exists.  If so, checks to see if the value exists at that path.  If so, returns the value of that registry value name.
#Writes to the host if the key doesn't exist, or its value if it does exist
function Get-RegValue ([string]$regKeyName, [string]$regValueName) {
    #check to see if the registry key exists
    $regKeyExists = Get-ItemProperty -LiteralPath $regKeyName -EA Ignore;

    #if it exists, get the value
    if (-not $regKeyExists) {
        Write-Host ($regKeyName, $regValueName, "does not exist");
    }
    else {
        $regKey = Get-ItemProperty -Path $regKeyName;
        if (Get-Member -inputobject $regKey -name $regValueName) {
            Write-Host ($regKeyName, $regValueName, $regKey.$regValueName);
            $regKey.$regValueName;
        }
    }
} #end of Function Get-RegValue

#check various registry settings to see if AutoRun is disabled.  If disabled, prints a message and returns PASS
$hklmNoAutoRun = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" "NoAutoRun";
if ($hklmNoAutoRun -eq 1) {
    Write-Host ("Pass - AutoRun disabled on local machine");
    Exit $env:XCCDF_RESULT_PASS; 
}

$hkcuNoAutoRun = Get-RegValue "Registry::HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" "NoAutoRun";
if ($hkcuNoAutoRun -eq 1) {
    Write-Host ("Pass - AutoRun disabled for current user");
    Exit $env:XCCDF_RESULT_PASS;
}

$hklmNoDriveTypeAutoRun = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" "NoDriveTypeAutoRun";
if ($hklmNoDriveTypeAutoRun -eq 0xff) {
    Write-Host ("Pass - AutoRun disabled on local machine for all drive type");
    Exit $env:XCCDF_RESULT_PASS; 
}

$hkcuNoDriveTypeAutoRun = Get-RegValue "Registry::HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" "NoDriveTypeAutoRun";
if ($hkcuNoDriveTypeAutoRun -eq 0xff) {
    Write-Host ("Pass - AutoRun disabled for current user for all drive types");
    Exit $env:XCCDF_RESULT_PASS;
}

$hklmNoDriveAutoRun = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" "NoDriveAutoRun";
if ($hklmNoDriveAutoRun -eq 0x3FFFFFF) {
    Write-Host ("Pass - AutoRun disabled on local machine for all drive letters");
    Exit $env:XCCDF_RESULT_PASS; 
}

$hkcuNoDriveAutoRun = Get-RegValue "Registry::HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" "NoDriveAutoRun";
if ($hkcuNoDriveAutoRun -eq 0x3FFFFFF) {
    Write-Host ("Pass - AutoRun disabled for current user for all drive letters");
    Exit $env:XCCDF_RESULT_PASS;
}


#if none of the above checks were successful, then we assume AutoRun is on, so we exit with a Fail
Write-Host ("Fail - AutoRun is on");
Exit $env:XCCDF_RESULT_FAIL;