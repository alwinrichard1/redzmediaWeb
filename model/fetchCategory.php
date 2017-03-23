<?php
/********************************************************************************************************************************
 * Project           : redzmedia
 * Program name      : fetchCategory.php
 * Author            : Alwin
 * Date created      : 21/03/2017
 * Purpose           : fetchCategory
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
include("db.php");
session_start();
$dbob = new Database();
$conn = $dbob->openconnection();


$qry = "SELECT c.category_id, 
 c.category,
 c.added_date,
 u.name
FROM
categories c
left join
users u
ON c.added_by = u.user_id  WHERE c.status = 1";


$qryExecute = $dbob->executequery($conn,$qry);

$data = array();

while($result=mysqli_fetch_array($qryExecute))
{
    $data[]=array(
			"category_id"=>$result['category_id'],
			"category"=>$result['category'],
			"added_date"=>$result['added_date'],
			"added_by"=>$result['name'],
			"category"=>$result['category']
	);
}

echo json_encode($data);
$dbob->closeconnection();

?>