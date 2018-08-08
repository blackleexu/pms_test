<?php
/**
 * Created by PhpStorm.
 * User: jesse
 * Date: 2018/4/19
 * Time: 11:44
 */

namespace module\task\child\server;


use CC\db\base\select\ItemModel;
use module\task\manage\enum\TaskStatusEnum;

class Tool
{
    /**
     * @param $pid
     * @return int
     */
    public static function getExp($pid)
    {
        $count = (int)\CModel::model('task')->count('pid = ? and status != ?',array($pid,TaskStatusEnum::TESTING));
        if (!$count){
            return false;
        }
        $mExp = ItemModel::make('task')->addColumnsCondition(array('id' => $pid))->select('cur_progress_percent')->execute();
        $mExp = $mExp['cur_progress_percent'] ? intval($mExp['cur_progress_percent']) : 0;
        $_per = floor((100 - $mExp) / $count);
        $per = $mExp + $_per >= 100 ? 99 : $mExp + $_per;
        return $per;
    }
}