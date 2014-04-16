<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>

  <title>News</title>

  <?php include "DBconnect.php"; ?>

  <script>
  !function(d,s,id){
   var js,fjs=d.getElementsByTagName(s)[0],
   p=/^http:/.test(d.location)?'http':'https';
   if(!d.getElementById(id)){
    js=d.createElement(s);
    js.id=id;js.src=p+'://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
  }}(document, 'script', 'twitter-wjs');
  </script>

  <style type="text/css">
  BODY 		{ background-color: #FFF; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; overflow:hidden; }

  /* FONT COLORS */
  TABLE		{ background-color: #FFF; COLOR: #000000; FONT: 11px arial, sans-serif; font-weight: normal }
  .title		{ COLOR: #0033FF; FONT: 12px arial, sans-serif; font-weight: bold; }

  #NewsDiv	{ position: absolute; left: 0; top: 0; width: 100% }
  /* PAGE LINK COLORS */
  a:link		{ color: #0033FF; text-decoration: underline; }
  a:visited	{ color: #6633FF; text-decoration: underline; }
  a:active	{ color: #0033FF; text-decoration: underline; }
  a:hover		{ color: #6699FF; text-decoration: none; }
  /* IMAGES */
  
  img{
    opacity: 0.4;
    filter:alpha(opacity=40); /* For IE8 and earlier */
  }
  img:hover{
    opacity: 1.0;
    filter:alpha(opacity=100); /* For IE8 and earlier */
  }
  </style>

  <?php flush(); ?>

</head>

<body bgcolor="#FFF" onmouseover="scrollspeed=0" onmouseout="scrollspeed=current" onload="NewsScrollStart();">

	<div id="NewsDiv">
   <table cellpadding="5" cellspacing="0" border="0" width="100%" style="background-color: #FFF;">
    <tr>
      <td>

        <!-- SCROLLER CONTENT STARTS HERE -->

        <?php

        $day = date('D');
        $date = date('d');

        if($day == Sat){
            //Code for Sat

		//execute an SQL statement and return a recordset
          $query  = "SELECT t1.oname,t1.Tweet,t1.TTime,t2.Likes,t1.Name,t1.CardURL,t1.DataURL,t1.LargeURL FROM Congress.Tweets2 t1, Congress.FB t2 WHERE t1.Party = 'D' AND t1.Code = t2.Code order by t1.GTime DESC";
          $result = mysql_query($query)or die(mysql_error());
          while($row = mysql_fetch_assoc($result)) {
           $Name      = $row['oname'];
           $Tweet     = $row['Tweet'];
           $Tim       = $row['TTime'];
           $Lik       = $row['Likes'];
           $tid       = $row['Name'];
           $coh       = "$".number_format($Fol);
			$cardURL = $row['CardURL'];
			$dataURL = $row['DataURL'];
			$largeURL = $row['LargeURL'];

           echo "<span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
<table cellpadding='5' cellspacing='0' border='0' width='100%' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; '>
	<tr>
	    <td>
		<table id='contents' border='0' cellpadding='3' cellspacing='2' width='95%' height='68' align='left' bordercolor='#C40000' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; border-collapse: collapse; '>
			<tr>
				<td width='35%' valign='bottom'>
				<span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				$Name&nbsp;&nbsp;&nbsp;$Tim</span></td>
				<td valign='bottom' width='8%'>
				<img src='http://www.4pia.com/images/retweet.png'  width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '></td>
				<td valign='bottom' width='8%'>
				<span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>

				<img src='http://www.4pia.com/images/yes-check.png' width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '></span></td>
				<td valign='bottom' width='8%'>

                <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
				<img src='http://www.4pia.com/beta/images/veto.jpg' width='20' height='16' alt='I oppose this tweet' title='Please sign in to vote' style='opacity: 0.4; '></span></td>
				<td valign='bottom' width='19%'>

                <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
				<span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				<font face='Arial' style='text-align: right; font-size: x-small; color: green; '>
				$Lik Facebook Likes</font></span></span></td>
				<td id=meta style='display:none'> 
					<div id='cardURL'>$cardURL</div>
					<div id='dataURL'>$dataURL</div>
					<div id='largeURL'>$largeURL</div>
				</td>
				</tr>
			<tr>
				<td colspan='5' valign='top'><align=left>$Tweet</align=left></td>
			</tr>
		</table>
	     </td>
	</tr>
</table>
</span>";
         echo "<a href='' target='_top'></a>";
 
         }
       }



        if($day == Fri){
            //Code for Fri

		//execute an SQL statement and return a recordset
          $query  = "SELECT t1.oname,t1.Tweet,t1.TTime,t2.Debt,t1.Name,t1.CardURL,t1.DataURL,t1.LargeURL FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE t1.Party = 'D' AND t1.Code = t2.Code order by t1.GTime DESC";
          $result = mysql_query($query)or die(mysql_error());
          while($row = mysql_fetch_assoc($result)) {
           $Name      = $row['oname'];
           $Tweet     = $row['Tweet'];
           $Tim       = $row['TTime'];
           $Fol       = $row['Debt'];
           $tid       = $row['Name'];
           $coh       = "$".number_format($Fol);
			$cardURL = $row['CardURL'];
			$dataURL = $row['DataURL'];
			$largeURL = $row['LargeURL'];

           echo "<span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
<table cellpadding='5' cellspacing='0' border='0' width='100%' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; '>
	<tr>
	    <td>
		<table id='contents' border='0' cellpadding='3' cellspacing='2' width='95%' height='68' align='left' bordercolor='#C40000' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; border-collapse: collapse; '>
			<tr>
				<td width='35%' valign='bottom'>
				<span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				$Name&nbsp;&nbsp;&nbsp;$Tim</span></td>
				<td valign='bottom' width='8%'>
				<img src='http://www.4pia.com/images/retweet.png' width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '></td>
				<td valign='bottom' width='8%'>
				<span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>

				<img src='http://www.4pia.com/images/yes-check.png' width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '></span></td>
				<td valign='bottom' width='8%'>

                <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
				<img src='http://www.4pia.com/beta/images/veto.jpg' width='20' height='16' alt='I oppose this tweet' title='Please sign in to vote' style='opacity: 0.4; '></span></td>
				<td valign='bottom' width='19%'>

                <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
				<span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				<font face='Arial' style='text-align: right; font-size: x-small; color: green; '>
				$coh CampaignDebt</font></span></span></td>
				<td id=meta style='display:none'> 
					<div id='cardURL'>$cardURL</div>
					<div id='dataURL'>$dataURL</div>
					<div id='largeURL'>$largeURL</div>
				</td>
				</tr>
			<tr>
				<td colspan='5' valign='top'><align=left>$Tweet</align=left></td>
			</tr>
		</table>
	     </td>
	</tr>
</table>
</span>";
         echo "<a href='' target='_top'></a>";
 
         }
       }



       if($day == Wed){
            //Code for wed

	    //execute an SQL statement and return a recordset
        $query  = "SELECT t1.oname,t1.Tweet,t1.TTime,t2.CashOnHand,t1.Name,t1.CardURL,t1.DataURL,t1.LargeURL FROM Congress.Tweets2 t1, Congress.HouseMembers t2 WHERE t1.Party = 'D' AND t1.Code = t2.Code order by t1.GTime DESC";
        $result = mysql_query($query)or die(mysql_error());
        while($row = mysql_fetch_assoc($result)) {
         $Name      = $row['oname'];
         $Tweet     = $row['Tweet'];
         $Tim       = $row['TTime'];
         $Fol       = $row['CashOnHand'];
         $tid       = $row['Name'];
         $coh       = "$".number_format($Fol);     
			$cardURL = $row['CardURL'];
			$dataURL = $row['DataURL'];
			$largeURL = $row['LargeURL'];

                    


         echo "<span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
<table cellpadding='5' cellspacing='0' border='0' width='100%' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; '>
	<tr>
	    <td>
		<table id='contents' border='0' cellpadding='3' cellspacing='2' width='95%' height='68' align='left' bordercolor='#C40000' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; border-collapse: collapse; '>
			<tr>
			  <td width='35%' valign='bottom'>
			    <span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				$Name&nbsp;&nbsp;&nbsp;$Tim</span></td>
				<td valign='bottom' width='8%'>
				<img src='http://www.4pia.com/images/retweet.png' width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '>
                          </td>
			  <td valign='bottom' width='8%'>
			    <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>

				<img src='http://www.4pia.com/images/yes-check.png' width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '>
                            </span>
                         </td>
			 <td valign='bottom' width='8%'>

                           <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
				<img src='http://www.4pia.com/beta/images/veto.jpg' width='20' height='16' alt='I oppose this tweet' title='Please sign in to vote' style='opacity: 0.4; '></span></td>
			<td valign='bottom' width='19%'>

                          <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
			 <span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				<font face='Arial' style='text-align: right; font-size: x-small; color: green; '>
				$coh CashOnHand</font></span></span></td>
				<td id=meta style='display:none'> 
					<div id='cardURL'>$cardURL</div>
					<div id='dataURL'>$dataURL</div>
					<div id='largeURL'>$largeURL</div>
				</td>
			</tr>
			<tr>
			     <td colspan='5' valign='top'><align=left>$Tweet</align=left></td>
			</tr>
		</table>
	     </td>
	</tr>
</table>
</span>";
         echo "<a href='' target='_top'></a>";

       }
     } else {


		 //execute an SQL statement and return a recordset
      $query  = "SELECT oname,Tweet,TTime,Foll,Name,CardURL,DataURL,LargeURL FROM Congress.Tweets2 WHERE Party = 'D' order by GTime DESC";
      $result = mysql_query($query)or die(mysql_error());
      while($row = mysql_fetch_assoc($result)) {
       $Name      = $row['oname'];
       $Tweet     = $row['Tweet'];
       $Tim       = $row['TTime'];
       $Followers = $row['Foll'];
       $tid       = $row['Name'];
			$cardURL = $row['CardURL'];
			$dataURL = $row['DataURL'];
			$largeURL = $row['LargeURL'];

       echo "<span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
              <table cellpadding='5' cellspacing='0' border='0' width='100%' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; '>
	       <tr>
		<td>
		<table id='contents' border='0' cellpadding='3' cellspacing='2' width='90%' height='68' align='left' bordercolor='#C40000' style='background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font: normal normal normal 11px/normal arial, sans-serif; font-weight: normal; border-collapse: collapse; '>
			<tr>
				<td width='35%' valign='bottom'>
				<span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				$Name&nbsp;&nbsp;&nbsp;$Tim</span></td>
				<td valign='bottom' width='8%'>
				<img src='http://www.4pia.com/images/retweet.png' width='20' height='16' width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '></td>
				<td valign='bottom' width='8%'>
				<span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>

				<img src='http://www.4pia.com/images/yes-check.png' width='20' height='16' width='20' height='16' alt='I endorse this tweet' width='34' height='33' title='Please sign in to vote' style='opacity: 0.4; '></span></td>
				<td valign='bottom' width='8%'>

                <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
				<img src='http://www.4pia.com/beta/images/veto.jpg'  width='20' height='16' alt='I oppose this tweet' title='Please sign in to vote' style='opacity: 0.4; '></span></td>
				<td valign='bottom' width='19%'>

                <span class='Apple-style-span' style='border-collapse: separate; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; font-size: medium; '>
				<span class='title' style='color: rgb(0, 51, 255); font: normal normal normal 12px/normal arial, sans-serif; font-weight: bold; '>
				<font face='Arial' style='text-align: right; font-size: x-small; color: green; '>
				$Followers followers</font></span></span></td>
				<td id=meta style='display:none'> 
					<div id='cardURL'>$cardURL</div>
					<div id='dataURL'>$dataURL</div>
					<div id='largeURL'>$largeURL</div>
				</td>
				</tr>
			<tr width='70%'>
  			   <td colspan='5' valign='top'><align=left>$Tweet</align=left></td>
			</tr>
		</table>
	    </td>
	</tr>
</table>
</span>";
       echo "<a href='' target='_top'></a>";
 
     }

         } //end day loop
         ?>

         <!-- SCROLLER CONTENT ENDS HERE -->
       </td>
     </tr>
   </table>
 </div>

 <!-- YOU DO NOT NEED TO EDIT BELOW THIS LINE -->




 <script language="JavaScript" type="text/javascript">
 <!-- HIDE CODE

var scrollspeed		= "1"		// SET SCROLLER SPEED 1 = SLOWEST
var speedjump		= "40"		// ADJUST SCROLL JUMPING = RANGE 20 TO 40
var startdelay 		= "2" 		// START SCROLLING DELAY IN SECONDS
var nextdelay		= "0" 		// SECOND SCROLL DELAY IN SECONDS 0 = QUICKEST
var topspace		= "2px"		// TOP SPACING FIRST TIME SCROLLING
var frameheight		= "204px"	// IF YOU RESIZE THE WINDOW EDIT THIS HEIGHT TO MATCH



current = (scrollspeed)


function HeightData(){
  AreaHeight=dataobj.offsetHeight
  if (AreaHeight==0){
    setTimeout("HeightData()",( startdelay * 1000 ))
  }
  else {
    ScrollNewsDiv()
  }}

  function NewsScrollStart(){
    dataobj=document.all? document.all.NewsDiv : document.getElementById("NewsDiv")
    dataobj.style.top=topspace
    setTimeout("HeightData()",( startdelay * 1000 ))
  }

  function ScrollNewsDiv(){
    dataobj.style.top=parseInt(dataobj.style.top)-(scrollspeed)
    if (parseInt(dataobj.style.top)<AreaHeight*(-1)) {
      dataobj.style.top=frameheight
      setTimeout("ScrollNewsDiv()",( nextdelay * 1000 ))
    }
    else {
      setTimeout("ScrollNewsDiv()",speedjump)
    }}

// END HIDE CODE -->
</script>


</body>
</html>
