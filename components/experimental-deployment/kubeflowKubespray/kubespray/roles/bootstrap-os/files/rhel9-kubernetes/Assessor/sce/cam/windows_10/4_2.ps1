#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 4.2
#Because Windows 10 does not use default passwords, this script checks the machine's minimum password length and passes if it meets the required minimum

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 4.2");

#Set the required minimum password length.  14 is the Windows Benchmark value.  Numbers greater than 14 are not accepted by Windows
#Change this value as appropriate for your organization
#$requiredMinPasswordLength = 14;
$requiredMinPasswordLength = $env:XCCDF_VALUE_4_2_MIN_PASSWORD_LENGTH; #this value can be customized in the CIS-CAT Assessor properties file, 14 is default
if ($requiredMinPasswordLength -lt 0) {
    Write-Host ("Fail - Invalid Minimum Password Length.  Check Assessor Properties file.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Make sure the required minimum password length is a valid value
if ($requiredMinPasswordLength -lt 0) {
    Write-Host ("Fail - Invalid Minimum Password Length.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Get the password settings
$passwordSettings = net accounts ;

#Find the minimum password length line
$minPasswordLengthLine = $passwordSettings | Select-String -Pattern "Minimum password length";

#Make sure that a password length line was found, otherwise exit with a fail because something went wrong 
if ($minPasswordLengthLine.Matches.Count -lt 1) {
    Write-Host ("Fail - No minimum password length line was found.");
    Exit $env:XCCDF_RESULT_FAIL;
}

#Get the value of the minimum password length
$minPasswordLengthString = ($minPasswordLengthLine -split ":")[1].Trim();

#only convert to an int if test indicates conversion will be successful 
if ([bool]($minPasswordLengthString -as [int] -is [int])) { 
    $minPasswordLength = [int]$minPasswordLengthString;
}

#Check the minimum password length to make sure it meets policy requirements.  Write result and exit with appropriate return value
if ($minPasswordLength -ge $requiredMinPasswordLength) {
    Write-Host ("Pass - Minimum password length is", $minPasswordLengthString, "which meets the required minimum of", $requiredMinPasswordLength);
    Exit $env:XCCDF_RESULT_PASS;
}
else {
    Write-Host ("Fail - Minimum password length is", $minPasswordLengthString, "which does not meet the required minimum of", $requiredMinPasswordLength);
    Exit $env:XCCDF_RESULT_FAIL;
}

#Should not get here.  If we did, return FAIL because something went wrong
Write-Host ("Fail - Unknown error");
Exit $env:XCCDF_RESULT_FAIL;
