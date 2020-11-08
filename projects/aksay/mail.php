<?php 


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['tel'];
$email = $_POST['email'];






//$mail->SMTPDebug = 3;                             


$mail->isSMTP();                                    
$mail->Host = 'smtp.gmail.com';  					
$mail->SMTPAuth = true;                             
$mail->Username = 'gmbloggersSMTP@gmail.com'; 
$mail->Password = '2020GM20bloggers'; 
$mail->SMTPSecure = 'ssl';                
$mail->Port = 465;


$mail->setFrom('gmbloggersSMTP@gmail.com');
$mail->addAddress('exzolink@gmail.com');
$mail->isHTML(true);  




$mail->Subject = 'Заявка Aksay-su';

$mail->Body    = 'Имя: ' .$name. 
'<br>Телефон ' .$phone. 
'<br>Email: ' .$email.


$mail->AltBody = '';

?>
