<?php

$ToEmail = 'zackhsi@gmail.com'; 
$EmailSubject = $_POST["subject"]; 
$mailheader = "From: ".$_POST["inputEmail"]."\r\n"; 
$mailheader .= "Reply-To: ".$_POST["inputEmail"]."\r\n"; 
$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
$MESSAGE_BODY = $_POST["message"]; 
mail($ToEmail, $EmailSubject, $MESSAGE_BODY, $mailheader) or die ("Failure");

 ?>