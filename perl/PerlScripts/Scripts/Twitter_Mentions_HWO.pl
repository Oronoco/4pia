#!/usr/bin/perl
use cPanelUserConfig;
 

	use LWP::Simple;
        use LWP::UserAgent;
        use HTTP::Request;
        use HTTP::Response;
	use Crypt::SSLeay;
 	use WWW::Mechanize;
	use HTTP::Cookies;


        my $cookie = HTTP::Cookies->new(file => 'cookie',autosave => 1,);

################################################################################
my $page = 0;
my $url = "";
my @path = "/home/pia/PerlScripts/RawData/Twitter/Mentions"; 


open(IN, "/home/pia/PerlScripts/SourceData/House_Twitter.txt") || die 'No FILE CAPTAIN\n';

while (<IN>) {

   $n_url = $_;
     chomp $n_url;

     my ($a,$b,) = split(/\@/,$n_url);

     #   $a =~ s/\s/%29%20/g;

     $url = "https://twitter.com/search?q=$a&src=typd&f=realtime";

	$mech = new WWW::Mechanize;
      
      	$mech->timeout(30);
     	$mech->agent('User-Agent=Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4');
       $mech->get($url);


	$content = $mech->content;

       
       open (OUT,">@path/$b-Mention.html");
          binmode(OUT, ":utf8");
          print OUT $content;
              print "$b --> $page\n";
              $page++;
       close OUT;

}
close IN;