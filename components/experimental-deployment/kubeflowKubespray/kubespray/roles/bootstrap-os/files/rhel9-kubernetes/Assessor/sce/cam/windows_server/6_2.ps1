#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 6.2
#This script checks that at least one sub-category of logging is turned on and fails if all are turned off

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 6.2");

#Get the Effective Audit Policy Settings for the Machine - this command requires Admin privileges to work successfully
$auditSettings = auditpol.exe /get /category:*;
#$auditSettings;

#Get the Audit settings that are logged on Success
$onSuccess = $auditSettings | Select-String -Pattern "Success";
#"On Success:";
#$onSuccess;

#Get the Audit settings that are logged on Failure
$onFailure = $auditSettings | Select-String -Pattern "Failure";
#"`r`nOn Failure:";
#$onFailure;

#determine the total number of Audit settings enabled.  
#This will double count a setting if it is enabled on success and on failure
#but that double counting does not matter for the purposes of determining if any Audit settings are enabled
$numSettingsEnabled = $onSuccess.Count + $onFailure.Count;
#$numSettingsEnabled;

if ($numSettingsEnabled -le 0) {
    Write-Host ("Fail - No Auditing settings are enabled.");
    Exit $env:XCCDF_RESULT_FAIL;
}

Write-Host ("Pass - Some Auditing settings are enabled.");
Exit $env:XCCDF_RESULT_PASS;