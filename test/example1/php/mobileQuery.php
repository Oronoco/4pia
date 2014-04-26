<?php

	$host			=	'mysql';
	$user			=	'RodPerkins';
	$pass			=	'xyzzy';
	$guestAcctName	=	'Guest';
	// $connection = @mysql_connect($host, $user, $pass);

	include "DBconnect.php";

	$connection = $conn;


 ?>

<?php flush(); ?>

<?php

	header('Cache-Control: no-store, no-cache, must-revalidate');
	header('Cache-Control: post-check=0, pre-check=0', FALSE);
	header('Pragma: no-cache');


	date_default_timezone_set('UTC');
	$date_array = getdate( mktime() );
	$request = array(
			"date_array" => $date_array,
			"timeStamp" => makeDate( $date_array ),
			"date" => date('D M d Y H:i:s O'),		// mimic JavaScript data format
		);


	// Retrieve data from Query String
	// Define the default values for parameters received from parsing url Query String
	$ARG_debug			= processArg( 1, 'debug', false );
	$ARG_command		= processArg( 2, 'command', 'queryParty' );
	$ARG_party 			= processArg( 3, 'party', null );
	$ARG_trace 			= processArg( 4, 'trace', false );
	$ARG_fieldlist 		= processArg( 5, 'field', false );
	$ARG_maxLineLength 	= processArg( 6, 'maxLineLength', 64 );
	$ARG_delimiter 		= processArg( 7, 'delimiter', "|" );
	$ARG_tableName		= processArg( 8, 'table', "Tweets2" );
	$ARG_tableLimit		= processArg( 8, 'limit', 10000000 );
	$ARG_tableBgColor	= processArg( 9, 'tblColor', "FFFFFF" );


	if ($ARG_party == "dem"  ||  $ARG_party == "dtweets" ||  $ARG_party == "d" ) $ARG_party ="D";
	else if ($ARG_party == "rep"  ||  $ARG_party == "rtweets" ||  $ARG_party == "r") $ARG_party ="R";
	else $ARG_party = null;


	if ($ARG_debug)
	{
		dumpValues( "Before processing" );
	}


	// Process the command
	if (strcasecmp( $ARG_command, "dumpTable") == 0)
	{
		// Dumptable will produce an HTML table representation of any table in the database.

		// use the field list to display on selected fields
		$tableFieldlist = $ARG_fieldlist;

		// if the field parameter in the QUERY String was null, then assume
		// that all the fields should be dumped
		if (is_null($_GET['field']))
		{
			$tableFieldlist = "*";
		}

		// Put the names of the tables into an array
		$tables = explode( ",", $ARG_tableName );

		// Asterisk is used as a wildcard to dump all the known tables
		if ($ARG_tableName == "*")
		{
			$tables = array(
				"LineChartData",
				"Tweets",
				"Tweets2",
				"Users",
				"WordCloud"
			);

			$tableFieldlist = "*";
		}


		dumpTableNames();

		// Dump each table in the list
		for ( $counter = 0; $counter < count($tables); $counter += 1)
		{
			dumpTable( $tables[$counter], $tableFieldlist, $ARG_maxLineLength, $ARG_delimiter, $ARG_tableLimit );
		}

	}
	else if (strcasecmp( $ARG_command, "getUrlContents") == 0)
	{
		$json = getUrlContents();
	}
	else if (strcasecmp( $ARG_command, "queryParty") == 0)
	{
		$json = queryParty();
	}
	else if (strcasecmp( $ARG_command, "queryHouseMembers") == 0)
	{
		$json = queryHouseMembers();
	}
	else if (strcasecmp( $ARG_command, "tweetCloud") == 0)
	{
	}
	else if (strcasecmp( $ARG_command, "pulse") == 0)
	{
	}

	$request['json'] = $json;

	$request = json_encode( $request );
	if ($ARG_trace)
	{
		echo "----------<br>";
		echo $request;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	function toHTML( $title, $fieldlist, $result, $virtual=NULL, $username=NULL, $maxLineLength = 512 )
	{
		GLOBAL $ARG_tableBgColor;

		$fields = explode( ",", $fieldlist );

		for ( $counter = 0; $counter < count($fields); $counter += 1)
		{
			$field = $fields[$counter];
			$pos = strpos ( $field, "." );
			if ($pos > 0)
			{
				$fields[$counter] = substr( $field, $pos + 1);
			}
		}

		$display_string = "";

		if (is_null($title) == false)
		{
			$display_string = "<h3>$title<h3>\n";
		}

		$display_string .= "<table id='$title' border=1 bgColor='$ARG_tableBgColor'>\n";
		$display_string .= "<tr>\n";
		$display_string .= "<th>Row</th>";
		for ( $counter = 0; $counter < count($fields); $counter += 1)
		{
			$display_string .= "<th>$fields[$counter]</th>";
		}
		if (is_null($virtual) == false)
		{
			$display_string .= $virtual( $row, -1, $username );
		}

		$display_string .= "\n</tr>";

		if (is_null($result) == false)
		{
			$rowNum = 0;

			while ($row = mysql_fetch_assoc($result))
			{
				$rowNum += 1;
				$display_string .= "<tr>";
				$display_string .= "<td>$rowNum</td>";
				for ( $counter = 0; $counter < count($fields); $counter += 1)
				{
					$colname = $fields[$counter];
					$col_value = htmlspecialchars( $row[$colname] );

					if (strlen( $col_value ) > $maxLineLength)
					{
						$col_value = "(len=" . strlen( $col_value ) . " > " . $maxLineLength . ") " . substr ( $col_value, 0, $maxLineLength );
					}

					$display_string .= "<td>$col_value</td>";
				}

				if (is_null($virtual) == false)
				{
					$display_string .= $virtual( $row, $counter, $username );
				}

				$display_string .= "\n</tr>";
			}
		}
		$display_string .= "</table>";

		return $display_string;

	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function dumpTable( $tableName, $fieldlist = "*", $maxLineLength = 512, $delimiter = "|", $limit = 100 )
	{
		GLOBAL $date_array;

		// Performing SQL query
		$query = "SELECT $fieldlist FROM Congress.$tableName";
		if ($limit > 0)
		{
			$query .= " limit 0,$limit";
		}


		$pass = 1;
		while( $pass <= 2)
		{
			$temp = $query;
			if ($pass == 1)
			{
				$temp = "Explain $query";

			}

			$query_result = mysql_query($temp) or die('Query failed: ' . mysql_error());
			$count = mysql_num_rows($query_result);

			$keys = array_keys(mysql_fetch_assoc($query_result));
			$title = "Dump of '$temp' with '$count' rows, on " . makeDate( $date_array );
			$columnlist = implode( ",", $keys);
			mysql_data_seek($query_result, 0);

			echo toHTML( $title, $columnlist, $query_result, NULL, NULL, $maxLineLength );

			// Free resultset
			mysql_free_result($query_result);

			$pass++;
		}
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function dumpTableNames()
	{
		$dbname = "Congress";
		$tableNames = array();
		$sql = "SHOW TABLES FROM $dbname";
		$result = mysql_query($sql);
		$arrayCount = 0;
		while ($row = mysql_fetch_row($result))
		{
			$tableNames[$arrayCount] = $row[0];
			$arrayCount++; //only do this to make sure it starts at index 0
		}
		$title = json_encode( $tableNames );
		echo "<h3>Table Names</h3>$title";
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function makeDate( $date_array, $adjust_year = 0, $adjust_month = 0, $adjust_day = 0, $adjust_hour = 0, $adjust_min = 0, $adjust_sec = 0  )
	{
		$year = $date_array[year] + $adjust_year;
			$formated_date  = $year . "-";

		$month = $date_array[mon] + $adjust_month;
			if ($month < 10)
			{
				$formated_date .= "0";
			}
			$formated_date .= $month . "-";

		$day = $date_array[mday] + $adjust_day;
			if ($day < 10)
			{
				$formated_date .= "0";
			}
			$formated_date .= $day . " ";

		$hours = $date_array[hours] +  + $adjust_hour;
			if ($hours  < 10)
			{
				$formated_date .= "0";
			}
			$formated_date .= $hours . ":";

		$min = $date_array[minutes ] +  + $adjust_min;
			if ($min  < 10)
			{
				$formated_date .= "0";
			}
			$formated_date .= $min . ":";

		$sec = $date_array[seconds ] +  + $adjust_sec;
			if ($sec  < 10)
			{
				$formated_date .= "0";
			}
			$formated_date .= $sec;

		return $formated_date;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function processArg( $index, $name, $default )
	{
		GLOBAL $connection;

		$v =  ($_GET) ? $_GET[ $name ] : $argv[ $index ];

		if ($v == "false"  ||  $v == "FALSE") $v = false;
		else if ($v == "true"  ||  $v == "TRUE") $v = true;
		else if ($v == "null"  ||  $v == "NULL") $v = null;

		if (is_null($v)) 	$v = $default;

		if (false &&  is_string($v)  &&  !is_null($connection))
		{
			// Escape User Input to help prevent SQL Injection
			$v = mysqlclean($v, $connection);
		}

		return $v;
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function throwError( $msg )
	{
		die( "%error% $msg" );
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function getUrlContents()
	{
		GLOBAL $ARG_command;
		GLOBAL $ARG_debug;
		GLOBAL $ARG_trace;
		GLOBAL $ARG_fieldlist;
		GLOBAL $ARG_party;

		$url = trim($ARG_fieldlist,'\\"');
		$url = trim($url,'"');
		$url = trim($url,"\\\'");
		$url = trim($url,"\'");
		
		if ($ARG_trace)
		{
			echo "----------<br>";
			echo $url;
		}
		
		$crl = curl_init();
		$timeout = 5;
		curl_setopt ($crl, CURLOPT_URL,$url);
		curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
		$ret = curl_exec($crl);
		
		curl_close($crl);
		
		if ($ret == FALSE) 
		{
//			die('getUrlContents: ' . $url )
		}

		$data = array();
		$data['page']  = $ret;
		
		return $data;
	}
	

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function queryHouseMembers()
	{
		GLOBAL $ARG_command;
		GLOBAL $ARG_debug;
		GLOBAL $ARG_trace;
		GLOBAL $ARG_fieldlist;
		GLOBAL $ARG_party;

		$data = array();
		$party = ($ARG_party == null) ? "" : "WHERE t1.Party = '$ARG_party'";
		$fieldlist 	= ($ARG_fieldlist) ? $ARG_fieldlist : "t1.Code,t1.name,t1.TID,t1.FileNum,t1.Party,t1.House";


		$query  = "SELECT $fieldlist FROM Congress.HouseMembers t1 $party";

		if ($ARG_trace)
		{
			echo "----------<br>";
			echo json_encode($query);
		}

		$query_result = mysql_query($query) or die(mysql_error());
		$count = mysql_num_rows($query_result);
		if (is_null($query_result) == false)
		{
			// Insert a new row in the table for each record returned
			while ($query_row = mysql_fetch_assoc($query_result))
			{
				$elem = array();

				$elem['code']      				= $query_row['Code'];
				$elem['name']      				= $query_row['name'];
				$elem['tid']       				= $query_row['TID'];
				$elem['fileNum']       			= $query_row['FileNum'];
				$elem['party']       			= $query_row['Party'];
				$elem['house']       			= $query_row['House'];

				$data[] = $elem;

				if ($ARG_trace)
				{
					echo "----------<br>";
					echo json_encode($query_row);
				}
			}
		}
		mysql_free_result($query_result);

		return $data;
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function queryParty()
	{
		GLOBAL $ARG_command;
		GLOBAL $ARG_debug;
		GLOBAL $ARG_trace;
		GLOBAL $ARG_fieldlist;
		GLOBAL $ARG_party;

		// Origianl queries
		// Debt 		= $query  = "SELECT t1.oname,t1.Tweet,t1.TTime,t2.Debt,      t1.Name FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE t1.Party = 'D' AND t1.Code = t2.Code order by t1.GTime DESC";
		// CashOnHand 	= $query  = "SELECT t1.oname,t1.Tweet,t1.TTime,t2.CashOnHand,t1.Name FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE t1.Party = 'D' AND t1.Code = t2.Code order by t1.GTime DESC";
		// Followers 	= $query  = "SELECT oname,Tweet,TTime,Foll,Name FROM Congress.Tweets2 WHERE Party = 'D' order by GTime DESC";

		$data = array();
		$party = ($ARG_party == null) ? "" : "t1.Party = '$ARG_party' AND";
		$fieldlist 	= ($ARG_fieldlist) ? $ARG_fieldlist : "t1.Code,t1.name,t1.oname,t1.Tweet,t1.TTime,t2.Debt,t2.CashOnHand,t1.Foll,t1.Party,t1.CardURL,t1.DataURL,t1.LargeURL";


		$query  = "SELECT $fieldlist FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE $party t1.Code = t2.Code order by t1.GTime DESC";

		if ($ARG_trace)
		{
			echo "----------<br>";
			echo json_encode($query);
		}

		$query_result = mysql_query($query) or die(mysql_error());
		$count = mysql_num_rows($query_result);
		if (is_null($query_result) == false)
		{

			// Insert a new row in the table for each record returned
			while ($query_row = mysql_fetch_assoc($query_result))
			{
				$elem = array();

				$elem['code']      				= $query_row['Code'];
				$elem['name']      				= $query_row['oname'];
				$elem['tweet']     				= $query_row['Tweet'];
				$elem['tim']       				= $query_row['TTime'];
				$elem['debt']       			= $query_row['Debt'];
				$elem['cashOnHand']       		= $query_row['CashOnHand'];
				$elem['followers'] 				= $query_row['Foll'];
				$elem['tid']       				= $query_row['Name'];
				$elem['party']       			= $query_row['Party'];

				$data[] = $elem;

				if ($ARG_trace)
				{
					echo "----------<br>";
					echo json_encode($query_row);
				}
			}
		}
		mysql_free_result($query_result);

		return $data;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	function dumpValues( $title )
	{
		GLOBAL $username;
		GLOBAL $password;
		GLOBAL $ARG_command;
		GLOBAL $ARG_debug;
		GLOBAL $ARG_trace;
		GLOBAL $ARG_fieldlist;
		GLOBAL $ARG_party;

		echo "<br>----------<br>";
		echo "$title<br>";
		echo "command: (len=" . 		strlen($ARG_command) 		. ", is_null: " . (is_null($ARG_command)?"true":"false") 		. ") '$ARG_command' " . 		json_encode($ARG_command) 		. "<br>";
		echo "debug: (len=" . 			strlen($ARG_debug) 			. ", is_null: " . (is_null($ARG_debug) ?"true":"false")			. ") '$ARG_debug' " . 		json_encode($ARG_debug) 		. "<br>";
		echo "trace: (len=" . 			strlen($ARG_trace) 			. ", is_null: " . (is_null($ARG_trace) ?"true":"false")			. ") '$ARG_trace' " . 		json_encode($ARG_trace) 		. "<br>";
		echo "fields: (len=" . 			strlen($ARG_fieldlist) 		. ", is_null: " . (is_null($ARG_fieldlist) ?"true":"false")			. ") '$ARG_fieldlist' " . 		json_encode($ARG_fieldlist) 		. "<br>";
		echo "party: (len=" . 			strlen($ARG_party) 			. ", is_null: " . (is_null($ARG_party) ?"true":"false")			. ") '$ARG_party' " . 		json_encode($ARG_party) 		. "<br>";
	}
?>

<!DOCTYPE html>
<html>
<body>


<script id="request" type="text/javascript">
var request = /*{json}*/ <?php echo $request; ?> /*{json}*/ ;
</script>


</body>
</html>