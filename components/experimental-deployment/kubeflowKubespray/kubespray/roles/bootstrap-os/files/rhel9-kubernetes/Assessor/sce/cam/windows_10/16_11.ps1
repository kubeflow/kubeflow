#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 16.11
#This script checks the lock screen / screen saver timeout settings for the machine.
#If the lock screen is disabled, or the timeout is too long, this script will fail.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 16.11");

#Set the maximum timeout.  900 seconds (15 minutes) is the Windows Benchmarks value.
#Change this value as appropriate for your organization 
#$maxTimeout = 900;
$maxTimeout = $env:XCCDF_VALUE_16_11_MAX_TIMEOUT; #this value can be customized in the CIS-CAT Assessor properties file, 900 is default
if ($maxTimeout -lt 0) {
    Write-Host ("Fail - Invalid Maximum Timeout.  Check Assessor Properties file.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Check that the maximum timeout is a valid value
if ($maxTimeout -lt 0) {
    Write-Host ("Fail - Invalid Maximum Timeout.");
    Exit $env:XCCDF_RESULT_FAIL;
}

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

#check the group policy setting as it takes priority over the user specific screen saver settings
$inactivityTimeoutSecs = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" "InactivityTimeoutSecs";
if (($inactivityTimeoutSecs -le $maxTimeout) -and ($inactivityTimeoutSecs -gt 0)) {
    Write-Host ("Pass - InactivityTimeoutSecs of", $inactivityTimeoutSecs, "is greater than 0 and less than maximum timeout of", $maxTimeout);
    Exit $env:XCCDF_RESULT_PASS; 
}

#Setup the SystemParametersInfoCall
$systemParametersInfoCall = @"
[DllImport("user32.dll")]
public static extern bool SystemParametersInfo(int uAction, int uParam, ref int lpvParam, int flags );
"@
$systemParametersInfo = Add-Type -memberDefinition  $systemParametersInfoCall -Name ScreenSaver -passThru ;

#ScreenSaveActive SPI_GETSCREENSAVEACTIVE 0x0010
#$screenSaveActive = 0;
#$systemParametersInfo::SystemParametersInfo(0x0010, 0, [ref]$screenSaveActive, 0);
#Write-Host ("ScreenSaveActive =", $screenSaveActive);

#get the ScreenSaveTimeout value and write it
#ScreenSaveTimeout SPI_GETSCREENSAVETIMEOUT 0x000E
$screenSaveTimeout = 0;
$systemParametersInfo::SystemParametersInfo(0x000E, 0, [ref]$screenSaveTimeout, 0);
Write-Host ("ScreenSaveTimeout = ", $screenSaveTimeout);

#check ScreenSaveTimeout to see if it's 0 or negative (invalid)
if ($screenSaveTimeout -le 0) {
    Write-Host ("Fail - Timeout not set or invalid.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#check the ScreenSaveTimeout to see if it's too high
if ($screenSaveTimeout -gt $maxTimeout) {
    Write-Host ("Fail - Timeout of", $screenSaveTimeout, "is too high.  Upper limit set at", $maxTimeout);
    Exit $env:XCCDF_RESULT_FAIL;
}

#experimentation shows that the screenSaveTimeout will be used if inactivityTimeout is greater than the screenSaveTimeout, regardless of the screenSaverSecure value
if (($inactivityTimeoutSecs -gt 0) -and ($screenSaveTimeout -le $maxTimeout)) {
    Write-Host ("Pass - InactivityTimeoutSecs (", $inactivityTimeoutSecs, ") is positive and ScreenSaveTimeout (", $screenSaveTimeout, ") is less than the maximum timeout of ", $maxTimeout);
    Exit $env:XCCDF_RESULT_PASS;
}

#get the ScreenSaverSecure value and write
#ScreenSaverSecure SPI_GETSCREENSAVESECURE 0x0076
$screenSaverSecure = 0;
$systemParametersInfo::SystemParametersInfo(0x0076, 0, [ref]$screenSaverSecure, 0);
Write-Host ("ScreenSaverSecure =", $screenSaverSecure);

#check to see if ScreenSaverSecure is turned on
if ($screenSaverSecure -eq 1) {
    Write-Host ("Pass - ScreenSaverSecure equals 1.");
    Exit $env:XCCDF_RESULT_PASS;
}
else {
    Write-Host ("Fail - ScreenSaverSecure equals 0.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Should not get here.  If we did, return FAIL because something went wrong
Write-Host ("Fail - Unknown error");
Exit $env:XCCDF_RESULT_FAIL;
