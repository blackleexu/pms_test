<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2018/8/2
 * Time: 17:30
 */

namespace module\test\test;


use CC\action\module\basic\tree\DeptTreeJsData;
use CC\action\SaveAction;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ItemModel;
use CC\db\base\update\UpdateModel;
use CC\util\common\widget\form\CheckBoxListInput;
use CC\util\common\widget\form\creator\PostNamesCreator;
use CC\util\common\widget\form\FilesInput;
use CC\util\common\widget\form\HiddenInput;
use CC\util\common\widget\form\IFormViewBuilder;
use CC\util\common\widget\form\IInput;
use CC\util\common\widget\form\PasswordInput;
use CC\util\common\widget\form\PlainInput;
use CC\util\common\widget\form\RadioButtonListInput;
use CC\util\common\widget\form\SelectInput;
use CC\util\common\widget\form\SubmitInput;
use CC\util\common\widget\form\TextInput;
use CC\util\common\widget\form\TreeInput;
use CC\util\db\SexEnum;
use CRequest;

class TestTestEditAdminAction extends SaveAction implements IFormViewBuilder
{
    //获取默认模板布局
    public function getLayouts()
    {
        if($this->isSelect()){
            return '/layouts/simple';
        }
        return '/layouts/default';
    }

    //当前选项卡是否被选中
    protected function isSelect()
    {
        return $this->getAction() == 'select';
    }

    public function getTable()
    {
        return 'user';
    }

    //创建表单输入项
    public function createFormInputs()
    {
        $input_form = [
            new HiddenInput('id'),
            new TextInput('account','账号',['must']),
            new PasswordInput('pwd','密码'),
            new TextInput('name','姓名',['must']),
            new RadioButtonListInput('sex','性别',SexEnum::getValues()),
            new SelectInput('user_type', '角色', UserTypeEnum::getValues()),
            new TreeInput('dept_id','所属部门',DeptTreeJsData::instance()->getTreeList(), ['must'], ['is_multi' => false, 'only_child' => false]),
            new SubmitInput('提交')
        ];

        return $input_form;
    }

    /**
     * @return string "name,pass"
     */
    protected function getPostNames()
    {
        return '';
    }

    protected function getUpdateConditions()
    {
        return [

        ];
    }

    protected function saveData()
    {
        $data = [];
        $id = $this->request->getParams('id');

        $data['name'] = $this->request->getParams('name');
        $data['account'] = $this->request->getParams('account');
        $data['pwd'] = $this->request->getParams('pwd');
        $data['gender'] = $this->request->getParams('sex');
        $data['user_type'] = $this->request->getParams('user_type');
        $data['dept_id'] = $this->request->getParams('dept_id');

        if($id){
            $result = UpdateModel::make('user')->addData($data)->addColumnsCondition(array('id'=>$id))->execute();
        }else {
            $result = InsertModel::make('user')->addData($data)->execute();
        }
        return new \CJsonData(array_merge(array(
            'last_url' => $this->getSaveRedirectUrl($data),
        ), []));

//        var_dump($data);
//        echo $result;
//        die();
    }

//    protected function onAfterSave($data)
//    {
//        var_dump($this->saveData());
//        echo $this->getId();
//        die;
//    }

}