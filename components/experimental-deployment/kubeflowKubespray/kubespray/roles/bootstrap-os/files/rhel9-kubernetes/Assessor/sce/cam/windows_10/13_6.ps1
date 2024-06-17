#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 13.6
#This script checks whether the drives on the machine are encrypted with native Windows encryption.  If any drives are not, this script fails.

#Change Log
#2019-04-30 Added the 32-bit check so that manage-bde could be found when script is being run in 32-bit PowerShell

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 13.6");

#initialize variables
$numDrives = 0;

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

#loop through each of the returned the drives
for ($i = 0; $i -lt $numDrives; $i++) {
    #determine the position and use it to extract the encryption method
    $encryptionMethodPosition = 1 + $i * 2;
    $encryptionMethod = ($encryptionMethodLine -split ':')[$encryptionMethodPosition].Trim();
    
    #extract and write the name of the drive and its description
    $driveInfoPosition = 5 + $i * 14;
    Write-Host ($encryptionInfo[$driveInfoPosition], $encryptionInfo[$driveInfoPosition + 1]);
    Write-Host ("Encryption method: ", $encryptionMethod);
    
    if ($encryptionMethod -eq "None") {
        Write-Host ("Fail - this drive is not encrypted.");
        Exit $env:XCCDF_RESULT_FAIL;
    }
}

#if this point is reached, no unencrypted drives were discovered, so exit with a Pass
Write-Host ("Pass - All drives are encrypted.");
Exit $env:XCCDF_RESULT_PASS;