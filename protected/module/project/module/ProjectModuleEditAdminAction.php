<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/8
 * Time: 16:11
 */

namespace module\project\module;

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

class ProjectModuleEditAdminAction extends SaveAction implements IFormViewBuilder
{
    public $project_id;
    public $pid;

    protected function getTable()
    {
        return 'project_module';
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
            $data['project_id'] = $this->project_id;
            $data['pid'] = $this->pid;
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
            new TextInput('name','名称',['must']),
            (new IntInput('sort_num','排序'))->setExtrainfo('（越大越靠前）'),

        ];
    }
}