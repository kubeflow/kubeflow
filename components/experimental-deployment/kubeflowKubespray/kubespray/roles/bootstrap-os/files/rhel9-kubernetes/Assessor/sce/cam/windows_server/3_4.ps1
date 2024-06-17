#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 3.4
#This script checks various registry keys to determine if automatic Windows updates are turned on.
#The script passes if Windows updates are not disabled and they are set to option 4 - automatically download and automatically install.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 3.4");

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

#check various registry keys to see if automatic updates have been turned off
$disableWindowsUpdateAccess = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\WindowsUpdate" "DisableWindowsUpdateAccess";
if ($disableWindowsUpdateAccess -eq 1) {
    Write-Host ("FAIL - Access to Windows Update is disabled via DisableWindowsUpdateAccess");
    Exit $env:XCCDF_RESULT_FAIL;
}

$noAutoUpdate = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\WindowsUpdate\AU" "NoAutoUpdate";
if ($noAutoUpdate -eq 1) {
    Write-Host ("FAIL - Automatic Updates are turned off via NoAutoUpdate");
    Exit $env:XCCDF_RESULT_FAIL;
}

$AUOptions = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\WindowsUpdate\AU" "AUOptions";
if ($AUOptions -eq 1) {
    Write-Host ("FAIL - Automatic Updates are turned off via AUOptions");
    Exit $env:XCCDF_RESULT_FAIL;
}

if ($AUOptions -eq 4) {
    Write-Host ("Pass - Automatic Updates are on and set to automatically download and automatically install");
    Exit $env:XCCDF_RESULT_PASS;
}

Write-Host ("FAIL - Automatic Updates are not set to automatically download and automatically schedule an installation");
Exit $env:XCCDF_RESULT_FAIL;




