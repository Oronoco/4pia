#!/usr/bin/perl
    
   use cPanelUserConfig;
   use Unicode::Escape;


###########################################################################

system ('perl /home/pia/PerlScripts/Scripts/Facebook-Elected-HWO.pl');

system ('perl /home/pia/PerlScripts/Scripts/Parse_FacebookPages.pl');

###########################################################################

#system ('rm -rf /home/pia/PerlScripts/RawData/Facebook/*.html');

print "Facebook updated\n";