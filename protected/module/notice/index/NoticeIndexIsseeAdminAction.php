<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/17
 * Time: 11:00
 */

namespace module\notice\index;


use CC\db\base\update\UpdateModel;
use CJsonData;
use CRequest;

class NoticeIndexIsseeAdminAction extends \CAction
{
    /**
     * @param CRequest $request
     * @return mixed
     */
    public function execute(CRequest $request)
    {
        $data = $request->getParams('aid');
        UpdateModel::make('notice')->addColumnsCondition(array(
            'aid' => $data , 'is_see' => 0
        ))->addData(['is_see' => 1])->execute();

        return new CJsonData();// TODO: Change the autogenerated stub
    }
}