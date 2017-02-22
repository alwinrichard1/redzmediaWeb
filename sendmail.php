<?php 
/********************************************************************************************************************************
 * Project           : Redzmedia
 * Program name      : sendmail.php
 * Author            : Alwin Richard
 * Date created      : 22 Feb 2017
 * Purpose           : sending mail
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$mobile = $data->mobile;
$message = $data->message;


$to = 'redzmedia999@gmail.com'; 
$subject = 'www.redzmedia.in Query';
$message = '<html lang="en">
                    <body style="margin-top: 2%;padding-top: 2%;background-color: white;margin: 2%;padding: 2%;">
                        <h2 style="color: #CA5757;text-transform: uppercase;text-decoration: underline;font-family: initial;">RedZmedia Website Query!</h2>
                            <h3 style="border-left: 2px #927B7B solid;padding-left: 6px;font-family: serif;font-size: 17px;color: #9E2C2C;letter-spacing: 1px;">Client Name: 
                                <span style="font-weight: 400;color: black;font-size: 17px;">'.$name.'</span>
                            </h3>
                            <h3 style="border-left: 2px #927B7B solid;padding-left: 6px;font-family: serif;font-size: 17px;color: #9E2C2C;letter-spacing: 1px;">Client Email ID: 
                                <span style="font-weight: 400;color: black;font-size: 17px;">'.$email.'</span>
                            </h3>
                            <h3 style="border-left: 2px #927B7B solid;padding-left: 6px;font-family: serif;font-size: 17px;color: #9E2C2C;letter-spacing: 1px;">Client Mobile: 
                                <span style="font-weight: 400;color: black;font-size: 17px;">'.$mobile.'</span>
                            </h3>
                            <h3 style="border-left: 2px #927B7B solid;padding-left: 6px;font-family: serif;font-size: 17px;color: #9E2C2C;letter-spacing: 1px;">Message: 
                                <span style="font-weight: 400;color: black;font-size: 17px;">'.$message.'</span>
                            </h3>
                    </body>
                </html>';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';
$headers[] = 'To: RedZmedia <redzmedia999@gmail.com>';
$headers[] = 'From: '.$name.' <'.$email.'>';
mail($to, $subject, $message, implode("\r\n", $headers));

echo 1;

?>