#!/usr/bin/perl


use DBI;
use DBD::mysql;


##########################################################################

open(IN,"/home/pia/PerlScripts/DBload/LoadChartData.txt") || die;

   print "GOING TO LOAD CHARTDATA  ";system ("wc -l /home/pia/PerlScripts/DBload/LoadChartData.txt"); 

# PERL MYSQL CONNECT()
#require "MYSQL_Connect.pl";
$dbh = DBI->connect('DBI:mysql:Congress','Dev','ASVC)E{&MrId');



while ($line = <IN>) {

        $dbh->do("$line") || die;   

          print $i."\n"; $i++;    

} # end while


system("del /home/pia/PerlScripts/DBload/LoadChartData.txt");