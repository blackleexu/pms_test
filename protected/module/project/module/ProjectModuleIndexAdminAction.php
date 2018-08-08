<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/2
 * Time: 16:43
 */

namespace module\project\module;


use CC\action\ListAction;
use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\widget\ArrayDataWidget;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\buttons\EditAjaxButtonWidget;
use CC\util\common\widget\widget\buttons\OperateButtonWidget;
use Closure;

class ProjectModuleIndexAdminAction extends ListAction implements ITableViewCreator
{
    public $project_id;
    public $pid = 0;
    protected function getTable()
    {
        return 'project_module';
    }

    protected function getSearchCondition()
    {
        $this->dbCondition->addColumnsCondition(array(
            'project_id' => $this->project_id,
            'pid' => $this->pid,
        ))->order('sort_num desc,id asc');
    }

    /**
     * @return  Column[]
     */
    public function createListColumns(array $list)
    {
        return [
            new Column('名字','name'),
            new Column('排序','sort_num'),
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
        return [function($data){
            $arr = [
                new EditAjaxButtonWidget('编辑', 'edit'),
                new OperateButtonWidget('删除', 'delete'),
            ];
            if(!$data['pid']){
                $arr[] =  new ButtonWidget('子模块', 'index',['pid' => $data['id'],'project_id' => $this->project_id]);
            }
            return new ArrayDataWidget($arr);
        }];
    }
}