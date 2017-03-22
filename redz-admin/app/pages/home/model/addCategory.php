<?php
/********************************************************************************************************************************
 * Project           : rezmedia
 * Program name      : uploadImage.php
 * Author            : Alwin
 * Date created      : 22/03/2017
 * Purpose           : uploadImage 
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
include("../../db.php");
session_start();
$dbob = new Database();
$conn = $dbob->openconnection();

$data = json_decode(file_get_contents("php://input"));
$category = $data->category;
$date = $data->date;
$status = '1';
$added_by = $_SESSION['id'];

$query = "INSERT INTO categories (category,added_date, status,added_by) VALUES ('$category','$date','$status','$added_by')";



$qryExecute = $dbob->executequery($conn,$query);
if($qryExecute == TRUE){
    echo 1;
}
else{
    echo 0;
}

$dbob->closeconnection();

?>