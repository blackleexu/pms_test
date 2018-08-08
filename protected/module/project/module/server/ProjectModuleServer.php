<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/3
 * Time: 14:40
 */

namespace module\project\module\server;


use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;

class ProjectModuleServer
{
    public static function getAllModule($project_id)
    {
        return ArrayUtil::arrayColumn(ListModel::make('project_module')->addColumnsCondition(array('project_id' => $project_id))->order('id desc')->execute(),'name','id');
    }

}