#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 10.2
#This script checks the date of the last successful Windows System Image Backup.
#It Passes if the last successful Windows System Image Backup occurred within a specified amount of time.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 10.2");

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

#Get the time of the last successful Windows System Image Backup from the registry
$lastSystemImage = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsBackup\SystemImageBackup" "LastSuccessfulBackupTime";

#If no record of a successful Windows System Image Backup exists, print a message and exit with a FAIL
if (-not $lastSystemImage) {
    Write-Host ("Fail - No record exists of a successful Windows System Image Backup");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Set the maximum number of days allowed without a Windows System Image Backup.  Default value is 7 days.
#Change this value as appropriate for your organization 
#$maxDaysWithoutBackup = 7;
$maxDaysWithoutBackup = $env:XCCDF_VALUE_10_2_MAX_DAYS_WITHOUT_BACKUP; #this value can be customized in the CIS-CAT Assessor properties file, 7 days is default

#Check that the maximum number of days allowed without a Windows System Image Backup is a valid value
if ($maxDaysWithoutBackup -lt 0) {
    Write-Host ("Fail - Invalid value for Maximum Days Without Backup.  Check Assessor Properties file.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Calculate the date window based on that number of days
$requiredImageDate = (get-date).adddays(-1 * $maxDaysWithoutBackup);
Write-Host ("requiredImageDate =", $requiredImageDate);

#Convert this to a datetime value
$lastImageDate = [datetime]::FromFileTime($lastSystemImage);

#Check if the last image date is within the required time window
if ($lastImageDate -lt $requiredImageDate) {
    Write-Host ("Fail -", $lastImageDate.ToLocalTime(), "is not within the specified", $maxDaysWithoutBackup, "day time window.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Check if the last image date is within the required time window
if ($lastImageDate -ge $requiredImageDate) {
    Write-Host ("Pass -", $lastImageDate.ToLocalTime(), "is within the specified", $maxDaysWithoutBackup, "day time window.");
    Exit $env:XCCDF_RESULT_PASS;
}

#Should not get here.  If we did, return FAIL because something went wrong
Write-Host ("Fail - Unknown error");
Exit $env:XCCDF_RESULT_FAIL;