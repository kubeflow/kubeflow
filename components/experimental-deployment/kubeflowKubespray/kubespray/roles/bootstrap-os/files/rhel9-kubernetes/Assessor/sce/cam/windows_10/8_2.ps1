#Center for Internet Security - Controls Assessment Module for Windows 10
#CIS Controls v7.1 Sub-Control 8.2
#This script checks that Anti-Malware software is enabled on the machine and is up to date.  It fails if either of those are false

#Write CAM and the sub-control number for logging purposes
Write-Host ("CAM Sub-Control 8.2");

#initialize variables
$avEnabled = $false;   #bool;   will be set to $true if an enabled AV is found
$avUpToDate = $false;  #bool;   will be set to $true if the enabled AV is up to date
$avName = "";          #string; will be set to the product name of the enabled AV if one is found

#get the AV info as registered with WMI using CIM
$avProduct = Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct;

#loop through each of the returned AV products and check for an enabled one
foreach ($product in $avProduct) {
    #get the decimal version of the product state and convert it to a hex string
    $productStateDecimal = $product.productState;
    $productStateHex = '{0:x}' -f $productStateDecimal;

    #get the substring that indicates if the product is enabled and check its value
    #if product is enabled set product name, check if AV is up to date, and break out of loop
    $productStateEnabled = $productStateHex.Substring(1,2);
    if (($productStateEnabled -eq "10") -or ($productStateEnabled -eq "11")) {
        $avEnabled = $true;
        $avName = $product.displayName;
        $productStateUpToDate = $productStateHex.Substring(3,2);
        if ($productStateUpToDate -eq "00") {
            $avUpToDate = $true;
        } #end if ($productStateUpToDate
        break;
    } #end if ($productStateEnabled
    #else { #print the name of the disabled product and indicate it is disabled
    #    $product.displayName + " is disabled";
    #}
} #end foreach

#if an enabled AV was found, print its name and status
if ($avEnabled) {
    Write-Host ($avName,"is enabled");
    if ($avUpToDate) {
        Write-Host (" and is up to date");
        Write-Host ("Pass");
        Exit $env:XCCDF_RESULT_PASS;
    } #end if ($avUpToDate)
    else {
        Write-Host (" and is out of date");
    } #end else
} #end if ($avEnabled)

#if no AV found or none were enabled, print that result
if (!$avEnabled) {
    Write-Host ("no AV is enabled");
    Write-Host ("Fail");
}
Exit $env:XCCDF_RESULT_FAIL;