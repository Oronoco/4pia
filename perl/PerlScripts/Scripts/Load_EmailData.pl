#!/usr/bin/perl
use cPanelUserConfig;


use DBI;
use DBD::mysql;


##########################################################################

open(IN,"/home/pia/PerlScripts/SourceData/UpdateEmailsTable.txt") || die;

   print "GOING TO LOAD EMAILDATA  ";

# PERL MYSQL CONNECT()
#require "MYSQL_Connect.pl";
$dbh = DBI->connect('DBI:mysql:Congress','Dev','ASVC)E{&MrId');



while ($line = <IN>) {

        $dbh->do("$line") || die;   

          print $i."\n"; $i++;    

} # end while
