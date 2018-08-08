<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/9
 * Time: 17:28
 */

namespace module\task\manage\enum;


use CC\util\db\Enum;

class QuickFilterEnum extends Enum
{

    const QUICK_NO_CLOSED = 'no_closed';
    const QUICK_ALL = 'all';
    const QUICK_TO_ME = 'to_me';
    const QUICK_ME_CREATED = 'me_craeted';
    protected function initAddDatas()
    {
        $this->add(self::QUICK_NO_CLOSED,'未关闭');
        $this->add(self::QUICK_TO_ME,'指派给我');
        $this->add(self::QUICK_ME_CREATED,'我创建的');
        $this->add(self::QUICK_ALL,'全部');
        foreach (TaskStatusEnum::getValues() as $key => $value) {
            $this->add($key,$value);
        }
    }
}