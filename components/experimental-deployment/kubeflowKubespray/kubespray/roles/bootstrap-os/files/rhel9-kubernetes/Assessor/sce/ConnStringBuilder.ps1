param ($jdbcString)
<#	
Build a conn string.  This will be included with all scripts so changing it in this one place
will change the entire set of scripts conn behavior.
#>
#####################################
#########BEGIN Parse JDBC############
#####################################
$Server = [regex]::matches($jdbcString, "(?<=sqlserver:\/\/)([^;]*)").captures.groups[1].value;
$Server = "Data Source=$Server";

if ([regex]::matches($Server, "^[^\:]+(\:[0-9]+$)").captures.groups[1].value -ne "")
{
    $pos = $Server.IndexOf(':');
    $Server = $Server.Substring(0,$pos);
}

if ($jdbcString -match "domain=")
{
	$Domain = [regex]::matches($jdbcString, "(?<=;domain=)([^;]*)").captures.groups[1].value;		
}
if ($jdbcString -match "user=" -and !$Server.Contains($Domain))
{
	$User = [regex]::matches($jdbcString, "(?<=;user=)([^;]*)").captures.groups[1].value;
}
else
{
	$User = "Integrated Security=True";
}

If ($Domain -eq ''){$Domain = $null}

If ($Domain -ne $null -and $User -ne "Integrated Security=True")
{
	$User = $Domain, $User -join "\";
    $User = "User ID=$User;";
}
Else { 
    If ($User -ne "Integrated Security=True")
    {
        $User = "User ID=$User;";
    }
}

if ($jdbcString -match "DatabaseName=")
{
	$DBName = [regex]::matches($jdbcString, "(?<=;DatabaseName=)([^;]*)").captures.groups[1].value;
	$DBName = "Initial Catalog=$DBName;";
}
else
{
	$DBName = "";
}

if ($User -ne "Integrated Security=True" -and $jdbcString -match "password=")
{
	$Pword = [regex]::matches($jdbcString, "(?<=;password=)([^;]*)").captures.groups[1].value;
	$Pword = "Password=$Pword;";
}
else
{
	$Pword = "";
}

if ($jdbcString -match "instance=")
{
	$Instance = [regex]::matches($jdbcString, "(?<=;instance=)([^;]*)").captures.groups[1].value;
	$Instance = "\$Instance;";
}
else
{
	$Instance = ";";
}

#####################################
#########END Parse JDBC##############
#####################################

#####################################
#########BEGIN Build String##########
#####################################
$str = "$Server$Instance$DBName$User$PWord";
#####################################
#########END Build String############
#####################################