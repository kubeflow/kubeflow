#Center for Internet Security - Controls Assessment Module for Windows Server 2016
#CIS Controls v7.1 Sub-Control 15.7
#This script checks the wireless interface information for the machine.
#It passes if all wireless connections are using CCMP for their ciphers, or passes if there are no wireless connections.

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 15.7");

#Check to see if the Wireless-Networking feature is installed.  Print result.  If not, exit with a PASS because no wireless connections are supported.
$wirelessFeature = Get-WindowsFeature -Name Wireless-Networking
if (!$wirelessFeature.Installed) {
    Write-Host ("Pass - Wireless-Networking feature is not installed.");
    Exit $env:XCCDF_RESULT_PASS;
}
else {
    Write-Host ("Wireless-Networking feature is installed.");
}

#Get information about the wlan service
$wlanService = Get-Service wlansvc* ;
#$wlanService = Get-Service wudfsvc* ; #running service test example
#$wlanService = Get-Service wsearch* ; #stopped service test example

#Check to see if the wlan service was found.  Print result.  If not, exit with a PASS because no wireless connections are supported.
if (!$wlanService) {
    Write-Host ("Pass - wlan service not found.");
    Exit $env:XCCDF_RESULT_PASS;
}
else {
    Write-Host ($wlanService, "found.");
}

#Check to see if the wlan service is running.  Print result.  If not, exit with a PASS because no wireless connections are running
if ($wlanService.Status -ne "Running") {
    Write-Host ("Pass - ", $wlanService.ServiceName, "service is", $wlanService.Status);
    Exit $env:XCCDF_RESULT_PASS;
}
else {
    Write-Host ($wlanService.ServiceName, "service is", $wlanService.Status);
}

###################################################################################################################################
#Code below is the same as the CAM for Windows 10 code for 15.7
###################################################################################################################################

#get the wireless interface information from the netsh command
$wlanInterfaces = netsh wlan show interfaces;

#check to see if the wlan service is not running, and exit with a pass if it is not running
$wlansvc = $wlanInterfaces | Select-String -Pattern 'wlansvc';
if ($wlansvc.Matches.Count -ge 1) {
    Write-Host ("Pass - wlansvc is not running.");
    Exit $env:XCCDF_RESULT_PASS;
}

#determine how many interfaces were returned
$numInterfaces = 0;
$summaryLine = $wlanInterfaces | Select-String -Pattern 'on the system';
$numInterfacesString = ($summaryLine -split ' ')[2];

#only convert to an int if test indicates conversion will be successful 
if ([bool]($numInterfacesString -as [int] -is [int])) { 
    $numInterfaces = [int]$numInterfacesString;
}

#Determine if any wireless interfaces were found.  If not, exit with a pass
if ($numInterfaces -eq 0) {
    Write-Host ($wlanInterfaces);
    Write-Host ("Pass - no wireless interfaces were found.");
    Exit $env:XCCDF_RESULT_PASS;
}

Write-Host ($summaryLine);

#for each interface returned parse the return string for pertinent values
for ($i = 0; $i -lt $numInterfaces; $i++) {
    #calculate the position based on the interface number 
    #example: "field1 : value1    field2 : value2", pos 0 = field1, pos 1 = value1
    $pos = 1 + $i * 2;

    #extract the desired information
    $cipherLine = $wlanInterfaces | Select-String -Pattern 'Cipher';
    $cipher = ($cipherLine -split ":")[$pos].Trim();
    
    #write the extracted cipher as output
    Write-Host $cipher;
    
    #check the cipher type - if it's not CCMP, then this check fails
    if ($cipher -ne "CCMP") {
        Write-Host ("Fail because cipher type is not CCMP");
        Exit $env:XCCDF_RESULT_FAIL;
    }
}

#if all interfaces were CCMP, then this check passes
Write-Host ("Pass - All wireless interfaces are using AES");
Exit $env:XCCDF_RESULT_PASS;