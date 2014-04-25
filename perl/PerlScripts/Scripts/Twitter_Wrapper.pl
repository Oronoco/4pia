#!/usr/bin/perl
use cPanelUserConfig;


#########################################################################

#open(OUT,">>/home/pia/PerlScripts/DBload/TLOG.txt");


############### Twitter Wrapper #############
  my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);

	$year = $year + 1900;
        $mon++;

	my $hr = sprintf ("%02d",$hour);
	my $mi  = sprintf ("%02d",$min);


############################################################################
  
#	system ("perl /home/pia/PerlScripts/Scripts/Facebook-Elected-HWO.pl $path");     # works
#                  print  "Facebook Scrapped ===> $path\n";

	system ("perl /home/pia/PerlScripts/Scripts/Twitter.HWO.pl");              # works
   
 		 print  "Twitter Scrapped --> $hr:$mi\n";

	system ("perl /home/pia/PerlScripts/Scripts/Parse_Tweets.pl");  # worksParse Tweets
   
		 # print  "PARSED  --> $hr:$mi\n";

	system ("perl /home/pia/PerlScripts/Scripts/Load_Tweeter_DB.pl");
                #  print "TWEETS loaded ---> $hr:$mi\n";

	system ("perl /home/pia/PerlScripts/Scripts/Load_Tweets2_DB.pl");

		  print  "LOADED  --> NEW CREATED \n";
################################################################

       print  " ------------ DONE--------- $mon-$mday-$year     $hour:$min\n";
