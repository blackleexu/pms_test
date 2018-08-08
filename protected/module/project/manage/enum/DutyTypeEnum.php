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

class DutyTypeEnum extends Enum
{
    const TYPE_ANDROID = 199;
    const TYPE_IOS = 200;
    const TYPE_TEST = 201;
    const TYPE_FORE = 202;
    const TYPE_PHP = 205;
    const TYPE_DEVELOPMENT = 203;
    const TYPE_REPONSIBLE = 204;
    const TYPE_Pc = 206;

    protected function initAddDatas()
    {
        $this->add(self::TYPE_DEVELOPMENT, '研发负责人');
        $this->add(self::TYPE_REPONSIBLE, '测试负责人');
        $this->add(self::TYPE_PHP, 'PHP');
        $this->add(self::TYPE_ANDROID, '安卓');
        $this->add(self::TYPE_IOS, 'IOS');
        $this->add(self::TYPE_TEST, '测试');
        $this->add(self::TYPE_FORE, '前端');
        $this->add(self::TYPE_Pc, 'PC客户端');
    }




 }