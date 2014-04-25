#!/usr/bin/perl
use cPanelUserConfig;

use DBI;
use DBD::mysql;

my $ct =0;

open(IN,"/home/pia/PerlScripts/DBload/RollCallLoad.txt") || die;

# PERL MYSQL CONNECT()
#require "MYSQL_Connect.pl";
$dbh = DBI->connect('DBI:mysql:Congress','Dev','ASVC)E{&MrId');

while ($line = <IN>) {

         $line =~ s/O'R/O\'R/g;

          $dbh->do("$line") || die;       

	  print "Loading RollCall: $ct\n";
       	  $ct++; 

} # end while

$dbh->disconnect();

system("del /home/pia/PerlScripts/DBLoad/RollCallLoad.txt");
system("del /home/pia/PerlScripts/DBLoad/RollCall.xml");

exit;
