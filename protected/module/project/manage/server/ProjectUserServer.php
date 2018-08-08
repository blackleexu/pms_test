<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/2
 * Time: 15:44
 */

namespace module\project\manage\server;


use biz\Session;
use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;
use module\basic\user\enum\UserTypeEnum;

class ProjectUserServer
{
    public static function getUserListByProjectid($project_id,$for_select = true)
    {
        $list = ListModel::make('project_user')
            ->leftJoin('user','u','t.uid = u.id')
            ->addColumnsCondition(array(
            't.project_id' => $project_id,
            ))
            ->select('t.uid,u.name uname,t.is_main,u.dept_id')
            ->execute();
        if(!$for_select){
            return $list;
        }
        return ArrayUtil::arrayColumn($list,'uname','uid');
    }

    public static function getIsPm($project_id)
    {
        $project = ItemModel::make('project')->addColumnsCondition(array(
            'id' => $project_id,
        ))->execute();
        if($project['pm_uid'] == Session::getUserID()){
            return true;
        }
        return false;
    }
    public static function getIsMaxPm($project_id)
    {
        if(UserTypeEnum::isLeader()){
            return true;
        }
        return self::getIsPm($project_id);
    }

    public static function getProjectIds()
    {
        $array = [];
        if(!UserTypeEnum::isLeader()){
            $array = ['uid' => Session::getUserID()];
        }

        $list = ListModel::make('project_user')->addColumnsCondition($array)->execute();
        return ArrayUtil::arrayColumn($list,'project_id');
    }

    public static function getProjectListSort()
    {
        $list = ListModel::make('project')->order('id asc')->execute();
        $project_sort_user_list = ListModel::make('project_sort_user')->addColumnsCondition(array('uid' => Session::getUserID()))->execute();
        $project_sort_user_list = ArrayUtil::arrayColumn($project_sort_user_list,'sort_num','project_id');
        usort($list,function ($a,$b) use($project_sort_user_list){
            $int_a = isset($project_sort_user_list[$a['id']])?$project_sort_user_list[$a['id']]:-$a['id'];
            $int_b = isset($project_sort_user_list[$b['id']])?$project_sort_user_list[$b['id']]:-$b['id'];
            return $int_a <= $int_b ? 1: -1;
        });
        return $list;
    }
}