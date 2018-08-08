<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2018/8/3
 * Time: 17:30
 */

use module\test\test;
use CC\db\base\insert\InsertModel;

class TestTestInsertAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        $info = InsertModel::make('user')->addData(array('name'=>'李旭'))->execute();
    }
}