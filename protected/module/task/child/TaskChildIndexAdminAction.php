<?php
/**
 * Created by PhpStorm.
 * User: jesse
 * Date: 2018/4/16
 * Time: 9:54
 */

namespace module\task\child;


use biz\Session;
use CC\action\ListAction;
use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\listColumn\SimpleColumnValueSetterWrapper;
use CC\util\common\widget\listColumn\TimeRangeColumnValueSetter;
use CC\util\common\widget\widget\ArrayDataWidget;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\buttons\EditAjaxButtonWidget;
use CC\util\common\widget\widget\buttons\OperateButtonWidget;
use Closure;
use module\task\child\date\Date;
use module\task\manage\enum\TaskStatusEnum;

class TaskChildIndexAdminAction extends ListAction implements ITableViewCreator
{

    protected function getTable()
    {
        return 'task';
    }
    /**
     * @return  Column[]
     */
    public function createListColumns(array $list)
    {
        return [
            new Column('任务名','name'),
            new Column('描述','content'),
            new Column('创建时间','create_time',function ($data){
                return Date::dateFormat($data['create_time']);
            }),
            new Column('开始时间','start_time', function ($data){
                return Date::dateFormat($data['start_time'], 'm-d H:i');
            }),
            new Column('结束时间','dev_finish_time', function ($data){
                return Date::dateFormat($data['dev_finish_time'], 'm-d H:i');
            }),
            new Column('状态','status',new SimpleColumnValueSetterWrapper('status',TaskStatusEnum::getValuesColor())),
        ];
    }

    public function getPageSize()
    {
        return 0;
    }

    protected function getSearchCondition()
    {
        $this->dbCondition->addColumnsCondition(array('pid'=>$this->request->getParams('pid')));
    }

    protected function onListBefore(&$list)
    {

    }

    /**
     * @return IFilter[]
     */
    public function createListFilters()
    {
        // TODO: Implement createListFilters() method.
    }

    /**
     * @return  ButtonWidget[] | Closure[] | false
     */
    public function createOperateButtons(array $list)
    {

        return [
            function ($data){
                $buttons = array();
                $pid = $this->request->getParams('pid');
                if($data['status'] == TaskStatusEnum::NO_START && $data['dev_uid'] == Session::getUserID()){
                    $buttons[] =new OperateButtonWidget('开始', 'task/child/status', ['toStatus'=>TaskStatusEnum::STARTING],'', '',
                        [
                            'option-list-tabel-id' => 'child_list',
                            'reload_url' => $this->genurl('/task/child/index',['pid' => $pid])
                        ]);
                }
                if($data['status'] == TaskStatusEnum::STARTING && $data['dev_uid'] == Session::getUserID()){
                    $buttons[] = new EditAjaxButtonWidget('完成', 'task/child/insert', ['toStatus'=>TaskStatusEnum::TESTING,'pid'=>$data['pid']],
                        [
                            'option-list-tabel-id' => 'child_list',
                            'reload_url' => $this->genurl('/task/child/index',['pid' => $pid]),
                        ]);
                }
                if ((($data['status'] == TaskStatusEnum::STARTING ) || ($data['status'] == TaskStatusEnum::NO_START )) && $data['dev_uid'] == Session::getUserID()){
                    $buttons[] = new EditAjaxButtonWidget('编辑', 'task/child/insert', ['id'=>$data['id'], 'pid'=>$data['pid']],
                        [
                            'option-list-tabel-id' => 'child_list',
                            'reload_url' => $this->genurl('/task/child/index',['pid' => $pid]),
                        ]);
                }
                return new ArrayDataWidget($buttons);
            }
        ];
    }
    public function getIsLayout()
    {
        return false;
    }
}