<?php
include "coon.php";

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']); //加密和加密进行比较
    $result = $coon->query("select * from login where username='$username' and password = '$password' ");
    if ($result->fetch_assoc()) {
        echo true;  //登录成功
    } else {
        echo false;  //用户名或者密码错误
    }
}

//获取的表单值给数据库
