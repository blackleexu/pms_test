<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/9
 * Time: 14:38
 */

namespace module\project\version\server;


use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;

class ProjectVersionServer
{
    public static function getNewestVersion($project_id)
    {
        $project_version =  ItemModel::make('project_version')->addColumnsCondition(array('project_id' => $project_id))->order('id desc')->execute();
        $project_version['name'] = $project_version['name']?$project_version['name']:'无';
        $project_version['dev_time'] = self::handelTimeRange($project_version,'dev_start_time','dev_end_time');
        $project_version['test_time'] = self::handelTimeRange($project_version,'test_start_time','test_end_time');
        $project_version['pub_time'] = $project_version['pub_time']?date('Y-m-d',$project_version['pub_time']):'无';
        return $project_version;
    }

    public static function getAllVersion($project_id)
    {
        return ArrayUtil::arrayColumn(ListModel::make('project_version')->addColumnsCondition(['project_id' => $project_id])->order('id desc')->execute(),'name','id');
    }
    public static function handelTimeRange($data, $start_key, $end_key)
    {
        if(!$data[$end_key]){
            return '无';
        }
        $day = ($data[$end_key] - $data[$start_key]) / 86400 + 1;
        return date('Y-m-d', $data[$start_key]) . '~' . date('Y-m-d', $data[$end_key]) . '（' . $day . '天）';
    }


}