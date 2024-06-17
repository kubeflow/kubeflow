<#
This script gets the result for recommendations 3.2, 3.3, 3.4, 7.1, 7.2.
#>
#Get the connection string from the environmental variable "XCCDF_VALUE_CONNSTRING"
$ConnString = $Env:XCCDF_VALUE_CONNSTRING
#Get the SQL query to run from the environmental variable "XCCDF_VALUE_QUERY"
$SQLQuery = $Env:XCCDF_VALUE_QUERY
$IncludeSysDBs = $Env:XCCDF_VALUE_INCLUDESYSDBS
#Here we're calling this with dot-source so we can use the $str param in the other script.
. .\sce\ConnStringBuilder.ps1 $ConnString
. .\sce\SQLConn.ps1

##Get the list of DBs to loop through.
If ($IncludeSysDBs){
    $DBListQuery = "SELECT name from sys.databases ORDER BY name;";
}else{
    $DBListQuery = "SELECT name from sys.databases where database_id > 4 ORDER BY name;";
}

$Error.Clear();

try{
    $DBList = ServerQuery $str $DBListQuery;
}
catch{
    $DBList;
    'This is likely due to an error in the connection string. Please verify it is correct.
    ';
    'Supplied connection string: "' + $ConnString +'" 
    ';
    'Converted to: "' + $str +'"';

    exit $env:XCCDF_RESULT_ERROR;
}

##Assume it'll pass unless otherwise.  This way we don't have to compare and set at the end.
$PassFinal = 1;
$DBResults = @{ };

$DBList | % {
	
	$DBName = $_.Name;
	$PassTxt = "Pass";
	[int]$Pass = (ServerQuery $str $SQLQuery).Pass;
	If ($Pass -eq 0) {$PassFinal = 0; $PassTxt = "Fail";}
    $DBResults[$DBName] = $PassTxt;
	##If any DBs fail we fail the whole check.
	If ($Pass -eq 0) { $PassFinal = 0; }
}

##If DBResults is empty and DBList is not a string then there were no DBs to evaluate
If ($DBResults.Count -eq 0 -and $DBList.GetType().Name -ne "string"){
	'No databases were found which require evaluation.';
    exit $env:XCCDF_RESULT_PASS;
}
Else{
    ##Display all results in a table format
    $DBResults | Format-Table @{L='Database Name';E={$_.Name}}, @{L='Result';E={$_.Value}}
}

##Return the pass/fail for the entire server.
If ($PassFinal -eq 1)
{exit $env:XCCDF_RESULT_PASS;}
Else{exit $env:XCCDF_RESULT_FAIL;}