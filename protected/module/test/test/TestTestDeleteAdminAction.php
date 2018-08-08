<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2018/8/7
 * Time: 12:30
 */

namespace module\test\test;

use CC\action\DeleteAction;
use CC\db\base\select\ItemModel;
use CC\db\base\update\UpdateModel;
use CRequest;

class TestTestDeleteAdminAction extends DeleteAction
{
    protected function deleteData(CRequest $request)
    {
        $id = $this->request->getParams('id');
        $result = UpdateModel::make('user')->addData(['is_delete' => 1], $id)->execute();
        //$result = DeleteModel::make('user')->addColumnsCondition(array('id'=>$id))->execute();
        return $result;
    }

    protected function onAfterDelete(&$data)
    {
        $info = ItemModel::make('user')->addColumnsCondition(['id'=>$this->request->getParams('id')])->execute();
        if(strpos($info['name'],'已删除')){

        }else{
            UpdateModel::make('user')->addData(['name' => $info['name'] . '(已删除)'], $this->request->getParams('id'))->execute();
        }

    }
}