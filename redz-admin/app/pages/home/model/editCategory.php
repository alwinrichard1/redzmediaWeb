<?php
/********************************************************************************************************************************
 * Project           : Redzmedia
 * Program name      : editCategory.php
 * Author            : Alwin
 * Date created      : 21 03 2017
 * Purpose           : editCategory 
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
    session_start();	
    include("../../db.php");
	$dbob = new Database();
	$conn = $dbob->openconnection();
	$data = json_decode(file_get_contents("php://input"));
	
    $id = $data->id;
    $new_category = $data->new_category;
	$id = $data->id;
    $status = '1';

    $qry = "UPDATE categories SET category='$new_category' WHERE category_id = '$id'";

    $insertQueryExecute = $dbob->executequery($conn,$qry);
    if(insertQueryExecute){
        echo 1;
    }
    else{
        echo 0;
    }

?>