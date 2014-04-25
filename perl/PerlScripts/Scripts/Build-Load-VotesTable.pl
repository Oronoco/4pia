#!/usr/bin/perl
use cPanelUserConfig;
 

##################################################################



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

 $su = ($mday-6);
 $mo = ($mday-5);
 $tu = ($mday-4);
 $we = ($mday-3);
 $th = ($mday-2);
 $fr  = ($mday-1);
 $sa  = $mday;

##########################################################################

open (OUT,">>/home/pia/PerlScripts/DBLoad/UpdateVotesCount.txt");


#######################################################


open (IN, "/home/pia/PerlScripts/SourceData/Congress_Codes.txt");

while (<IN>) {

   $line = $_;
     chomp $line;

     print OUT "update Congress.`Emails` set Votes = (SELECT count(*) FROM Congress.`RollCall` where (VDate = '$su-$m-$year' or VDate = '$mo-$m-$year' or VDate = '$tu-$m-$year' or VDate = '$we-$m-$year'  or VDate = '$th-$m-$year' or VDate = '$fr-$m-$year' or VDate = '$sa-$m-$year')and (Vote = 'Yea' or Vote = 'Aye') and Code = '$line') AND LegDesc not null) where Code = '$line';\n";
}

close IN;
close OUT;

############################################################################
#
#  LOAD TABLE
#
##########################################################################

use DBI;
use DBD::mysql;

open(IN,"/home/pia/PerlScripts/DBload/UpdateVotesCount.txt") || die;

   print "GOING TO LOAD VOTES DATA  ";system ("wc -l /home/pia/PerlScripts/DBload/UpdateVotesCount.txt"); 

# PERL MYSQL CONNECT()
require "MYSQL_Connect.pl";

while ($line = <IN>) {

        $dbh->do("$line") || die;   
          print $i."\n"; $i++;    

} # end while

    $dbh->do("UPDATE Congress.Emails set TotalVotes = (SELECT distinct count(Roll), Roll, LegNum FROM `RollCall` WHERE LegNum <> 'QUORUM' group by Roll;)");

system("del /home/pia/PerlScripts/DBload/UpdateVotesCount.txt");

exit;


      