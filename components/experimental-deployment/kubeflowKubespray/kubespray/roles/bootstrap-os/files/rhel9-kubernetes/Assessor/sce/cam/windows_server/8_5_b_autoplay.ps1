#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 8.5 (one of two scripts for 8.5)
#This script checks various registry keys to see if AutoPlay is disabled.  If AutoPlay is not disabled, this script fails.

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

#$noAutoplayfornonVolume = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Explorer" "NoAutoplayfornonVolume";
#if ($noAutoplayfornonVolume -eq 1) {
#    Write-Host ("Pass - AutoPlay disabled by group policy");
#    Exit $env:XCCDF_RESULT_PASS; 
#}

$disableAutoPlay = Get-RegValue "Registry::HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers" "DisableAutoPlay";
if ($disableAutoPlay -eq 1) {
    Write-Host ("Pass - AutoPlay disabled for current user");
    Exit $env:XCCDF_RESULT_PASS; 
}

#if none of the above checks were successful, then we assume AutoPlay is on, so we exit with a Fail
Write-Host ("Fail - AutoPlay is on");
Exit $env:XCCDF_RESULT_FAIL;