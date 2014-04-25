#!/usr/bin/perl
use cPanelUserConfig;

######################################################################

system ("perl /home/pia/PerlScripts/Scripts/HouseVote_CrawlerParser.pl");
system ("perl /home/pia/PerlScripts/Scripts/Load_HouseLeg.pl");
