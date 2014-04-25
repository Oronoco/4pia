#!/usr/bin/perl
use cPanelUserConfig;

   # use Unicode::Escape;
#####################################################################
# Changed: Date from 14 to 2014 &&& changed it back
# Changed: Followers format from xxFollowers to Followers<strong>xx
######################################################################


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

  $yr = $year;
 # $year =~ s/20//g; 

  $nl = $mday." ".$m." ".$year;

  $nd = $mmon."-".$mday."-".$yr;

##############################################################################
my %hash;

##############################################################################
@files =</home/pia/PerlScripts/RawData/Twitter/*.html>;

foreach $file(@files) {

   open(IN, "<$file") || die "no file\n";


     ($a,$b,$c,$d) = split(/$nd/,$file);
     $b =~ s/\.html//g;
     $b =~ s/\///g;
	@new = split(//,$b);
        

      for ($a=1; $a<5; $a++) {
         $b =~ s/$a//g;
       }


      $b = $file;
      $b =~ s/\/home\/pia\/PerlScripts\/RawData\/Twitter\///g;
      $b =~ s/\.html//g;
     
         
   open(OUT, '>>/home/pia/PerlScripts/DBLoad/Tweet.txt');
    #   print "DOING: $b\n";

##############################################################################

  ##############################################################################

  while (<IN>){

   $line = $_;
    chomp $line;

           $page = $_;

    # print OUT "DOING SOMETHING\n";

   next if ($line =~ /class=\"typeahead-item typeahead-account-item js-selectable/);

         if ($line =~ m!.*data-user-id=(.*)\".*!){
                   $id = $1;

                   $id =~ s/"//g;
               #    $id =~ s/\\//g;
               #    $id =~ s/>n    <img class=//g;
                      $hash{$b}{$id} = $id;
         }


          if ($line =~ m!(.*)" class="tweet-timestamp.*!){

                         $twid = $1;
                           $twid =~ s/<a href=//g;
                           $twid =~ s/status//g;
                           $twid =~ s/"//g;
                       
                    if ($twid =~ m!//(.*)!){
                        $tid = $1;     
                        $hash{$b}{$tid} = $tid;
                    }
          }


         if ($line =~ m!.*tweet-timestamp js-permalink js-nav js-tooltip(.*).*!){

#          if ($line =~ m!.*js-permalink js-nav(.*)_timestamp js-short-timestamp.*!){

                         $tim = $1;

                         $tim =~ s/" title="//g;
                         $tim =~ s/" ><span class="//g;

                         ($t,$d) = split(/ - /,$tim);
                                                            
                          $hash{$b}{$tim} = $t."|".$d;

                   }        

         if ($line =~ m!.*js-tweet-text tweet-text"\>(.*)<\/p>.*!){
                         $tw = $1;
                         $tw =~ s/&#39;/\'/g;
                         $tw =~ s/\'/\\'/g;
                         $tw =~ s/\,/\\,/g;
                        # $tw =~ s/’/\\'/g;

                         $tw =~ s/<[^>]*>//gs;  
                         $tw =~ s/<(\/|!)?[-.a-zA-Z0-9]*.*?>//g;    
                         $tw =~ s/echo/\echo/g;
                      #   $tw =~ s/\#/\\#/g;
                       
                       $hash{$b}{$tw} = $tw;
                       $hash{$b}{$tw} =~ s|<.+?>||g;
                       $hash{$b}{$tw} =~ s/&\#10;/ /g;

             }


          if ($line =~ m!.* <strong title=(.*) class="js-mini-profile-stat.*!){
                         $fol = $1;
                          $fol =~ s/\"//g;
                     $hash{$b}{$foll} = $fol;
          } 
         # if ($line =~ m!.*Followers<strong title=(.*)>(.*)</strong>.*!) {
         #                $fol = $1;
         #                 $fol =~ s/\"//g;
         #                $hash{$b}{$foll} = $fol;
         #             
         # } 
          if ($line =~ m!.*follower_stats(.*)<strong title=(.*)class=.*!){
                      $fol = $2;
                      $fol =~ s/\"//g;
                         $hash{$b}{$foll} = $fol;
          } 

       if ($line =~ m!.*strong title=(.*)class=\"js-mini-profile-stat.*!){
                        $fo =$1;
                        $fo =~ s/\"//g;
                        
                        $hash{$b}{$foll} = $fo;
       }

	  if ($line =~ m!<title>(.*)\((.*)\) on Twitter</title>!){
           $oname = $1;
           $tw    = $2;
		$hash{$b}{$oname} = $oname;
   	 }

          if ($line =~ m!<title>(.*)\((.*)\) on Twitter</title>!){
             $oname = $1;
             $tw    = $2;
		$hash{$b}{$oname} = $oname;
          }


             if ($line =~ m!.*<div data-card-url=(.*) data-card-type="photo".*!){
                       $cardURL = $1;
                           $cardURL =~ s/\"//g;
                       $hash{$b}{$cardURL} = $cardURL;
                       #   print $cardURL."\n";
       
       }
 
       if ($line =~ m!.*data-resolved-url-large(.*).jpg:large\" href=\"(.*)\">.*!){
                       $large = $1;
                       $largeURL = $2;

                       $largeURL =~ s/">//g;
                       $large =~ s/="//g;


                       $hash{$b}{$large} = $large;
                       $hash{$b}{$largeURL} = $largeURL;
                      # print $large."\n";

       }


       if ($line =~ m!.*is-preview(.*)data-url(.*) data-resolved-url-large.*!){
                        $media = $2;

                        $media =~ s/="//g;
                        $media =~ s/"//g;

                        $hash{$b}{$media} = $media;
                       # print $media."\n";
      }


       if ($line =~ m!.*data-img-src=(.*)!){
                      $embedImage = $1;
                          $embedImage =~ s/\"//g;

                       $hash{$b}{$emImage} = $embedImage;
                     #  print "$embedImage\n";

       }

          $t =~ s/js-tooltip//g;
          $t =~ s/-mini-pr//g;
          $t =~ s/class=js//g;

          if ((($hash{$b}{$tim} ne "") && ($hash{$b}{$tw} ne $old) && ($hash{$b}{$tw} ne ""))) {
  
           my ($abc,$ss) = split(/:/,$t);
             my ($s1,$s2) = split(/\s/,$ss);

                  $abc += 12 if ($t =~/PM/ && $t != 12); $t =~ s/ AM//g;
                  $abc -= 12 if ($t =~/AM/ && $t == 12);$t =~ s/ PM//g;
                   $abc = sprintf ("%02d",$abc);
                   
                    $newT = $abc.$s1;    

  
              my ($t,$d) = split(/\|/,$hash{$b}{$tim});
                   chomp $t,$d;
		     $d =~ s/\s/-/g;
                     ($d1,$ds) = split(/_timestamp-js-short-timestamp-js-relative-timestamp/,$d);

              # $hash{$b}{$foll} =~ s/https:\/\/pbs.twi/---/g;



            print OUT "INSERT IGNORE INTO `Tweets`(`oname`,`Name`, `Tweet`, `ID`, `TDate`, `TTime`,`Foll`,`Gtime`,`TweetID`,`CardURL`,`DataURL`,`LargeURL`,`Media`,`EmbedImage`,`Page`) VALUES ('$hash{$b}{$oname}','$b','$hash{$b}{$tw}','$hash{$b}{$id}','$d1','$t','$hash{$b}{$foll}','$newT','$hash{$b}{$tid}','$hash{$b}{$cardURL}','$hash{$b}{$large}','$hash{$b}{$largeURL}','$hash{$b}{$media}','$hash{$b}{$emImage}','$page');\n";

             $old = $hash{$b}{$tw};

   
          }	

     
  }#end while

} #end foreach

close OUT;
close IN;

################################# REMOVE DUPLICATE LINES FROM FILE ############
 my $file = '/home/pia/PerlScripts/DBLoad/Tweet.txt';
    my %seen = ();
    {
    local @ARGV = ($file);
    local $^I = '.bac';
 
   while(<>){
    $seen{$_}++;
    next if $seen{$_} > 1;
    print;
     }
    }
#####################################################################

 print "TWITTER PARSED: $hour:$min \n";
exit;


