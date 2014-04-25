#!/usr/bin/perl
use cPanelUserConfig; 

	use LWP::Simple;
        use LWP::UserAgent;
        use HTTP::Request;
        use HTTP::Response;
	use Crypt::SSLeay;
 	use WWW::Mechanize;


################################################################################

my $url = "";
my @path = "/home/pia/PerlScripts/RawData/Facebook"; 
$page = 1;

################################################################################

open(IN, "/home/pia/PerlScripts/SourceData/House_Facebook.txt") || die 'No file Captin\n';


  while (<IN>) {

   $b = $_;
     chomp $b;

      ($hou,$name,$st,$u) = split(/\|/,$b);
              if ($u =~ m!.*facebook.com/(.*)!){
                   $filename = $1;
              }

       
###############################################################

     $url = "$u";

	$mech = new WWW::Mechanize;
      
      	$mech->timeout(30);
     	$mech->agent('User-Agent=Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4');
        $mech->get($url);


 	$content = $mech->content;
        
      open (OUT,">@path/$hou-$filename-$st.html");
              binmode OUT,':utf8';
              print OUT $content;
              print "$page - $filename\n";

             $page++;
            
      close OUT;
}
##########################################################################
exit;
