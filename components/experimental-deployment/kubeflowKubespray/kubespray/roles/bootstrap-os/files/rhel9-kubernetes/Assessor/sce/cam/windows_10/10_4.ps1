#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 10.4
#Checks to see if File History backups and/or System Image backups are turned on.  For each (if enabled), determines the drive that the backup service is using to store backups.
#Passes if the drives for the enabled services are encrypted with native Windows Encryption (such as Bitlocker) as reported by the manage-bde.exe command.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 10.4");

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

#Intialize boolean values
$systemImageDriveFound = $false;
$fileHistoryOn = $false;

#Get the drive of the last successful Windows System Image Backup from the registry and update the boolean.  If no drive found, print a message.
$lastSystemImageDrive = Get-RegValue "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsBackup\SystemImageBackup" "LastSuccessfulBackupDrive";
if ($lastSystemImageDrive) {
    Write-Host ("Windows System Image backup drive is", $lastSystemImageDrive);
    $systemImageDriveFound = $true;
}
else {
    Write-Host ("Could not identify the last successful Windows System Image backup drive.");
}

#Check the file history service configuration registry key.  If configured, print a message and update the boolean.  If it doesn't contain any values, print message and exit with a FAIL
$fileHistory = Get-Item "Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\fhsvc\Parameters\Configs";
if ($fileHistory.ValueCount -gt 0) {
    Write-Host ("File History backups are configured.");
    $fileHistoryOn = $true;
}
else {
    Write-Host ("File History is not being used.");
}

#Get the drive for the File History backup.  Only consider the first File History entry at this point.
if ($fileHistoryOn) {
    $fileHistoryPath = $fileHistory.Property[0] + "1.xml";
    #Check that the path to the file history configuration file exists, print message and PASS if so
    if (-not (Test-Path -Path $fileHistoryPath)) {
        Write-Host ($fileHistoryPath, "does not exist");
        $fileHistoryOn = $false;
    }
}

#If no drive was identified for either backup method, print a message and exit with a FAIL
if (-not ($systemImageDriveFound -or $fileHistoryOn)) {
    Write-Host ("Fail - Could not identify drives for either Windows System Image backup or File History backups.  It is likely that neither backup method is being used.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Get the File History drive
if ($fileHistoryOn) {
    [xml]$fileHistoryConfigXML = Get-Content -Path $fileHistoryPath;
    $fileHistoryDrive = $fileHistoryConfigXML.DataProtectionUserConfig.Target.TargetUrl;
}

########################################################################################
#Check if these drives are encrypted

#initialize variables
$numDrives = 0;
$fileHistoryDriveEncrypted = $false;
$systemImageDriveEncrypted = $false;

#get the encryption information for the drives on the system - requires Admin privileges
if ([IntPtr]::size -eq 4) { #check if 32-bit is running.  If so, change to the sysnative path so manage-bde can be found
    cd $env:windir;
    cd sysnative;
    Write-Host ("32-bit detected");
    $encryptionInfo = .\manage-bde.exe -status;
}
else { #treat as 64-bit
    $encryptionInfo = manage-bde.exe -status;
}

#extract the encryption method line(s)
$encryptionMethodLine = $encryptionInfo | Select-String -Pattern "Encryption Method";
$numDrives = $encryptionMethodLine.Matches.Count;

#Write the number of drives returned
if ($numDrives -eq 1) {
    Write-Host ($numDrives, "drive found");
}
else {
    Write-Host ($numDrives, "drives found");
}

#If no drives were returned, exit with a fail on the assumption that something went wrong
if ($numDrives -le 0) {
    Write-Host ("Fail - no drives returned");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Function Get-IsDriveEncrypted
#Input:string containing the letter of the drive to use
#Parses the output of the manage-bde.exe command and checks whether a particular drive is encrypted or not.  Returns true if it is encrypted, false if not. 
function Get-IsDriveEncrypted ([string]$driveLetterToCheck) {
    Write-Host ("");
    Write-Host ("Get-IsDriveEncrypted - Checking encryption status of drive:", $driveLetterToCheck);

    #loop through each of the returned the drives
    for ($i = 0; $i -lt $numDrives; $i++) {
        #determine the position and use it to extract the encryption method
        $encryptionMethodPosition = 1 + $i * 2;
        $encryptionMethod = ($encryptionMethodLine -split ':')[$encryptionMethodPosition].Trim();
    
        #extract and write the name of the drive and its description
        $driveInfoPosition = 5 + $i * 14;
        $driveString = $encryptionInfo[$driveInfoPosition];
        $driveLetter = $driveString[$driveString.IndexOf(":") - 1];
        if ($driveLetter -ne $driveLetterToCheck) {
            Write-Host ("Skipping Drive", $driveLetter);
            continue;
        }
        Write-Host ("Drive", $driveLetter, "found.");
        Write-Host ("Encryption method: ", $encryptionMethod);
    
        if ($encryptionMethod -eq "None") {
            Write-Host ("Drive", $driveLetter, "is not encrypted.");
            return $false;
        }
        else {
            Write-Host ("Drive", $driveLetter, "is encrypted.");
            return $true;
        }
    }
} #end of Function Get-IsDriveEncrypted

#Check the drive encryption status for the backup drives being used
if ($fileHistoryOn) {
    $fileHistoryDriveEncrypted = Get-IsDriveEncrypted $fileHistoryDrive[0];
    if (-not $fileHistoryDriveEncrypted) {
        Write-Host ("Fail - File History drive", $fileHistoryDrive[0], "is not encrypted.");
        Exit $env:XCCDF_RESULT_FAIL;
    }
}
if ($systemImageDriveFound) {
    $systemImageDriveEncrypted = Get-IsDriveEncrypted $lastSystemImageDrive[0];
    if (-not $systemImageDriveEncrypted) {
        Write-Host ("Fail - System Image drive",  $lastSystemImageDrive[0], "is not encrypted");
        Exit $env:XCCDF_RESULT_FAIL;
    }
}

#If we got here, we did not fail.  Write results and exit with a PASS
Write-Host ("");
if ($fileHistoryOn) {
    if ($fileHistoryDriveEncrypted) {
        Write-Host ("File History On and drive is encrypted.");
    }
}
if ($systemImageDriveFound) {
    if ($systemImageDriveEncrypted) {
        Write-Host ("System Image backup drive found and drive is encrypted.");
    }
}
Write-Host ("Pass - Drive(s) for backup methods being used are encrypted."); 
Exit $env:XCCDF_RESULT_PASS;