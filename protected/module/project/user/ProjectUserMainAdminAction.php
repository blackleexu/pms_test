<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/2
 * Time: 16:24
 */

namespace module\project\user;


use CC\db\base\update\UpdateModel;
use CRequest;

class ProjectUserMainAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        UpdateModel::make('project_user')->addColumnsCondition(array(
            'project_id' => $request->getParams('project_id'),
            'uid' => $request->getParams('uid'),
        ))->addData(array(
            'is_main' => $request->getParams('is_main'),
        ))->execute();

        return new \CJsonData();
    }
}