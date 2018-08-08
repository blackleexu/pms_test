<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/3/4
 * Time: 18:02
 */
use CC\util\common\server\BgTaskServer;

if($app->url->getModule() == 'test' && $app->url->getController() == 'test' && $app->url->getAction() == 'index' && \biz\Session::isLogin()){
//    BgTaskServer::addTask('/cmd/room/forecast/count',[], BgTaskServer::EXEC_TYPE_FORVER);
}
