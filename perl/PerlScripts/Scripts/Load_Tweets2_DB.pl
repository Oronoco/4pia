#!/usr/bin/perl
use cPanelUserConfig;

use DBI;
use DBD::mysql;

###########################################################################
# removed || die from dbh->do;

##########################################################################

 open(IN,"</home/pia/PerlScripts/DBLoad/Load.txt");

   print "GOING TO LOAD #2 \n"; 

# PERL MYSQL CONNECT()
#require "MYSQL_Connect.pl";
$dbh = DBI->connect('DBI:mysql:Congress','Dev','ASVC)E{&MrId');


my $stmt = "DELETE FROM Tweets2";
      $dbh->do($stmt);

while ($line = <IN>) {

     $line =~ s/\" data-send-impression-cookie><span class=\"//g;
     $line =~ s/\#/\\#/g;
     $line =~ s/\@/\\@/g;
     $line =~ s/-mini-profile-stat//g;
     $line =~ s/class=js//g;

      $line =~ s/Tweets/Tweets2/g;

        $dbh->do("$line");       

} # end while

my $stmt = "DELETE FROM Tweets2 WHERE Tweet = ''";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = oname";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,' ','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'.','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'Senator','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'Cong','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'Rep','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'Sen_','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'US','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'ressman','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'_','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'MD','')";
      $dbh->do($stmt);

my $stmt = "update Tweets2 set cname = replace(cname,'é','i')";
      $dbh->do($stmt);

my $stmt = "update `Tweets2` set TTime = replace(TTime,'js-tooltip','');";
     $dbh->do($stmt);

open(IN2,"</home/pia/PerlScripts/SourceData/Congress_TWITTER_Code2.txt");

my $cc = 0;

while ($line = <IN2>) {

        $dbh->do("$line") || die;       
      #  print "Loading Tweet2 CODES: $cc\n";
           $cc++;

} # end while

my $stmt = "DELETE FROM Tweets2 WHERE Tweet = ''";
      $dbh->do($stmt);

################################################################################################

  my $stmt = "update `Tweets2` set Tweet = replace(Tweet,'\/','\\/')";
         $dbh->do($stmt);

  my $stmt = "update `Tweets2` set OrgTime = TTime";
        $dbh->do($stmt);

  my $stmt = "update `Tweets2` set OrgTime = replace(OrgTime,' ','')";
        $dbh->do($stmt);

   my $stmt = "update Tweets2 set TDate = replace(TDate,' ','-')";
        $dbh->do($stmt);

   my $stmt = "update `Tweets2` set cname = Name WHERE Name like '%LindaSanchez%'";
         $dbh->do($stmt);

  my $stmt = "ALTER TABLE `Tweets2` ORDER BY `OrgTime` DESC ;";
        $dbh->do($stmt);

  my $stmt = "OPTIMIZE TABLE `Tweets2`;";
        $dbh->do($stmt);


##########################################################################################
system("rm -rf /home/pia/PerlScripts/DBload/Load.txt");

print "Done with TWEETS2\n";

$dbh->disconnect();

exit;