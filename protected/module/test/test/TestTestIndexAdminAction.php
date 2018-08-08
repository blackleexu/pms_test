<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2018/8/2
 * Time: 17:27
 */

namespace module\test\test;


use CC\action\ListAction;
use CC\action\module\basic\dept\enum\DeptEnum;
use CC\action\module\basic\user\enum\UserSortKeyEnum;
use CC\action\module\basic\user\enum\UserSortNameEnum;
use CC\db\base\core\condition\EqualCondition;
use CC\db\base\core\condition\SubCondition;
use CC\db\base\delete\DeleteModel;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ListModel;
use CC\db\base\update\UpdateModel;
use CC\util\common\widget\filter\HiddenFilter;
use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\filter\InputFilter;
use CC\util\common\widget\filter\SelectFilter;
use CC\util\common\widget\filter\SubmitFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\listColumn\SimpleColumnValueSetterWrapper;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\buttons\OperateButtonWidget;
use Closure;
use CRequest;
use module\test\test\UserTypeEnum;
class TestTestIndexAdminAction extends ListAction implements ITableViewCreator
{
    //设置操作表
    protected function getTable()
    {
        return 'user';
    }

    //添加搜索条件
    protected function getSearchCondition()
    {
        $this->dbCondition->order('id desc');
        $this->dbCondition->addColumnsCondition(['is_delete'=>0]);

//        echo $name.$user_type;
//        die;
        $name = $this->request->getParams('name','');
        $name = '%' . trim($name) . '%';
        if ($name !== '') {
            $this->dbCondition->addStrCondition('id like :id or name like :name or account like :account', [
                ':id' => $name,
                ':name' => $name,
                ':account' => $name,
            ]);
        }

        $this->dbCondition->addConditions(array(
            //左侧树形菜单查找条件
            new SubCondition($this->request->getParams('dept_id', 0), 'department', 'dept_id'),
            //角色查找条件
            new EqualCondition('role_id','role_id'),

            new EqualCondition('user_type'),
        ));
        $sort = $this->request->getParams('sort', 0);//排序方式
        if ($sort !== '') {
            $this->dbCondition->order(UserSortKeyEnum::getValueByIndex($sort));
        }
    }

    //创建显示列表的表头th名
    public function createListColumns(array $list)
    {
        $columns = [];

        $columns[] = new Column('ID','id');
        $columns[] = new Column('用户名','name');
        $columns[] = new Column('账号','account');
        $columns[] = new Column('部门', 'dept_name',new SimpleColumnValueSetterWrapper('dept_id',DeptEnum::getValues()));
        $columns[] = new Column('最近更新','lastupdate');
        $columns[] = new Column('角色', 'user_type',new SimpleColumnValueSetterWrapper('user_type',UserTypeEnum::getValues()));

        return $columns;
    }

    /**
     * @return IFilter[]
     * 顶部查找条件添加（数据过滤器）
     */
    public function createListFilters()
    {
        return [
            new SelectFilter('sort', '排序', UserSortNameEnum::getValues(), 'drop-down', [0 => '组织架构']),
            new InputFilter('name', '员工', '姓名、账号', false),
            new SelectFilter('user_type', '角色', UserTypeEnum::getValues(), 'drop-down'),
//            new HiddenFilter('input_type', $this->request->getParams('input_type')),
            new SubmitFilter()
        ];
    }

    //创建操作按钮
    public function createOperateButtons(array $list)
    {
        if(!$this->isEditable()){
            return false;
        }

        $buttons =  [
            new ButtonWidget('编辑', 'edit'),
            new OperateButtonWidget('删除', 'delete'),
        ];

        return $buttons;
    }

    //视图获取-重写父类的方法

    //@override
    public function getView()
    {
        return 'indexAdmin';
    }

    //当前选项卡是否被选中
    protected function isSelect()
    {
        return $this->getAction() == 'select';
    }
    //设置列表是否可编辑（修改删除等）
    protected function isEditable()
    {
        return $this->getAction() == 'index';
    }
    //获取默认模板布局
    public function getLayouts()
    {
        if($this->isSelect()){
            return '/layouts/simple';
        }
        return '/layouts/default';
    }
    //
    protected function isViewList()
    {
        return $this->getAction() == 'viewList';
    }
}