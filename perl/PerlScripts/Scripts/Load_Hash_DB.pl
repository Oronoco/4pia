#!/usr/bin/perl
use cPanelUserConfig;

use DBI;
use DBD::mysql;

###########################################################################
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

  $year =~ s/20//g; 

  $path = $mday."-".$m."-".$year;

##########################################################################

open(IN,"open(IN,"/home/pia/PerlScripts/DBload/LoadHash.txt") || die;

my $i=1;   

# PERL MYSQL CONNECT()
#require "MYSQL_Connect.pl";
$dbh = DBI->connect('DBI:mysql:Congress','Dev','ASVC)E{&MrId');


while ($line = <IN>) {


        $dbh->do("$line") || die;      

          print "Loading: $i\n";

            $i++; 

} # end while


$dbh->disconnect();

exit;