<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/19
 * Time: 9:49
 */

namespace module\notice\index;


use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\util\common\server\SessionAbs;
use CRequest;

class NoticeIndexPollAdminAction extends \CAction
{

    public function execute(CRequest $request)
    {
        $relt = ItemModel::make('notice')->addColumnsCondition(array(
            'aid' => SessionAbs::getUserID(), 'is_see' => 0
        ))->addSelect('count(*) count_num')->execute();
        return  new \CJsonData([
            'num' => (int)$relt['count_num'],
        ]);
    }
}