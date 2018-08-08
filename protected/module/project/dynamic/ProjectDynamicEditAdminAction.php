<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/2
 * Time: 15:58
 */

namespace module\project\dynamic;


use biz\Session;
use CC\action\SaveAction;
use CC\db\base\select\ItemModel;
use CC\util\common\widget\form\creator\PostNamesCreator;
use CC\util\common\widget\form\GroupInput;
use CC\util\common\widget\form\IFormViewBuilder;
use CC\util\common\widget\form\IInput;
use CC\util\common\widget\form\IntInput;
use CC\util\common\widget\form\SelectInput;
use CC\util\common\widget\form\SubmitInput;
use CC\util\common\widget\form\TextAreaInput;
use CC\util\common\widget\form\TextInput;
use module\notice\index\server\NoticeBeginTransaionServer;
use module\project\dynamic\server\ProjectDynamicServer;

class ProjectDynamicEditAdminAction extends SaveAction implements IFormViewBuilder
{
    public $project_id;
    public $dy_type;
    protected function getTable()
    {
        return 'dynamic';
    }

    /**
     * @return string "name,pass"
     */
    protected function getPostNames()
    {
        return PostNamesCreator::create($this);
    }

    public function getIsLayout()
    {
        return false;
    }

    protected function onBeforeSave(&$data)
    {
        if($this->isAdd()){
            $data['project_id'] = $this->project_id;
            $data['uid'] = Session::getUserID();
            $data['time'] = time();
            $data['dy_type'] = $this->dy_type;
        }
        $data['dev_progress'] = trim($data['dev_progress']);
        if($data['dev_progress'] < 0 || $data['dev_progress'] > 100){

        }
        $data['data'] = json_encode(array(
            'dev_progress' => $data['dev_progress'],
            'test_progress' => $data['test_progress'],
            'progress_status' => $data['progress_status'],
        ));
        unset($data['dev_progress']);
        unset($data['test_progress']);
        unset($data['progress_status']);
    }


    /**
     * @return  IInput[]
     */
    public function createFormInputs()
    {
        $inputs = [
            new TextAreaInput('content', '内容','0',['must']),

        ];
        if($this->dy_type == ProjectDynamicServer::DY_TYPE_PROJECT_PROGRESS){
            $inputs[] = new GroupInput('', [
                (new IntInput('dev_progress', '开发进度',['must',['int','min'=>0,'max'=>100]]))->setExtrainfo('%'),
                (new IntInput('test_progress', '测试进度',['must',['int','min'=>0,'max'=>100]]))->setExtrainfo('%'),
//                (new TextInput('progress_status', '进度整体状态'))->setExtrainfo('（正常、紧急等）'),
            ], 'progress');
        }

        return $inputs;
    }

    protected function onAfterSave($data)
    {
        if ($data['dy_type'] == 2) {
            $str = '项目进度:';
        } elseif ($data['dy_type'] == 3) {
            $str = '疑难问题:';
        } elseif ($data['dy_type'] == 4) {
            $str = '产品规划:';
        }
        NoticeBeginTransaionServer::getDatas($data, 'dynamic', $str. $data['content']);
    }
}