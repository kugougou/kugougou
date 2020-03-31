<?php
include "coon.php";

if (isset($_POST['xingming'])) {
    $xingming = $_POST['xingming'];
    //利用sql语句进行检测
    $result = $coon->query("select * from login where username = '$xingming'");

    //如果$result有值，存在
    if ($result->fetch_assoc()) { //存在
        echo true;  //1
    } else { //不存在
        echo false;  //空隙''
    }
}


//接收用户注册的信息
if (isset($_POST['submit'])) {
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    //执行插入的sql语句。
    $coon->query("insert login values(null,'$user','$pass')");
    //如果注册成功，跳到登录页面
    header('location:http://localhost/PHP/project/src/html/register.html');
}
