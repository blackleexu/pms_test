<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/29
 * Time: 11:06
 */

namespace module\project\version;


use CC\db\base\update\UpdateModel;
use CRequest;

class ProjectVersionPubAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        UpdateModel::make('project_version')->addColumnsCondition(array(
            'id' => $request->getParams('id'),
        ))->addData(array(
            'is_pub' => 1,
            'real_pub_time' => time(),
        ))->execute();
        return new \CJsonData();
    }
}