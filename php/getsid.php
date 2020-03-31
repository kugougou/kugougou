<?php
include "coon.php";
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    $res = $coon->query("select * from  xiangqing where sid='$sid'");
    echo json_encode($res->fetch_assoc());
}