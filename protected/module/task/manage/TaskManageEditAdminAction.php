<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:24
 */

namespace module\task\manage;


use biz\Session;
use CC\action\checker\IParamsChecker;
use CC\action\module\basic\tree\UserDeptTreeJsData;
use CC\action\SaveAction;
use CC\db\base\core\condition\DefaultValueCondition;
use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;
use CC\util\common\widget\form\creator\PostNamesCreator;
use CC\util\common\widget\form\IFormViewBuilder;
use CC\util\common\widget\form\IInput;
use CC\util\common\widget\form\IntInput;
use CC\util\common\widget\form\RadioButtonListInput;
use CC\util\common\widget\form\SelectInput;
use CC\util\common\widget\form\SubmitInput;
use CC\util\common\widget\form\TextAreaInput;
use CC\util\common\widget\form\TextInput;
use CC\util\common\widget\form\TimeRangeInput;
use CC\util\common\widget\form\TreeInput;
use Exception;
use module\project\manage\server\ProjectUserServer;
use module\project\module\server\ProjectModuleServer;
use module\project\module\server\ProjectModuleTreeJsData;
use module\project\version\server\ProjectVersionServer;
use module\task\manage\enum\TaskPriorityLevelEnum;

class TaskManageEditAdminAction extends SaveAction implements IFormViewBuilder,IParamsChecker
{
    public $project_id;
    public $from_page;
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


    protected function onBeforeSave(&$data)
    {
        if($this->isAdd()){
            $data['estimate_start_time'] = strtotime($data['estimate_start_time']);
            $data['estimate_end_time'] = strtotime($data['estimate_end_time']);
            $data['project_id'] = $this->project_id;
            $data['create_uid'] = Session::getUserID();
            $data['create_time'] = time();
            $data['cur_progress_time'] = time();
            $data['estimate_time'] = ceil(($data['estimate_end_time']-$data['estimate_start_time'])/86400);
        }
    }

    protected function getCheckers()
    {
        return [$this];
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
        $user_tree_list = UserDeptTreeJsData::instance()->getTreeList();
        return [
            new TextInput('name','任务名称',['must']),
            new SelectInput('project_version_id','版本',ProjectVersionServer::getAllVersion($this->project_id),['must']),
            new SelectInput('priority_level','优先级',TaskPriorityLevelEnum::getValues()),
            new TreeInput('project_module_id','模块', ProjectModuleTreeJsData::instance()->setConditions(array(
                new DefaultValueCondition('project_id',$this->project_id),
            ))->getTreeList(),['must'],['is_multi' => false,'only_child' => false]),
            new TreeInput('dev_uid','指派给', $user_tree_list,['must'],['is_multi' => false]),
//            (new IntInput('estimate_time','预估时间',['must']))->setExtrainfo('天'),
            new TimeRangeInput('estimate_start_time', 'estimate_end_time','预估时间', ['must'],'date-time'),
            new TextAreaInput('content','内容描述'),
            new RadioButtonListInput('is_child', '显示创建子任务',['0'=>'否','1'=>'是'],'0'),
        ];
    }

    /**
     * @param array $data
     * @param string $msg
     * @return bool
     * @throws Exception
     */
    public function onCheck($data, &$msg)
    {

    }
}