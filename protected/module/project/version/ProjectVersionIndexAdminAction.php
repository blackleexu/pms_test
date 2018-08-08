<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/8
 * Time: 16:10
 */

namespace module\project\version;


use CC\action\ListAction;
use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\listColumn\SimpleColumnValueSetterWrapper;
use CC\util\common\widget\listColumn\SplitColumnValueSetter;
use CC\util\common\widget\listColumn\TimeColumnValueSetter;
use CC\util\common\widget\listColumn\TimeRangeColumnValueSetter;
use CC\util\common\widget\widget\ArrayDataWidget;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\buttons\EditAjaxButtonWidget;
use CC\util\common\widget\widget\buttons\OperateButtonWidget;
use CC\util\db\YesNoEnum;
use Closure;
use module\project\version\server\ProjectVersionServer;
use module\task\manage\enum\TaskStatusEnum;

class ProjectVersionIndexAdminAction extends ListAction implements ITableViewCreator
{
    public $project_id;
    protected function getTable()
    {
        return 'project_version';
    }

    protected function getSearchCondition()
    {
        $this->dbCondition->addColumnsCondition(array(
            'project_id' => $this->project_id,
        ))->order('id desc');
    }

    /**
      * @return  Column[]
      */
     public function createListColumns(array $list)
     {
         return [
             new Column('版本名称','name'),
             new Column('内容描述','content',new SplitColumnValueSetter('content',20)),
             new Column('开发时间','start_time',function ($data){
                 return ProjectVersionServer::handelTimeRange($data,'dev_start_time','dev_end_time');
             }),
             new Column('测试时间','start_time',function ($data){
                 return ProjectVersionServer::handelTimeRange($data,'test_start_time','test_end_time');
             }),
             new Column('发布时间','pub_time',new TimeColumnValueSetter('pub_time','Y-m-d')),
             new Column('是否发布','is_pub',new SimpleColumnValueSetterWrapper('is_pub',YesNoEnum::getValues())),
             new Column('实际发布时间','real_pub_time',new TimeColumnValueSetter('real_pub_time','Y-m-d')),
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
             function ($data) {
                 $buttons = [];
                 if(!$data['is_pub']){
                     $buttons[] = new EditAjaxButtonWidget('编辑', 'edit', ['project_id' => $this->project_id]);
                     $buttons[] = new OperateButtonWidget('发布','pub');
                 }
                 return new ArrayDataWidget($buttons);
             },

         ];
     }
}