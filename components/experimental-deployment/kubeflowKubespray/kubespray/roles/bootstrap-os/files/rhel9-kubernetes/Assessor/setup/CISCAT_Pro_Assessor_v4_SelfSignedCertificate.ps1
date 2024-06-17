# --------------------------------------------------------------------------------------
#       Title: CIS-CAT Pro Assessor v4 Self-Signed Certificate
# Description: Execute this script on any Windows host which will be assessed using
#              CIS-CAT Pro Assessor v4.  This script will create a self-signed certificate
#              and configure the WinRM HTTPS listener.
#
# From: http://blogs.technet.com/b/vishalagarwal/archive/2009/08/22/generating-a-certificate-self-signed-using-powershell-and-certenroll-interfaces.aspx
#
# Author            Modification Date          Description of Modification(s)
# --------------------------------------------------------------------------------------
# Bill Munyan       January 24, 2018           Original Author
# --------------------------------------------------------------------------------------

# Configure the Hostname (DNS name, recommended) or IP address to use as the CN in the self-signed certificate
$hostname = "[HOSTNAME-or-IPADDRESS]"

$name = new-object -com "X509Enrollment.CX500DistinguishedName.1"
$name.Encode("CN=$hostname", 0)

$key = new-object -com "X509Enrollment.CX509PrivateKey.1"
$key.ProviderName = "Microsoft RSA SChannel Cryptographic Provider"
$key.KeySpec = 1
$key.Length = 1024
$key.SecurityDescriptor = "D:PAI(A;;0xd01f01ff;;;SY)(A;;0xd01f01ff;;;BA)(A;;0x80120089;;;NS)"
$key.MachineContext = 1
$key.Create()

$serverauthoid = new-object -com "X509Enrollment.CObjectId.1"
$serverauthoid.InitializeFromValue("1.3.6.1.5.5.7.3.1")
$ekuoids = new-object -com "X509Enrollment.CObjectIds.1"
$ekuoids.add($serverauthoid)
$ekuext = new-object -com "X509Enrollment.CX509ExtensionEnhancedKeyUsage.1"
$ekuext.InitializeEncode($ekuoids)

$cert = new-object -com "X509Enrollment.CX509CertificateRequestCertificate.1"
$cert.InitializeFromPrivateKey(2, $key, "")
$cert.Subject = $name
$cert.Issuer = $cert.Subject
$cert.NotBefore = get-date
$cert.NotAfter = $cert.NotBefore.AddDays(90)
$cert.X509Extensions.Add($ekuext)
$cert.Encode()

$enrollment = new-object -com "X509Enrollment.CX509Enrollment.1"
$enrollment.InitializeFromRequest($cert)
$certdata = $enrollment.CreateRequest(0)
$enrollment.InstallResponse(2, $certdata, 0, "")
# From: http://blogs.technet.com/b/vishalagarwal/archive/2009/08/22/generating-a-certificate-self-signed-using-powershell-and-certenroll-interfaces.aspx

# Get the thumbprints of the SSL certificates that match the hostname
$thumbprints = Get-Childitem -path cert:\LocalMachine\My | Where-Object { $_.Subject -eq "CN=$hostname" } | Select-Object -Property Thumbprint
# PowerShell magic to retrieve the first matching thumbprint (there'll probably only be one anyway)
$thumbprint = @($thumbprints)[0].Thumbprint
# Create a WinRM listener, identifying the SSL certificate by the thumbprint
New-WSManInstance WinRM/Config/Listener -SelectorSet @{Address = "*"; Transport = "HTTPS"} -ValueSet @{Hostname = $hostname; CertificateThumbprint = $thumbprint}

