<?php
/********************************************************************************************************************************
 * Project           : redzmedia
 * Program name      : fetchImages.php
 * Author            : Alwin
 * Date created      : 23/02/2017
 * Purpose           : Fetch Images
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
include("db.php");
session_start();
$dbob = new Database();
$conn = $dbob->openconnection();


$qry = "SELECT i.image_id, 
 i.image_name,
 i.status,
 i.uploaded_datetime,
 c.category,
 c.category_id
FROM
images i
left join
categories c
ON i.category_id = c.category_id WHERE i.status = 1";


$qryExecute = $dbob->executequery($conn,$qry);

$data = array();

while($result=mysqli_fetch_array($qryExecute))
{
    $data[]=array(
			"image_id"=>$result['image_id'],
			"image_name"=>$result['image_name'],
			"image_link" => "redz-admin/app/assets/images/gallery/".$result['image_name'],
			"status"=>$result['status'],
			"uploaded_datetime"=>$result['uploaded_datetime'],
			"category"=>$result['category'],
			"category_id"=>$result['category_id']
	);
}

echo json_encode($data);
$dbob->closeconnection();

?>