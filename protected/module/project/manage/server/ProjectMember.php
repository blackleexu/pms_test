<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/13
 * Time: 13:13
 */

namespace module\project\manage\server;



use CC\db\base\select\ListModel;

class ProjectMember
{
    public static function projectmemberinfo($project_id)
    {
        $arr = [];
        $relt  = ListModel::make('project_user')
            ->leftJoin('user', 'u', 't.uid = u.id')->select('t.uid,u.name uname,t.is_main,u.dept_id,t.pro_func')
            ->addColumnsCondition(['project_id' => $project_id])->execute();

        foreach ($relt as $item) {
            $arr[$item['uid']] = $item;
        }
        return $arr;
    }
}