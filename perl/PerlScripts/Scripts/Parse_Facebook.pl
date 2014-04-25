#!/usr/bin/perl
    
   use cPanelUserConfig;
   use Unicode::Escape;

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

  $nd = $yr."-".$mmon."-".$mday;

##############################################################################
my $path = "/home/pia/PerlScripts/DBLoad";

my %hash;
$page =1;

##############################################################################
@files =</home/pia/PerlScripts/RawData/Facebook/*>;

foreach $file(@files) {

   open(IN, "<$file") || die "no file\n";      

      $na = $file;
     ($ho,$na,$co) = split(/-/,$na);

      $na =~ s/C:\/Perl\/RawData\/Elected\/Facebook\///g;
      $na =~ s/\.html//g;
      $co =~ s/\.html//g;
      $ho =~ s/C:\/Perl\/RawData\/Elected\/Facebook\///g;
    
         
      open(OUT, ">>$path/FBdata.txt");
     # print "DOING $page: $na\n";

##############################################################################
##############################################################################

while (<IN>){

   $line = $_;
    chomp $line;
       $page = <IN>;

         $page =~ s/\"/\\"/g;
         $page =~ s/\'/\\'/g;
         $page =~ s/\//\\/g;

         if ($line =~ m!.*content="(.*) likes (.*)\..*!){
                   $name = $1;
                   $cityState = $2;

                   $name =~ s/\s/|/g;
                   @nameline =split(/\|/,$name);
                   $namelin = pop(@nameline);

                   $hash{$na}{$name} = $name;
                   $hash{$na}{$city} = $cityState;
                   $hash{$na}{$like} = $namelin;


                   ($nam,$state,$city) = split(/\|/,$name);                       


         }

          if ($line =~ m!.*<meta property="og:image" content="(.*)" /><meta property.*!){
                   $imageURL = $1;
                   $hash{$na}{$imageURL} = $imageURL;
             
          }

    
          
     
  }#end while

     
     if ($hash{$na}{$imageURL} == "https://www.facebook.com/images/fb_icon_325x325.png"){
             $$hash{$na}{$imageURL} = "NONE";
     }

     
    
     print OUT "INSERT INTO Congress.`FB` (`Likes`,`Name`,`FBImageURL`,`Code`, `Page`) VALUES ('$hash{$na}{$like}','$na','$hash{$na}{$imageURL}','$co','$page');\n";
 
     print OUT "update `FB` set Code = (SELECT Code from Congress.`HouseMembers` WHERE Code like '%$co' and House = '$ho' and FBurl like '$na') WHERE Code = '$co' and Name = '$na';\n";
    
     
     $page++;

} #end foreach

print OUT     "Update FB set Code = '419ND00' WHERE Name = 'CongressmanKevinCramer';";
print OUT     "update FB set Code = '426DE00' WHERE Name = 'JohnCarneyDE';";
print OUT     "Update FB set Code = '427VT00' WHERE Name = 'PeterWelch';";
print OUT     "UPDATE FB set Code = '450AK00' WHERE Name = 'RepDonYoung';";
print OUT     "UPDATE FB set Code = '446VI10' WHERE Name = 'RepFrankWolf';";
print OUT     "UPDATE FB set Code = '447VI01' WHERE Name = 'RepRobWittman';";
print OUT     "Update FB set Code = '422MT00' WHERE Name = 'SteveDainesMT';";
print OUT     "Update FB set Code = '49MS'    WHERE Name = 'thadforms';";
print OUT     "Update FB set Code = '51MS'    WHERE Name = 'wicker';";
print OUT     "Update FB set Code = '30NJ'    WHERE Name = 'corybooker';";
print OUT     "Update FB set Code = '28KY'    WHERE Name = 'McConnellForSenate';";
print OUT     "Update FB set Code = '5DE'     WHERE Name = 'senatorchriscoons';";
print OUT     "Update FB set Code = '69VA'    WHERE Name = 'SenatorKaine';";
print OUT     "Update FB set Code = '75MT'    WHERE Name = 'senatortester';";


close OUT;
close IN;

close OUT;
close IN;

#####################################################################


#####################################################################
#
#    LOAD INTO DATABASE
#
#####################################################################
	use DBI;
	use DBD::mysql;


        open(IN,"$path/FBdata.txt") || die;

####################################################################

# PERL MYSQL CONNECT()
$dbh = DBI->connect('DBI:mysql:Congress:localhost:3306','Dev','ASVC)E{&MrId');


while ($line = <IN>) {

        $dbh->do("$line") || die;   

          print "Loading FB $nd: $ct\n";
           $ct++;
    
} # end while
##########################################################################
$dbh->disconnect();

exit;

##########################################################################
system("rm -rf /home/pia/PerlScripts/DBLoad/FBdata.txt");