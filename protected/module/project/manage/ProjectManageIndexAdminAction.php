<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:20
 */

namespace module\project\manage;


use CC\action\ListAction;
use CC\action\listHandler\AdditionDataListBeforeHandler;
use CC\action\listHandler\MultiAdditionDataListBeforeHandler;


use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\buttons\ViewButtonWidget;
use Closure;
use CRequest;
use module\project\manage\enum\DutyTypeEnum;
use module\project\manage\listHandler\MuiltIdToNameListBeforeHandler;

class ProjectManageIndexAdminAction extends ListAction implements ITableViewCreator
{
    protected function getTable()
    {
        return 'project';
    }

    /**
     * @return  Column[]
     */
    public function createListColumns(array $list)
    {
        return [
            new Column('项目名称','name'),
            new Column('项目经理','pm_uname'),
            new Column('项目经副理','pm_uname2'),

            new Column('项目成员','user',function($data){
                $str = '';
                $arr = [];

                if ($data['users']) {

                    foreach ($data['users'] as $key => $item) {
                        $arr[$item['pro_func']][] = $item;
                    }
                }
                foreach (DutyTypeEnum::getValues() as $ke => $va) {


                    foreach ($arr as $i => $user) {
                        if ($ke == $i) {
                            $str .= '<div>' . DutyTypeEnum::getValueByIndex($i) . ':';

                            foreach ($user as $keys => $value) {
                                if ($value['is_main'] == 1) {
                                    $str .= '<span  style="color: #000"' ;
                                    $str .= '>' . $value['name'] . '　</span>';
                                }
                            }
                            foreach ($user as $keys => $value) {
                                if ($value['is_main'] == 0) {
                                    $str .= '<span ';
                                    $str .= '>' . $value['name'] . '　</span>';
                                }
                            }
                            $str .= '</div>';
                        }

                    }
                }

                return $str;
            })
        ];
    }
    public function getLayouts()
    {
        return '/layouts/default';
    }

    protected function onListBefore(&$list)
    {
        return [
            new MultiAdditionDataListBeforeHandler(
                'users',
                ['table' => 'project', 'field' => 'id'],
                ['table' => 'project_user', 'intermediate_field' => 'project_id', 'target_field' => 'uid',
                    'intermediate_table_map' => ['is_main' => 'is_main', 'pro_func' => 'pro_func']],
                ['table' => 'user', 'tartget_table_map' => ['name' => 'name','id' => 'id','dept_name' => 'dept_id']]
            ),
            new AdditionDataListBeforeHandler('user','pm_uid',['pm_uname' => 'name']),
            new AdditionDataListBeforeHandler('user','pm_uid2',['pm_uname2' => 'name']),
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
            new ButtonWidget('项目编辑','edit'),
            (new ViewButtonWidget('成员管理', 'duty'))->setAttributes(['data-zdy_closefn' => 'duty_closefn']),
        ];
    }
}
