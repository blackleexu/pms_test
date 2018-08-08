<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:20
 */

namespace module\project\index;


use biz\Session;
use CC\action\ListAction;
use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;
use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use Closure;
use CRequest;
use module\basic\user\enum\UserTypeEnum;
use module\project\manage\server\ProjectUserServer;
use module\task\manage\enum\TaskStatusEnum;

class ProjectIndexIndexAdminAction extends ListAction implements ITableViewCreator
{
    protected function getTable()
    {
        return 'project';
    }

    protected function getSearchCondition()
    {
    }

    public function execute(CRequest $request)
    {
        $list = null;
        if(UserTypeEnum::isProduct() || UserTypeEnum::isTest()) {
            $list = ProjectUserServer::getProjectListSort();
        }
        return new \CRedirectData('/task/manage/index',['project_id' => $list[0]['id']]);
    }

    /**
     * @return  Column[]
     */
    public function createListColumns(array $list)
    {
        return [
            new Column('项目名称','name'),
        ];
    }

    protected function onExecute()
    {
        $leave_msg_list = ListModel::make('leave_msg')->order('id desc')->execute();
        return [
            'leave_msg_list' => $leave_msg_list,
        ];
    }

    /**
     * @return IFilter[]
     */
    public function createListFilters()
    {
        return [];
    }

    /**
     * @return  ButtonWidget[] | Closure[] | false
     */
    public function createOperateButtons(array $list)
    {
        return [
        ];
    }
}