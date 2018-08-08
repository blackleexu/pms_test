<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/8
 * Time: 16:11
 */

namespace module\project\version;

use biz\Session;
use CC\action\module\basic\tree\UserDeptTreeJsData;
use CC\action\SaveAction;
use CC\util\common\widget\form\creator\PostNamesCreator;
use CC\util\common\widget\form\IFormViewBuilder;
use CC\util\common\widget\form\IInput;
use CC\util\common\widget\form\IntInput;
use CC\util\common\widget\form\SelectInput;
use CC\util\common\widget\form\SubmitInput;
use CC\util\common\widget\form\TextAreaInput;
use CC\util\common\widget\form\TextInput;
use CC\util\common\widget\form\TimeInput;
use CC\util\common\widget\form\TimeRangeInput;
use CC\util\common\widget\form\TreeInput;
use module\project\manage\server\ProjectUserServer;

class ProjectVersionEditAdminAction extends SaveAction implements IFormViewBuilder
{
    public $project_id;
    protected function getTable()
    {
        return 'project_version';
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
        $data['dev_start_time'] = strtotime($data['dev_start_time']);
        $data['dev_end_time'] = strtotime($data['dev_end_time']);
        $data['test_start_time'] = strtotime($data['test_start_time']);
        $data['test_end_time'] = strtotime($data['test_end_time']);
        $data['pub_time'] = strtotime($data['pub_time']);
        if($this->isAdd()){
            $data['project_id'] = $this->project_id;
        }
    }


    public function getIsLayout()
    {
        return false;
    }

    /**
     * @return  IInput[]
     */
    public function createFormInputs()
    {
        return [
            new TextInput('name','版本名称',['must']),
            new TextAreaInput('content','内容描述','0',['must']),
            new TimeRangeInput('dev_start_time','dev_end_time','开发时间',['must'],'date'),
            new TimeRangeInput('test_start_time','test_end_time','测试时间',['must'],'date'),
            new TimeInput('pub_time','发布时间','date',['must']),
        ];
    }
}