<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/19
 * Time: 15:27
 */

namespace module\project\user;


use biz\Session;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ItemModel;
use CC\db\base\update\UpdateModel;
use CRequest;

class ProjectUserSortAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        $project_id = $request->getParams('project_id');

        $item = ItemModel::make('project_sort_user')->addColumnsCondition(array(
            'project_id' => $project_id,
            'uid' => Session::getUserID(),
        ))->execute();

        if($item){
            UpdateModel::make('project_sort_user')->addColumnsCondition(array(
                'project_id' => $project_id,
                'uid' => Session::getUserID(),
            ))->addData(array(
                'sort_num' => time(),
            ))->execute();

        }else{
            InsertModel::make('project_sort_user')->addData(array(
                'project_id' => $project_id,
                'uid' => Session::getUserID(),
                'sort_num' => time(),
            ))->execute();
        }
        return new \CRedirectData('/task/manage/index',['project_id' => $project_id]);
    }
}