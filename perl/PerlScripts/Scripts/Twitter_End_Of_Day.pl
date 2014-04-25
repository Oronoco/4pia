#!/usr/bin/perl
use cPanelUserConfig;


#########################################################################

#open(OUT,">>/home/pia/PerlScripts/DBload/TLOG.txt");


############### Twitter Wrapper #############
#  my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);

#	$year = $year + 1900;
#        $mon++;

#	my $hr = sprintf ("%02d",$hour);
#	my $mi  = sprintf ("%02d",$min);

#################################################################################

         system ("perl /home/pia/PerlScripts/Scripts/Twitter_Hashtag_HWO.pl");

	 system ("perl /home/pia/PerlScripts/Scripts/Parse_Hashtags.pl");

	 system ("perl /home/pia/PerlScripts/Scripts/Load_Hash_DB.pl");

         system ("perl /home/pia/PerlScripts/Scripts/Load_CleanHashTable.pl");

         system ("rm /home/pia/PerlScripts/DBload/Hash.txt");

         system("perl /home/pia/PerlScripts/Scripts/BuildChartData.pl");

         system("perl /home/pia/PerlScripts/Scripts/Load_ChartData.pl");

         system("perl /home/pia/PerlScripts/Scripts/Load_EmailData.pl");

         system("perl /home/pia/PerlScripts/Scripts/BuildDailyChartData.pl");

         system("perl /home/pia/PerlScripts/Scripts/HouseVote_CrawlerParser.pl");

         system("perl /home/pia/PerlScripts/Scripts/Load_HouseLeg.pl");


print "DONE WITH EMAIL UPDATE, CHART UPDATE, HASHTAGS ----- $mday/$mon/$year  $hr:$mi\n";

