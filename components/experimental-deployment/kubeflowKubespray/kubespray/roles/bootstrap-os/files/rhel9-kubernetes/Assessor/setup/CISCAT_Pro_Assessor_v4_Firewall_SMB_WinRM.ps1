# --------------------------------------------------------------------------------------
#       Title: CIS-CAT Pro Assessor v4 Firewall Rules for SMB/WinRM over HTTPS
# Description: Execute this script on any Windows host which will be assessed using
#              CIS-CAT Pro Assessor v4.  This script will add firewall rules allowing
#              connectivity via SMB (445) and WinRM over HTTPS (5986).
#
# From http://blogs.msdn.com/b/tomholl/archive/2010/11/08/adding-a-windows-firewall-rule-using-powershell.aspx
#
# Author            Modification Date          Description of Modification(s)
# --------------------------------------------------------------------------------------
# Bill Munyan       January 24, 2018           Original Author
# --------------------------------------------------------------------------------------
function Add-FirewallRule {
   param( 
      $name,
      $tcpPorts,
      $appName = $null,
      $serviceName = $null
   )
    $fw = New-Object -ComObject hnetcfg.fwpolicy2 
    $rule = New-Object -ComObject HNetCfg.FWRule
        
    $rule.Name = $name
    if ($appName -ne $null) { $rule.ApplicationName = $appName }
    if ($serviceName -ne $null) { $rule.serviceName = $serviceName }
    $rule.Protocol = 6 #NET_FW_IP_PROTOCOL_TCP
    $rule.LocalPorts = $tcpPorts
    $rule.Enabled = $true
    $rule.Grouping = "@firewallapi.dll,-23255"
    $rule.Profiles = 7 # all
    $rule.Action = 1 # NET_FW_ACTION_ALLOW
    $rule.EdgeTraversal = $false
    
    $fw.Rules.Add($rule)
}
# From http://blogs.msdn.com/b/tomholl/archive/2010/11/08/adding-a-windows-firewall-rule-using-powershell.aspx

Add-FirewallRule "Windows Remote Management HTTP/SSL" "5986" $null $null
Add-FirewallRule "SMB" "445" $null $null
