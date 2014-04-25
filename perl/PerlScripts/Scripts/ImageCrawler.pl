#!/usr/bin/perl
use cPanelUserConfig;

use WWW::Mechanize;
use WWW::Mechanize::Image;
use LWP::UserAgent;
use LWP::Simple;


#####################################################################

  open(IN, "/home/pia/PerlScripts/SourceData/Congress_Images.txt") || die "no file captin\n";


  my $mech = WWW::Mechanize->new();


  while(<IN>){

      $line =$_;
       chomp $line;


      my($s,$st,$file,$ln,$su,$fn,$p,$r,$p,$e,$a,$b) = split(/\|/,$line);

      $nf = $file;
      $nf =~ s/File://g;

      $url = "http://en.wikipedia.org/wiki/$file";

      $mech->get($url);
      $page = $mech->content;

      if ($page =~ m!.*upload.wikimedia.org(.*).jpg">.*!){
              $link = $1;
                  my $go = "http://upload.wikimedia.org".$link.".jpg";

                  $mech->get($go);
                  $mech->save_content("/home/pia/PerlScripts/RawData/Images/$ln-$st.jpg");

              
             
      } else { print "NO image --> $ln-$st\n";}
}