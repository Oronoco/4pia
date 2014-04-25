#!/usr/bin/perl
    
   use cPanelUserConfig;
   use Unicode::Escape;


###########################################################################

system ('perl /home/pia/PerlScripts/Scripts/BuildChartData.pl');

system ('php /home/pia/public_html/BuildDashboardChartData.php');

###########################################################################

print "LineChart updated\n";

