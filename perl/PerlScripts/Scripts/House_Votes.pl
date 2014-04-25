#!/usr/bin/perl
use cPanelUserConfig;

######################################################################

#http://clerk.house.gov/evs/1991/ROLL_000.asp
#http://clerk.house.gov/evs/1990/ROLL_100.asp
#http://clerk.house.gov/evs/1990/ROLL_200.asp
#...500



#http://clerk.house.gov/evs/1990/roll536.xml

######################################################################


	use LWP::Simple;
        use LWP::UserAgent;
        use HTTP::Request;
        use HTTP::Response;
        use HTML::LinkExtor; 
	use HTML::Form;
	use WWW::Mechanize;
        use HTTP::Cookies;
	use threads;
	use threads::shared;

       

################# SET VARIABLE ##################################  
my $ct = 0;

my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);

$year = $year + 1900;

 my $path = "/home/pia/PerlScripts/RawData/HouseLeg/$year";


################### GET LAST FILE CREATED ####################

opendir(my $DH, $path) or die "Error opening HOUSE_VOTES $path: $!";

my @files = map { [ stat "$path/$_", $_ ] } grep(! /^\.\.?$/, readdir($DH));

closedir($DH);

sub rev_by_date { $b->[9] <=> $a->[9] }

     my @sorted_files = sort rev_by_date @files;

	my @newest = @{$sorted_files[0]};
	my $name = pop(@newest);


       if ((-e "$path/$name") || ($name =~ /year=$year\&rollnumber=(.*)99/)){

           ($a,$b) = split(/\-/,$name);
               $b  =~ s/\.html//g;
               $ct = $b;
        } else
	     {$ct= $ct+100;}


#################### START WITH MAIN PAGE ###########################

  my $mech = WWW::Mechanize->new();

        my $url = "http://clerk.house.gov/evs/$year/ROLL_$ct.asp";

        $mech->timeout(15);
        $mech->agent('User-Agent=Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4');
    
  	 $mech->get($url);
 
 	 $mech->save_content("$path\$year-$ct.html");
    
	 printf "$year-$ct \n";
