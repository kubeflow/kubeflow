<#	
Includes for SQL connections
#>

function ServerQuery
{
	param (
		[string]$ConnString,
		[string]$Query
	)

	$connection = new-object system.data.SqlClient.SQLConnection($ConnString)
	$command = new-object system.data.sqlclient.sqlcommand($Query, $connection)
	$connection.Open()

	$adapter = New-Object System.Data.sqlclient.sqlDataAdapter $command
	$dataset = New-Object System.Data.DataSet

	$Error.Clear();
	try
	{
		$adapter.Fill($dataSet) | Out-Null
	}
	catch
	{
		$Error.Exception.Message;
	}
	$connection.Close()
	$dataSet.Tables
}