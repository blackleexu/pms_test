<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/8
 * Time: 15:30
 */

namespace module\project\manage\server;


use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;

class ProjectServer
{
    public static function getAllProject()
    {
        return ArrayUtil::arrayColumn(ListModel::make('project')->order('id asc')->execute(),'name','id');
    }
}