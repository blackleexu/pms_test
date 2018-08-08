<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 18:17
 */

namespace module\task\index;


use biz\Session;
use CC\action\ListAction;
use module\task\manage\enum\TaskStatusEnum;

class TaskIndexIndexAdminAction extends ListAction
{

    protected function getSearchCondition()
    {
        $uid = Session::getUserID();
        $this->dbCondition->addOrMultiColumnsCondtion(
            [
                'create_uid' => $uid,
            ],
            [
                'dev_uid' => $uid,
            ]
        )->addColumnsCondition(array(
            'status' => ['!=',TaskStatusEnum::CLOSED]
        ))->order('id desc');
    }

    protected function getDataType()
    {
        return 'render';
    }

    /**
     * @return bool
     */
    public function getIsLayout()
    {
        return false;
    }
    protected function getTable()
    {
        return 'task';
    }

}