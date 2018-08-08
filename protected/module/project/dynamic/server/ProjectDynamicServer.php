<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 12:28
 */

namespace module\project\dynamic\server;


use biz\Session;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ItemModel;
use module\task\status\server\TaskOpServer;

class ProjectDynamicServer
{
    const DY_TYPE_PROJECT_PROGRESS = 2;
    const DY_TYPE_QUESTION = 3;
    const DY_TYPE_PRODUCT = 4;



    public static function addRecord($project_id,$dy_type,$data,$uid = 0)
    {
        $uid = $uid == 0 ? Session::getUserID() : $uid;
        InsertModel::make('dynamic')->addData(array(
            'project_id' => $project_id,
            'uid' => $uid,
            'dy_type' => $dy_type,
            'content' => self::getOptypContent($dy_type,$data),
            'time' => time()
        ))->execute();


    }
    protected static function getOptypContent($dy_type,$data,$dy_sub_type = 0)
    {
        $str = '';
         return $str;
    }

    public static function getOptypName($dy_type)
    {
        $arr = self::getAlllOptype();
        return $arr[$dy_type];
    }

    public static function getAlllOptype($for_select = false)
    {
        $select_tip = [];
        if($for_select){
            $select_tip = ['' => '选择类型'];
        }
        $arr = $select_tip  + self::getDyTypeSelect();
        return $arr;
    }

    public static function getDyTypeSelect()
    {
        return [
            self::DY_TYPE_PROJECT_PROGRESS => '项目进度',
            self::DY_TYPE_QUESTION => '疑难问题',
            self::DY_TYPE_PRODUCT => '产品规划',
        ];
    }

    public static function getNewProgress($project_id)
    {
        $dynamic = ItemModel::make('dynamic')->addColumnsCondition(array(
            'project_id' => $project_id,
            'dy_type' => self::DY_TYPE_PROJECT_PROGRESS,
        ))->order('id desc')->execute();
        $data = json_decode($dynamic['data'], true);
        $data['dev_progress'] = (int)$data['dev_progress'];
        $data['test_progress'] = (int)$data['test_progress'];
        return $data;
    }
}