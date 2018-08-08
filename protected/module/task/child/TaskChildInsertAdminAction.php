<?php
/**
 * Created by PhpStorm.
 * User: jesse
 * Date: 2018/4/16
 * Time: 10:58
 */

namespace module\task\child;


use biz\Session;
use CC\action\SaveAction;
use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\db\base\update\UpdateModel;
use CC\util\common\widget\form\creator\PostNamesCreator;
use CC\util\common\widget\form\HiddenInput;
use CC\util\common\widget\form\IFormViewBuilder;
use CC\util\common\widget\form\IInput;
use CC\util\common\widget\form\IntInput;
use CC\util\common\widget\form\TextAreaInput;
use CC\util\common\widget\form\TextInput;
use module\task\child\server\Tool;
use module\task\manage\enum\TaskStatusEnum;
use module\task\status\server\TaskOpServer;

class TaskChildInsertAdminAction extends SaveAction implements IFormViewBuilder
{

    protected function getTable()
    {
        return 'task';
    }

    /**
     * @return string "name,pass"
     */
    protected function getPostNames()
    {
        return PostNamesCreator::create($this);
    }

    public function createFormInputs()
    {
        $pid = $this->request->getParams('pid');
        $inputs = [];
        if ($this->request->getParams('toStatus') && $this->request->getParams('toStatus') == TaskStatusEnum::TESTING) {
            $per = Tool::getExp($pid);
            if ($per){
                $inputs[] = (new IntInput('cur_progress_percent', '主任务进度', ['must']))->setDefaultValue($per)->setExtrainfo('%');
            }
        } else {
            $inputs[] = new TextInput('name', '任务名称', ['must']);
            $inputs[] = new TextAreaInput('content', '描述', '0');
            $inputs[] = new HiddenInput('pid', $pid);
        }

        return $inputs;
    }

    protected function onBeforeSave(&$data)
    {
        if ($this->isAdd()) {
            $info = ItemModel::make('task')->addColumnsCondition(array('id' => $data['pid']))->execute();
            if ($info['status'] == TaskStatusEnum::TESTING || $info['status'] == TaskStatusEnum::CLOSED){
                throw new \CErrorException('任务完成或已关闭');
            }
            $data['project_id'] = $info['project_id'];
            $data['project_module_id'] = $info['project_module_id'];
            $data['project_version_id'] = $info['project_version_id'];
            $data['priority_level'] = $info['priority_level'];
            $data['create_uid'] = Session::getUserID();
            $data['dev_uid'] = $info['dev_uid'];
            $data['create_time'] = time();
            $data['status'] = 0;
        }
        elseif ($this->request->getParams('toStatus') && $this->request->getParams('toStatus') == TaskStatusEnum::TESTING) {
            $data['status'] = TaskStatusEnum::TESTING;
            $data['dev_finish_time'] = time();
        }
    }

    protected function onAfterSave($data)
    {
        if ($this->request->getParams('toStatus') && $this->request->getParams('toStatus') == TaskStatusEnum::TESTING) {
            $pid = $this->request->getParams('pid');
            $cur_progress_percent = $this->request->getParams('cur_progress_percent');
            UpdateModel::make($this->getTable())
                ->addColumnsCondition(array('id' => $pid))
                ->addData(array('cur_progress_percent' => $cur_progress_percent, 'cur_progress' => Session::getName() . ' 完成子任务: <br>备注: ' . $data['name'], 'cur_progress_time' => time()))
                ->execute();
            $tip = '完成子任务';
            TaskOpServer::_addRecord($pid, $tip, $data['name'], $cur_progress_percent);
        }
    }

    public function getIsLayout()
    {
        return false;
    }
}