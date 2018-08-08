<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/8
 * Time: 15:37
 */

namespace module\leaveMsg\index;


use CC\action\ListAction;

class LeaveMsgIndexIndexAdminAction extends ListAction
{
    protected function getTable()
    {
        return 'leave_msg';
    }

    protected function getSearchCondition()
    {
        $this->dbCondition->order('id desc');
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
}