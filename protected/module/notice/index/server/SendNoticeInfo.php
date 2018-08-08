<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16
 * Time: 19:04
 */

namespace module\notice\index\server;


use CC\db\base\select\ItemModel;

class SendNoticeInfo
{
    public static function getUserName(array $notice) {
        foreach ($notice as &$item) {
            $item['sname'] = ItemModel::make('user')->addColumnsCondition(array(
                'id' => $item['sid']
            ))->addSelect('name')->execute()['name'];
        }

        return $notice;
    }
}