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

  #$year =~ s/20//g; #in 2014 twitter changed to yyyy

  $path = $mday."-".$m."-".$year;
##########################################################################
 my $d = 0;

  my $commd = "grep '$path' /home/pia/PerlScripts/DBLoad/Tweet.txt > /home/pia/PerlScripts/DBLoad/Load.txt";

    #print $commd."\n";
    system ("$commd");

  open(IN,"</home/pia/PerlScripts/DBLoad/Load.txt");

# PERL MYSQL CONNECT()
#  require "MYSQL_Connect.pl"
$dbh = DBI->connect('DBI:mysql:Congress','Dev','ASVC)E{&MrId');



while ($line = <IN>) {

     $line =~ s/\" data-send-impression-cookie><span class=\"//g;
     $line =~ s/\#/\\#/g;
     $line =~ s/\@/\\@/g;
     $line =~ s/-mini-profile-stat//g;
     $line =~ s/class=js//g;

     $dbh->do("$line") || die;   
    
     print "Loading Tweets: $d\n";
          $d++;    

} # end while

my $stmt = "DELETE FROM Tweets WHERE Tweet = ''";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = oname";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,' ','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'.','')";
      $dbh->do($stmt);

#my $stmt = "update `Tweets` set oname = replace(oname,'&#39;','\'')";
#      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'Senator','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'Cong','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'Rep','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'Sen_','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'US','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'ressman','')";
      $dbh->do($stmt);


my $stmt = "update Tweets set cname = replace(cname,'_','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'MD','')";
      $dbh->do($stmt);

my $stmt = "update Tweets set cname = replace(cname,'é','i')";
      $dbh->do($stmt);

my $stmt = "Update `Tweets` set Tweet = replace(Tweet,'\/','\\/')";
      $dbh->do($stmt);

my $stmt = "update `Tweets` set TTime = replace(TTime,'js-tooltip','');";
      $dbh->do($stmt);


open(IN2,"</home/pia/PerlScripts/SourceData/Congress_TWITTER_Code.txt");

my $cc = 0;

while ($line = <IN2>) {

        $dbh->do("$line") || die;       
      #  print "Loading Tweet CODES: $cc\n";
           $cc++;

} # end while

my $stmt = "DELETE FROM Tweets WHERE Tweet = ''";
      $dbh->do($stmt);

################################################################################################


  my $stmt = "Update Tweets set OrgTime = TTime";
        $dbh->do($stmt);

  my $stmt = "Update Tweets set OrgTime = replace(OrgTime,' ','')";
        $dbh->do($stmt);


   my $stmt = "update Tweets2 set TDate = replace(TDate,' ','-')";
        $dbh->do($stmt);


   my $stmt = "update `Tweets` set cname = Name WHERE Name like '%LindaSanchez%'";
         $dbh->do($stmt);

##########################################################################################

$dbh->disconnect();

print "LOADED TWEETS\n";

exit;