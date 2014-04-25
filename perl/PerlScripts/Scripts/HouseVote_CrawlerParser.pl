#!/usr/bin/perl
use cPanelUserConfig;

    use HTML::TokeParser::Simple;
    use Data::Dumper;
    use WWW::Mechanize;
    use open ':std', ':encoding(UTF-8)';

##################################################################
#
#  THIS PROGRAM CRAWLES HOUSE.GOV FOR ALL VOTES ON THE HILL
#  TO REMOVE DUPLICATE CRAWLING, IT STORES THE LAST ROLL # IN 
#  first.txt IN CASE WE FORGET TO CRAWL FOR A DAY.
#
#  AUTHOR: R.YADAV-RANJAN
#  Date  : Mar. 5, 2014
#
##################################################################

  my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);
 
  $year = $year + 1900;

#######################################################


my $agent = WWW::Mechanize->new();

open(IN,"First.txt");
  while (<IN>) {
    $first = $_;
     chomp $first;
  

for ($i=$first; $i<10000; $i++) {

   my $newi = sprintf("%03d",$i);

     $agent->get("http://clerk.house.gov/evs/$year/roll$newi.xml");
     $content = $agent->content();

         if ($content =~ /The page you requested cannot be found/) {
 
           open(OUT1,">First.txt"); 
              print OUT1 $newi;
              print "Done -- $newi\n";
           close OUT1;
           die;
         } 

   open (OUT,">>/home/pia/PerlScripts/DBLoad/RollData.xml"); print OUT $content; close OUT;

########################### Parser & BUILD DB FILE ##############################


  if ($content =~ m!<congress>(.*)</congress>!){
          $cong = $1;
    if ($content =~ m!<session>(.*)</session>!){
          $sess = $1;
      if ($content =~ m!<action-date>(.*)</action-date>!){
           $date = $1;
        if ($content =~ m!<action-time time-etz="(.*)">(.*)</action-time>!){
              $time = $2;
          if ($content =~ m!<vote-desc>(.*)</vote-desc>!){
               $desc = $1;
            if ($content =~ m!<vote-question>(.*)</vote-question>!){
                $ques = $1;
              if ($content =~ m!<legis-num>(.*)</legis-num>!){
                   $leg = $1;
              }
            }
          }
        }
      }
    }  
  }

  open(OUT, ">>/home/pia/PerlScripts/DBLoad/RollCallLoad.txt");

   $file = "RollData.xml";   
   
   $p = HTML::TokeParser->new(shift||"$file");

    while (my $token = $p->get_tag("recorded-vote")) {

      my $text = $p->get_trimmed_text("/recorded-vote");

      next unless $text =~ /\S/;      

      $text =~ s/ Present/\','Present/g;
      $text =~ s/ Yea/\','Yea/g;
      $text =~ s/ Nae/\','Nae/g;
      $text =~ s/ Nay/\','Nay/g;
      $text =~ s/ Aye/\','Aye/g;
      $text =~ s/ No/\','No/g;
      $text =~ s/CÃ¡rdenas/Cárdenas/g;
      $text =~ s/LujÃ¡n/Luján/g;
      $text =~ s/SÃ¡nchez/Sánchez/g;
      $text =~ s/VelÃ¡zquez/Velázquez/g;

      $text =~ s/O\'R/O\\'Rourke/g;
            print OUT "INSERT INTO RollCall (Congress,Sess,VDate,Vtime,LegNum,LegDesc,LegQues,Lname,Vote,Roll) VALUES ('$cong','$sess','$date','$time','$leg','$desc','$ques','$text','$newi');\n";
    }
  
      close OUT;
###################################################################

 } #end of for loop
} #end of while loop      
