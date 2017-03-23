<?php
/********************************************************************************************************************************
 * Project           : Redzmedia
 * Program name      : changeCategory.php
 * Author            : Alwin
 * Date created      : 23 03 2017
 * Purpose           : changeCategory 
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
    session_start();	
    include("../../db.php");
	$dbob = new Database();
	$conn = $dbob->openconnection();
	$data = json_decode(file_get_contents("php://input"));
	
    $id = $data->image_id;
    $category_id = $data->category_id;

    $qry = "UPDATE images SET category_id='$category_id' WHERE image_id = '$id'";


    $insertQueryExecute = $dbob->executequery($conn,$qry);
    if(insertQueryExecute){
        echo 1;
    }
    else{
        echo 0;
    }

?>