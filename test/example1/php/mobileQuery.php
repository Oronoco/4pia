<!DOCTYPE html>
<html>
<body>

<?php include "DBconnect.php"; ?>
<?php flush(); ?>

<?php

	if ($_GET) {
		$FLAG_party = $_GET['party'];
		$FLAG_verbose = $_GET['verbose'];
	} else {
		$FLAG_party = $argv[1];
		$FLAG_verbose = $argv[2];
	}


	$host			=	'mysql';
	$user			=	'RodPerkins';
	$pass			=	'xyzzy';
	$guestAcctName	=	'Guest';
	// $connection = @mysql_connect($host, $user, $pass);

	// Define the default values for parameters received from parsing url Query String
	$default_party 		= null;
	$default_verbose	= false;


	if (!is_null($connection))
	{
		echo "has connection";

		// Escape User Input to help prevent SQL Injection
		$FLAG_party 		= mysqlclean($FLAG_party, $connection);
		$FLAG_verbose		= mysqlclean($FLAG_verbose, $connection);
	}


	// Replace missing Query String parameters with defaults
	if (is_null($FLAG_party)) 	$FLAG_party = $default_party;
	if (is_null($FLAG_verbose)) $FLAG_verbose = $default_verbose;


	if ($FLAG_party == "dem"  ||  $FLAG_party == "dtweets" ||  $FLAG_party == "d" ) $FLAG_party ="D";
	else if ($FLAG_party == "rep"  ||  $FLAG_party == "rtweets" ||  $FLAG_party == "r") $FLAG_party ="R";
	else $FLAG_party = $default_party;



	echo json_encode($FLAG_party);
	echo json_encode($FLAG_json);
	echo json_encode($FLAG_verbose);
	echo "\n----------";


	$day = date('D');
	$date = date('d');

	// Origianl queries
	// Debt 		= $query  = "SELECT t1.oname,t1.Tweet,t1.TTime,t2.Debt,      t1.Name FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE t1.Party = 'D' AND t1.Code = t2.Code order by t1.GTime DESC";
	// CashOnHand 	= $query  = "SELECT t1.oname,t1.Tweet,t1.TTime,t2.CashOnHand,t1.Name FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE t1.Party = 'D' AND t1.Code = t2.Code order by t1.GTime DESC";
	// Followers 	=  $query = "SELECT oname,Tweet,TTime,Foll,Name FROM Congress.Tweets2 WHERE Party = 'D' order by GTime DESC";

	$party = "t1.Party = '" . $FLAG_party . "' AND";
	if ($FLAG_party == null)
	{
		$party = "";
	}

 	$json = array();


 	$fieldlist 		= "t1.name,t1.oname,t1.Tweet,t1.TTime,t2.Debt,t2.CashOnHand,t1.Foll,t1.Party,t1.Name";
	$query  = "SELECT $fieldlist FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE $party t1.Code = t2.Code order by t1.GTime DESC";


	$query_result = mysql_query($query) or die(mysql_error());
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
			$elem['debt_formatted']			= "$".number_format($query_row['Debt']);
			$elem['cashOnHand']       		= $query_row['CashOnHand'];
			$elem['coh_formatted']			= "$".number_format($query_row['CashOnHand']);
			$elem['followers'] 				= $query_row['Foll'];
			$elem['tid']       				= $query_row['Name'];
			$elem['party']       			= $query_row['Party'];

			$json[] = $elem;

			if ($FLAG_verbose)
			{
				echo "\n----------";
				echo json_encode($query_row);
			}
		}
	}
	mysql_free_result($query_result);


	$json = json_encode( $json );
	if ($FLAG_verbose)
	{
		echo "\n----------";
 		echo json_encode($json);
 	}

?>

<script id="myjson" type="text/javascript">
var myjson = <?php echo $json; ?>;
</script>


</body>
</html>