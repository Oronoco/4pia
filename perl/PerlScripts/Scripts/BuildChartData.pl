#!/usr/bin/perl
use cPanelUserConfig;


use DBI;
use DBD::mysql;

###########################################################################

my %month = (
    1 => Jan, 2 => Feb, 3 => Mar, 4 => Apr,
    5 => May, 6 => Jun, 7 => Jul, 8 => Aug,
    9 => Sep, 10=> Oct, 11=> Nov, 12=> Dec,
);

  my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);
 
  $mmon = $mon+1;

  $year = $year + 1900;

  $hour = sprintf ("%02d",$hour);
  $min  = sprintf ("%02d",$min);

 $m = $month{$mmon};
 $i = $mday;
 
##########################################################################


# PERL MYSQL CONNECT()
#require "MYSQL_Connect.pl";


# PERL MYSQL CONNECT()
$dbh = DBI->connect('DBI:mysql:Congress','Dev','ASVC)E{&MrId');




#for ($i=1; $i<32; $i++){


$query = "SELECT TDate, count(*) as total FROM Congress.Tweets WHERE TDate = '$i-$m-2014' AND Party = 'R' GROUP BY Party";

 $sth = $dbh->prepare($query);
 $sth->execute;
          
 while (my ($dat,$total) = $sth->fetchrow_array) {
              
             my ($da1,$da2,$yr) = split(/-/,$dat);



              $year = "2014";
                if ($da2 eq "Jan") { $val = $year."01".$da1;}
                if ($da2 eq "Feb") { $val = $year."02".$da1;}
                if ($da2 eq "Mar") { $val = $year."03".$da1;}
                if ($da2 eq "Apr") { $val = $year."04".$da1;}
                if ($da2 eq "May") { $val = $year."05".$da1;}
                if ($da2 eq "Jun") { $val = $year."06".$da1;}
                if ($da2 eq "Jul") { $val = $year."07".$da1;}
                if ($da2 eq "Aug") { $val = $year."08".$da1;}
                if ($da2 eq "Sep") { $val = $year."09".$da1;}
                if ($da2 eq "Oct") { $val = $year.'10'.$da1;}
                if ($da2 eq "Nov") { $val = $year."11".$da1;}
                if ($da2 eq "Dec") { $val = $year."12".$da1;}
       
              $line = "INSERT INTO LineChartData (date,Rep) VALUES('$val','$total'); \n";
               $dbh->do("$line") || die;   
               print $m." --> $val\n";
        }   
     
################/ DEMS ###############

$query = "SELECT TDate, count(*) as total FROM Congress.Tweets WHERE TDate = '$i-$m-2014' AND Party = 'D' GROUP BY Party";

 $sth = $dbh->prepare($query);
 $sth->execute;
          
       while ($date,$total = $sth->fetchrow_array) {
                  
              @newDate = split(/-/,$date);
              if ($newDate[2] eq "14") { $year = "2014";
                if ($da2 eq "Jan") { $val = $year."01".$da1;}
                if ($da2 eq "Feb") { $val = $year."02".$da1;}
                if ($da2 eq "Mar") { $val = $year."03".$da1;}
                if ($da2 eq "Apr") { $val = $year."04".$da1;}
                if ($da2 eq "May") { $val = $year."05".$da1;}
                if ($da2 eq "Jun") { $val = $year."06".$da1;}
                if ($da2 eq "Jul") { $val = $year."07".$da1;}
                if ($da2 eq "Aug") { $val = $year."08".$da1;}
                if ($da2 eq "Sep") { $val = $year."09".$da1;}
                if ($da2 eq "Oct") { $val = $year."10".$da1;}
                if ($da2 eq "Nov") { $val = $year."11".$da1;}
                if ($da2 eq "Dec") { $val = $year."12".$da1;}
        
              } #year

                         
               $line = "UPDATE LineChartData set Dem = '$total' WHERE date = '$val';\n";
                 $dbh->do("$line") || die;   
       }
 
################/ IND ##############

$query = "SELECT TDate, count(*) as total FROM Congress.Tweets WHERE TDate = '$i-$m-2014' AND Party = 'I' GROUP BY Party";

 $sth = $dbh->prepare($query);
 $sth->execute;
          
 while ($date,$total = $sth->fetchrow_array) {
              
              @newDate = split(/-/,$date);
              if ($newDate[2] eq "14") { $year = "2014";
                if ($da2 eq "Jan") { $val = $year."01".$da1;}
                if ($da2 eq "Feb") { $val = $year."02".$da1;}
                if ($da2 eq "Mar") { $val = $year."03".$da1;}
                if ($da2 eq "Apr") { $val = $year."04".$da1;}
                if ($da2 eq "May") { $val = $year."05".$da1;}
                if ($da2 eq "Jun") { $val = $year."06".$da1;}
                if ($da2 eq "Jul") { $val = $year."07".$da1;}
                if ($da2 eq "Aug") { $val = $year."08".$da1;}
                if ($da2 eq "Sep") { $val = $year."09".$da1;}
                if ($da2 eq "Oct") { $val = $year."10".$da1;}
                if ($da2 eq "Nov") { $val = $year."11".$da1;}
                if ($da2 eq "Dec") { $val = $year."12".$da1;}
        
              } #year
               
               $line "UPDATE LineChartData set Ind = '$total' WHERE date = '$val';\n";
               $dbh->do("$line") || die;   
    }
#}
