<?php
/**
 * User: fu
 * Date: 13-12-27
 * Time: 下午4:00
 */
date_default_timezone_set('Asia/Shanghai');
ini_set('display_errors', true);
error_reporting(E_ALL  ^  E_NOTICE );
function pr($var)
{
    $template = PHP_SAPI !== 'cli' ? '<pre>%s</pre>' : "\n%s\n";
    printf($template, print_r($var, true));
}

if(($_SERVER['REQUEST_URI'] == '/')){
    $_SERVER['REQUEST_URI'] = '/admin';
}
if(($_SERVER['REQUEST_URI'] == '/pms/')){
    $_SERVER['REQUEST_URI'] = '/pms/admin';
}


include __DIR__.'/../CC2/CC.php';


$app = include  __DIR__.'/protected/pre/app.php';

$app->run();



