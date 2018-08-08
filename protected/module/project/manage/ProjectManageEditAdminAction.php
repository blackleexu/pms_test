<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:24
 */

namespace module\project\manage;


use CC\action\module\basic\tree\UserDeptTreeJsData;
use CC\action\SaveAction;
use CC\util\common\widget\form\creator\PostNamesCreator;
use CC\util\common\widget\form\IFormViewBuilder;
use CC\util\common\widget\form\IInput;
use CC\util\common\widget\form\PicsInput;
use CC\util\common\widget\form\SubmitInput;
use CC\util\common\widget\form\TextInput;
use CC\util\common\widget\form\TreeInput;
use module\project\manage\saveAfterHandler\ProjectUserSaveAfterHandler;
use module\project\manage\server\ProjectUserServer;

class ProjectManageEditAdminAction extends SaveAction implements IFormViewBuilder
{
    protected function getTable()
    {
        return 'project';
    }

    /**
     * @return string "name,pass"
     */
    protected function getPostNames()
    {
        return PostNamesCreator::create($this);
    }

    protected function getDetData()
    {
        $data = parent::getDetData();
        $data['uids'] = implode(',',array_keys(ProjectUserServer::getUserListByProjectid($data['id'])));
        return $data;
    }

    /**
     * @return  IInput[]
     */
    public function createFormInputs()
    {
        return [
            new TextInput('name','项目名称'),
            new TreeInput('pm_uid','项目经理',UserDeptTreeJsData::instance()->getTreeList(),[],['is_multi' => false]),
            new TreeInput('pm_uid2','项目副经理',UserDeptTreeJsData::instance()->getTreeList(),['is_multi' => false]),
            new TreeInput('uids','项目成员',UserDeptTreeJsData::instance()->getTreeList()),
            new PicsInput('icon','图标'),
            new SubmitInput(),
        ];
    }

    protected function onBeforeSave(&$data)
    {
        unset($data['uids']);
    }

    protected function onAfterSave($data)
    {
        return [
            new ProjectUserSaveAfterHandler(),
        ];
    }
}
