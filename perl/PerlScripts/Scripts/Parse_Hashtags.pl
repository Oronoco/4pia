#!/usr/bin/perl
use cPanelUserConfig;
 
#use Unicode::Escape;



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
  $year =~ s/20//g; 

  $nl = $mday." ".$m." ".$year;

  $nd = $mmon."-".$mday."-".$yr;

##############################################################################

my $path = "/home/pia/PerlScripts/RawData/Twitter/Hash";

my %hash;

##############################################################################

$file = "/home/pia/PerlScripts/DBload/TMP_Hash.txt";

system ("grep '$mday $m $year' /home/pia/PerlScripts/Twitter/Hash/* > $file");

   open(IN, "<$file") || die "no file\n";    
         
   open(OUT, ">>/home/pia/PerlScripts/DBload/Hash.txt");
       print "DOING: $file\n";

##############################################################################
while (<IN>) {

 $line = $_;
  chomp $line;
   
   
   next if ($line =~ /class=\"typeahead-item typeahead-account-item js-selectable/);


         if ($line =~ m!.*Twitter\/Hash\/(.*)-Hash\.html.*!){
                   $name = $1;
          }

         if ($line =~ m!.*<a href="/(.*)/status/(.*)" class="tweet-timestamp js-permalink js-nav js-tooltip" title="(.*)" ><span class="_timestamp js-short-timestamp js-relative-timestamp" data-time.*!) {


                    $tuser = $1;
                    $tid   = $2;
                    $datim = $3;
                      $temp = $datim;
                      $datim =~ s/ - /|/g;
                      $datim =~ s/ /-/g;
                      $datim =~ s/-AM/ AM/g;
                      $datim =~ s/-PM/ PM/g;



                     my($dd2,$dd4,$dd5,$dd6,$dd7,$dd8,$dd9) = split(/\s/,$temp);


                      if ($datim =~ /AM/){
                         my($f1,$f2,$f3) = split(/:/, $datim);
                             my($f12,$f13,$f14) = split(/|/,$f2);
                          
                           $f1 = sprintf ("%02d",$f1);
                           $f2 =~ s/ AM//g;

                           $ntime = $f1.$f12.$f13;
                      }

                      if ($datim =~ /PM/ && $datim != 12) {

                           my($f1,$f2,$f3) = split(/:/, $datim);
                              my($f12,$f13,$f14) = split(/|/,$f2);

                           $f1 = $f1+12;
                           $f1 = sprintf ("%02d",$f1);
                           $f2 =~ s/ PM//g;

                           $ntime = $f1.$f12.$f13;
                        }


                      print OUT "INSERT INTO `Hash` (TID,FromHash,HashID,HashTime,HashDate) VALUES ('$name','$tuser','$tid','$ntime','$dd6-$dd7-$dd8');\n"; 
          }

     
  }#end while

#} #end foreach

close OUT;
close IN;

################################# REMOVE DUPLICATE LINES FROM FILE ############
                
 my $file = 'C:/Perl/RawData/Elected/DBload/LoadHash.txt';
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
exit;
