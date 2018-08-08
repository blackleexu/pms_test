<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/4
 * Time: 9:52
 */

namespace module\test\test;


use biz\Session;
use CC\util\db\Enum;

class UserTypeEnum extends Enum
{
    const TYPE_DEV     = 1;
    const TYPE_MANAGER = 2;
    const TYPE_LEADER  = 3;
    const TYPE_PRODUCT = 4;
    const TYPE_TEST  = 5;

    protected function initAddDatas()
    {
        $this->add(self::TYPE_DEV,'开发');
        $this->add(self::TYPE_MANAGER,'项目经理');
        $this->add(self::TYPE_LEADER,'大领导');
        $this->add(self::TYPE_PRODUCT,'产品');
        $this->add(self::TYPE_TEST,'测试');
    }

    public static function isLeader()
    {
        return Session::getUserType() == self::TYPE_LEADER;
    }

    public static function isMnager()
    {
        return Session::getUserType() == self::TYPE_MANAGER;
    }


    public static function isProduct()
    {
        return Session::getUserType() == self::TYPE_PRODUCT;
    }
    public static function isTest()
    {
        return Session::getUserType() == self::TYPE_TEST;
    }

    public static function isDev()
    {
        return Session::getUserType() == self::TYPE_DEV;
    }


 }