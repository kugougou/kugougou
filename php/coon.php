<?php
header('content-type:text/html;charset=utf-8');


define('HOST', 'localhost');
define('ROOT', 'root');
define('POSS', '');
define('DBNAME', 'peixun');


// define('HOST', 'b-bpflsif7mdx0zn.bch.rds.gz.baidubce.com:3306');
// define('ROOT', 'b_bpflsif7mdx0zn');
// define('POSS', '123456789');
// define('DBNAME', 'b_bpflsif7mdx0zn');

$coon = @new mysqli(HOST, ROOT, POSS, DBNAME);
if ($coon->connect_errno) {
    die('数据库连接错误，请检查' . $coon->connect_errno);
};
mysqli_set_charset($coon, 'utf8');