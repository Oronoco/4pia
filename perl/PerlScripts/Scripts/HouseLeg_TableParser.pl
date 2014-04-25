#!/usr/bin/perl
use cPanelUserConfig;

   
##############################################


################# SET VARIABLE ##################################  
my $ct = 0;

my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);

$year = $year + 1900;


 my $path = "/home/pia/PerlScripts/HouseLeg/$year";


################### GET LAST FILE CREATED ####################

opendir(my $DH, $path) or die "Error opening $path: $!";

my @files = map { [ stat "$path/$_", $_ ] } grep(! /^\.\.?$/, readdir($DH));

closedir($DH);

sub rev_by_date { $b->[9] <=> $a->[9] }

     my @sorted_files = sort rev_by_date @files;

	my @newest = @{$sorted_files[0]};
	my $name = pop(@newest);


######################################################

@files = <$path/$name>;

    open(OUT,">>/home/pia/PerlScripts/DBLoad/HouseBills.txt") || die "HELLO";

######################################################

foreach $file(@files) {

  print "DOING --> $file\n";

   open (IN,"$file") || die ("hello -- no files here!!!\n");   

      $file =~ s/\/home\/pia\/PerlScripts\/HouseLeg\/$year\///g;
      $file =~ s/\.html//g;
      ($a,$b) = split(/-/,$file);

  while (<IN>) {

     $line = $_;
     chomp $line;

      if ($line =~ m!.*<TR><TD><A HREF="(.*)">(.*)<\/A><\/TD>.*!) {

               $url = $1;

               $bill = $2;

               print OUT "INSERT INTO `HouseBills`(`Year`, `URL`, `RollNum`, `LastUpdate`) VALUES ('$a','$url','$bill');\n";
             #  print OUT "$a|$url|$bill\n";
      }
    }

 }
exit;
