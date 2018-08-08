<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/8
 * Time: 11:21
 */

namespace module\task\manage;


use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CRequest;

class TaskManageDetailAdminAction extends \CAction
{
    public $id;
    public $project_id;
    public $is_my;
    public function execute(CRequest $request)
    {
        $task = ItemModel::make('task')
            ->leftJoin('user', 'u1', 't.create_uid = u1.id')
            ->leftJoin('user', 'u2', 't.dev_uid = u2.id')
            ->leftJoin('project', 'p', 't.project_id = p.id')
            ->leftJoin('project_version', 'pv', 't.project_version_id = pv.id')
            ->select('t.*,
            u1.name create_uname,
            u2.name dev_uname,
            p.name project_name,
            pv.name project_version_name')
            ->addColumnsCondition(array(
                't.id' => $this->id,
            ))->execute();
        $task_op_list = ListModel::make('task_op')->addColumnsCondition(array(
            'task_id' => $task['id'],
        ))
            ->select('t.*,u.name uname')
            ->leftJoin('user','u','t.uid = u.id')
            ->order('id desc')->execute();
        return new \CRenderData([
                'task' => $task,
                'is_my' => $this->is_my,
                'task_op_list' => $task_op_list,
            ],'',false);
    }
}