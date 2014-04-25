#!/usr/bin/perl
use cPanelUserConfig;

##############################################################################

open (OUT,">>/home/pia/PerlScripts/DBload/RollCall.txt");


###########################################################################

	use HTML::TokeParser::Simple;    # Why? because
	use Parallel::ForkManager;
	use threads;
	use threads::shared;


    $|=1;                        # un buffer


my %hash;

my $path = "/home/pia/PerlScripts/HouseRollCall/";

##############################################################################
@files =<$path/*.txt>;


foreach $file(@files) {

   open(IN, "<$file") || die "no file\n";

            $file =~ s/\.txt//g;
            $file =~ s/$path\///g;
            


   while (<IN>) {

       $line = $_;
         chomp $line;


          if ($line =~ m!.*amendment-author\>(.*)\<\/amendment-author.*!){

              $author = $1;
              $hash{$file}{$author} = $author;
          }

          if ($line =~ m!.*legis-num>(.*)\<\/legis-num.*!){
                 
                 $leg = $1;
                  $hash{$file}{$leg} = $leg;
                 
          }


          if ($line =~ m!.*vote-desc>(.*)\<\/vote-desc.*!){
                  $desc = $1;
                  $hash{$file}{$desc} = $desc;
          }


          if ($line =~ m!.*vote-result\>(.*)\<\/vote-result.*!){

                $result = $1;

                $hash{$file}{$result} = $result;
		
          }

          if ($line =~ m!.*action-date\>(.*)\<\/action-date.*!){

                $adate = $1;
                $hash{$file}{$adate} = $adate;
		
          } 

          if ($line =~ m!.*action-time time-etz=\"(.*)\"\>(.*)\</action-time.*!){

                $atime = $1;
                $hash{$file}{$atime} = $atime;   
         }

            if ($line =~ m!.*recorded-vote\>\<legislator party=\"(.*)\" state=\"(.*)\" role=\"(.*)\"\>(.*)\<\/legislator\>\<vote\>(.*)\<\/vote.*!){

                  $party = $1;
                  $st    = $2;
                  $name  = $4;
                  $vote  = $5;   
                   $hash{$file}{$party} = $party;
                   $hash{$file}{$st}    =  $st;
                   $hash{$file}{$name}  = $name;
                   $hash{$file}{$vote}  = $vote;
  
   
#	      print OUT"$file|$hash{$file}{$leg}|$hash{$file}{$desc}|$hash{$file}{$author}|$hash{$file}{$result}|$hash{$file}{$atime}|$hash{$file}{$adate}|$hash{$file}{$party}|$hash{$file}{$st}|$hash{$file}{$name}|$hash{$file}{$vote}\n";
           }

          #    print $file."\n";

              print OUT "INSERT INTO `RollCall`(`Code`, `ResNum`, `Desc`, `Author`, `Result`, `VoteTime`, `VoteDate`, `Party`, `St`, `Name`, `Vote`) VALUES ('$file','$hash{$file}{$leg}','$hash{$file}{$desc}','$hash{$file}{$author}','$hash{$file}{$result}','$hash{$file}{$atime}','$hash{$file}{$adate}','$hash{$file}{$party}','$hash{$file}{$st}','$hash{$file}{$name}','$hash{$file}{$vote}');\n";        
           
     }#end while

    
}    #end for

