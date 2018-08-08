<?php
namespace module\basic\dept;

use CC\action\checker\IParamsChecker;
use CC\action\checker\UniqueChecker;
use CC\action\module\basic\dept\event\UserLRChangeEventHandler;
use CC\action\module\basic\dept\saveHandler\DeptChangeImsyncSaveAfterHandler;
use CC\action\module\basic\dept\saveHandler\DeptChangeUsersyncSaveAfterHandler;
use CC\action\SaveAction;
use CC\action\saveHandler\after\TreeLRSaveAfterHandler;
use CC\action\saveHandler\before\TreeLevelSortSaveBeforeHandler;
use CC\event\EventManager;
use CC\util\common\widget\form\creator\CheckCreator;
use CC\util\common\widget\form\creator\PostNamesCreator;
use CC\util\common\widget\form\IFormViewBuilder;
use CC\util\common\widget\form\TextInput;

class BasicDeptEditAdminAction extends SaveAction implements IFormViewBuilder
{
    public $isLayout = false;
    public $parent_id;

    protected function getTable()
    {
        return 'department';
    }

    public function createFormInputs()
    {
        return [
            (new TextInput('name', '部门名称', ['must', ['len', 'max' => 10]]))->setExtrainfo('最长10个字符'),

        ];
    }

    protected function getIsOpenTransaction()
    {
        return true;
    }

    /**
     * @return string "name,pass"
     */
    protected function getPostNames()
    {
        return PostNamesCreator::create($this);
    }

    protected function onBeforeSave(&$data)
    {
        if ($this->isAdvanced()) {
            \CC::app()->db->getLock();
        }
        $data['last_id'] = $this->parent_id;

        return [
            new TreeLevelSortSaveBeforeHandler($this->getTable(), 'level', 'sort_id', $this->parent_id),
        ];
    }

    protected function isAdvanced()
    {
        return true;
    }

    protected function onAfterSave($data)
    {
        EventManager::addHandler('table_lr_change_' . $this->getTable(), new UserLRChangeEventHandler('user', 'l', 'r', 'dept_id'));
        $handlers = $this->isAdvanced() ? [new TreeLRSaveAfterHandler($this->getTable(), 'l', 'r')] : [];
        $handlers[] = new DeptChangeUsersyncSaveAfterHandler();
        return $handlers;
    }

    protected function onSaveExecute($data)
    {
        return [
            'id' => $data['id'],
            'name' => $data['name'],
        ];
    }

    /**
     * @return  IParamsChecker[]
     */
    protected function getCheckers()
    {
        return array_merge(CheckCreator::create($this), [
            new UniqueChecker('name', '部门名称', $this->getTable(), $this->id)
        ]);
    }


}


