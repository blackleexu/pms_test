<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/29
 * Time: 10:22
 */

namespace module\leaveMsg\manage;


use CC\action\ListAction;

class LeaveMsgManageIndexAdminAction  extends ListAction
{
    protected function getTable()
    {
        return 'leave_msg';
    }

    protected function getSearchCondition()
    {
        $this->dbCondition->order('id desc');
    }

    public function getPageSize()
    {
        return 100;
    }

    protected function getDataType()
    {
        return 'render';
    }


}