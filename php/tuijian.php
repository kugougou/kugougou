<?php
include "coon.php";
$res =  $coon->query("select * from youpintuijian");
$arr = array();
for ($i = 0; $i < ($res->num_rows); $i++) {
    $arr[$i] = $res->fetch_assoc();
};
echo json_encode($arr);
