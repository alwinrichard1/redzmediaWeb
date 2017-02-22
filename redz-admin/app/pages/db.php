<?php
/********************************************************************************************************************************
 * Project           : Bar Bound
 * Program name      : db.php
 * Author            : Loojence
 * Date created      : 19/09/2015
 * Purpose           : Database Class
 * Revision History  :
 * Date        Author      Ref    Revision (Date in YYYYMMDD format)
 /******************************************************************************************************************************/
class Database //create a class for database
{
    var $conn;
    var $mdb;
    var $output;   
    var $servername = "localhost";
    var $username = "root";
    var $password = "zamtech";
    
    var $dbname="redzmedia";
    function __construct()
    {
        
    }

// function for opening a connection with the database
    public function openconnection() 
    {
        $conn = mysqli_connect($this->servername, $this->username, $this->password,$this->dbname);
        if (!$conn) // testing the connection
        {
            $dberror = array(
                "Error" => "Connection Failed"
            );
            echo json_encode($dberror);
            die();
        } 
        else 
        {
            $this->myconn = $conn;
        }
        return $this->myconn;
    }
    
//function for excecuting the query   
    public function executequery($conn, $query) 
    {
        $output = mysqli_query($conn, $query);
        return $output;
    }
    
//function for updating a query
    public function updatequery($conn, $query)
    {
        $result = mysqli_query($conn, $query);
        $output = mysqli_affected_rows($conn);
        return $output;
    }
    
//function used to close the database.   
    public function closeconnection() 
    {
        if (isset($this->connection)) {
            mysqli_close($this->connection);
            unset($this->connection);
        }
    }
}
?>