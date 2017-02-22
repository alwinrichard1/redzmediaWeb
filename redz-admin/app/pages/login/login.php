<?php
/********************************************************************************************************************************
 * Project           : redzmedia
 * Program name      : login.php
 * Author            : Alwin
 * Date created      : 22/02/2017
 * Purpose           : login
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
include("../db.php");
session_start();
$dbob = new Database();
$conn = $dbob->openconnection();
$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = md5($data->password);



$qry = "SELECT user_id,name FROM users WHERE user_name='$username' AND password='$password'";


$result = $dbob->executequery($conn,$qry);
$detail= mysqli_fetch_array($result);

if($detail==null)
{
	$data = 0;
}
else{
    $data=array(
			"id"=>$detail['user_id'],
			"name"=>$detail['name']
	);
    $_SESSION['id']=$detail['user_id'];
}
echo json_encode($data);
$dbob->closeconnection();
?>


	
