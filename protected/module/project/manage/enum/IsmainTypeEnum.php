<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/4
 * Time: 9:52
 */

namespace module\project\manage\enum;


use biz\Session;
use CC\util\db\Enum;

class IsmainTypeEnum extends Enum
{
    const TYPE_YES = 1;
    const TYPE_NO = 0;

    protected function initAddDatas()
    {
        $this->add(self::TYPE_YES,'主');
        $this->add(self::TYPE_NO,'副');
    }


    public static function isYes()
    {
        return Session::getUserType() == self::TYPE_YES;
    }
    public static function isNo()
    {
        return Session::getUserType() == self::TYPE_NO;
    }



 }