<?php
/********************************************************************************************************************************
 * Project           : Redzmedia
 * Program name      : deleteImage.php
 * Author            : Alwin
 * Date created      : 22 03 2017
 * Purpose           : deleteImage 
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
    session_start();	
    include("../../db.php");
	$dbob = new Database();
	$conn = $dbob->openconnection();
	$data = json_decode(file_get_contents("php://input"));
	
    $id = $data->image_id;
    $status = '0';

    $qry = "UPDATE images SET status='$status' WHERE image_id = '$id'";

    $insertQueryExecute = $dbob->executequery($conn,$qry);
    if(insertQueryExecute){
        echo 1;
    }
    else{
        echo 0;
    }

?>