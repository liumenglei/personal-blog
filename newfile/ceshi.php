<?php 
	$urls = 'a上单aa   b点睡bb';
if(preg_match_all("/[a-zA-Z]| /", $urls ,$match)) {
  // $match2 = implode('',$match[0]);
  // echo $match2;
  print_r($match);
 } else { 
  echo "不匹配."; 
 } 
?>