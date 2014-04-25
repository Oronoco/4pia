#!/usr/bin/perl
use cPanelUserConfig;

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
   my ($URL,$contents,$z,$max) = "";

 
###############################################################


#http://clerk.house.gov/cgi-bin/vote.asp?year=1990&rollnumber=99
#http://clerk.house.gov/evs/2011/roll599.xml   


my $path = "/home/pia/PerlScripts/DBload";
my $opath = "/home/pia/PerlScripts/HouseRollCall";
  
#################### START WITH MAIN PAGE #############################################################
    
   my $semStdout :shared;
   my $running :shared = 0;
   my $j = 1;   

  #open(IN, "/home/pia/PerlScripts/SourceData/House_Twitter.txt");

  open(IN, "$path/HouseBills.txt");

  while (<IN>) {

   $n_url = $_;
     chomp $n_url;

       my ($a,$b,$c) = split(/\|/,$n_url);

         next if(-e ($a."-".$c.".txt"));

###############################################################     

     Win32::Sleep(100) while do{ lock $running; $running >= 10 };

      async{

        { lock $running; ++$running; }


         my $url = "$b";

        my $ua = new LWP::UserAgent;

        $ua->timeout(15);
        $ua->agent('User-Agent=Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4');
    

        my $req = HTTP::Request->new('GET',$url);
        my $res = $ua->request($req);
        my $content = $res->content;
        
        {
             lock $semStdout;
               open (FILE,">$opath/$a-$c.txt"); print FILE $content;
              printf "(%3d)$opath/$a-$c \n", threads->self->tid;
        }

        { lock $running; --$running; }

     }->detach;

     close FILE;

#######################################################################
########################################################################
#     }
   } # end for loop
