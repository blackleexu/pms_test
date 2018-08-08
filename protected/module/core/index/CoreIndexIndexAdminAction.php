<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/9
 * Time: 14:31
 */

namespace module\core\index;


use biz\Session;
use CRequest;

class CoreIndexIndexAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        if(Session::isSuperAdmin()){
            return new \CRedirectData('project/manage/index');
        }
        return new \CRedirectData('project/index/index');
    }
}