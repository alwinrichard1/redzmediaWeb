<?php
/********************************************************************************************************************************
 * Project           : Famzapp
 * Program name      : checkSession.php
 * Author            : Alwin
 * Date created      : 27/02/2017
 * Purpose           : checking session
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
session_start();

if($_SESSION['id']!="")
{
    echo "1";
 }
else {
    echo "0";
}

?>
