#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 9.4
#This script Checks the Active Policy Store for the Public, Private, and Domain Profiles to make sure that:
# 1) The Windows Firewall for that profile is enabled
# 2) The Default rule for Inbound Traffic is set to deny (Block) 

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 9.4");

#Check the Active Policy Store for the Public, Private, and Domain Profiles to make sure that:
# 1) The Windows Firewall for that profile is enabled
# 2) The Default rule for Inbound Traffic is set to deny (Block) 

###### Start Public Profile #######
#Get the profile from the Active Policy Store
$publicProfile = Get-NetFirewallProfile -PolicyStore ActiveStore -Name Public;

#Convert the Enabled property to a string
$publicEnabled = $publicProfile.Enabled.ToString();
Write-Host ("publicProfile.Enabled = " + $publicEnabled);

#Check the Enabled string to see if the firewall is enabled for this profile
if ($publicEnabled -eq "False") {
    Write-Host ("Fail because publicProfile.Enabled = False");
    Exit $env:XCCDF_RESULT_FAIL;  
}

#Convert the DefaultInboundAction property to a string
$publicInbound = $publicProfile.DefaultInboundAction.ToString();
Write-Host ("publicProfile.DefaultInboundAction = " + $publicInbound); 

#Check the DefaultInboundAction string to see if it is set to Block
if ($publicInbound -ne "Block") {
    Write-Host ("Fail because publicProfile.DefaultInboundAction != Block");
    Exit $env:XCCDF_RESULT_FAIL;      
}
###### End Public Profile #######

##############################################################################################

###### Start Private Profile #######
#Get the profile from the Active Policy Store
$privateProfile = Get-NetFirewallProfile -PolicyStore ActiveStore -Name Private;

#Convert the Enabled property to a string
$privateEnabled = $privateProfile.Enabled.ToString();
Write-Host ("privateProfile.Enabled = " + $privateEnabled);

#Check the Enabled string to see if the firewall is enabled for this profile
if ($privateEnabled -eq "False") {
    Write-Host ("Fail because privateProfile.Enabled = False");
    Exit $env:XCCDF_RESULT_FAIL;  
}

#Convert the DefaultInboundAction property to a string
$privateInbound = $privateProfile.DefaultInboundAction.ToString();
Write-Host ("privateProfile.DefaultInboundAction = " + $privateInbound); 

#Check the DefaultInboundAction string to see if it is set to Block
if ($privateInbound -ne "Block") {
    Write-Host ("Fail because privateProfile.DefaultInboundAction != Block");
    Exit $env:XCCDF_RESULT_FAIL;      
}
###### End Private Profile #######

##############################################################################################

###### Start Domain Profile #######
#Get the profile from the Active Policy Store
$domainProfile = Get-NetFirewallProfile -PolicyStore ActiveStore -Name Domain;

#Convert the Enabled property to a string
$domainEnabled = $domainProfile.Enabled.ToString();
Write-Host ("domainProfile.Enabled = " + $domainEnabled);

#Check the Enabled string to see if the firewall is enabled for this profile
if ($domainEnabled -eq "False") {
    Write-Host ("Fail because domainProfile.Enabled = False");
    Exit $env:XCCDF_RESULT_FAIL;  
}

#Convert the DefaultInboundAction property to a string
$domainInbound = $domainProfile.DefaultInboundAction.ToString();
Write-Host ("domainProfile.DefaultInboundAction = " + $domainInbound); 

#Check the DefaultInboundAction string to see if it is set to Block
if ($domainInbound -ne "Block") {
    Write-Host ("Fail because domainProfile.DefaultInboundAction != Block");
    Exit $env:XCCDF_RESULT_FAIL;    
}
###### End Domain Profile #######

##############################################################################################

Write-Host ("Pass - Firewalls enabled and default inbound action is set to block");
Exit $env:XCCDF_RESULT_PASS;