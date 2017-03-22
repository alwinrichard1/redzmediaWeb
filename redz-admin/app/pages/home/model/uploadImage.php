<?php
/********************************************************************************************************************************
 * Project           : Redzmedia
 * Program name      : uploadImage.php
 * Author            : Alwin
 * Date created      : 22/03/2017
 * Purpose           : Upload images
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
include("../../db.php");
session_start();
$id = $_SESSION['id'];
$dbob = new Database();
$conn = $dbob->openconnection();
if(!$_POST)
{
	echo "Something Went Wrong";
}
else 
{
    $current_date = date("Y-m-d h:i:s");
    $image_category = $_POST['image_category'];
    $uploaded_by = $_SESSION['id'];

    $image_category = $_POST['image_category'];
    $image_name = $_POST['image_name'].$_FILES["file"]["name"];
	$target_dir = "../../../assets/images/gallery/";
    $target_file = $target_dir . basename($image_name);
	move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
    
    $query = "INSERT INTO images (image_name,uploaded_datetime,category_id,uploaded_by,status) VALUES ('$image_name','$current_date','$image_category','$uploaded_by','1')";
   
    $qryExecute = $dbob->executequery($conn,$query);

    if($qryExecute == TRUE)
    {
        echo 1;
    }
    else
    {
        echo 0;
    }
}
$dbob->closeconnection();
?>