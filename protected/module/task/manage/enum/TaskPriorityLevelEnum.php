<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/9
 * Time: 17:50
 */

namespace module\task\manage\enum;


use CC\util\db\Enum;

class TaskPriorityLevelEnum extends Enum
{

    const  LEVEL_URGENCY = 1;
    const  LEVEL_HIGH = 2;
    const  LEVEL_NORMAL = 3;
    const  LEVEL_LOW = 4;
    protected function initAddDatas()
    {
        $this->addForList(self::getArr(),'id','name');
    }
    protected static function getArr()
    {
        return [
            [
                'id' => self::LEVEL_NORMAL,
                'name' => '3',
                'color' => '<span class="priority_level" style="background: #db7c12;">'
            ],
            [
                'id' => self::LEVEL_URGENCY,
                'name' => '1',
                'color' => '<span class="priority_level" style="background: #ca1b00;">'
            ],
            [
                'id' => self::LEVEL_HIGH,
                'name' => '2',
                'color' => '<span class="priority_level" style="background: #d84324;">'
            ],
            [
                'id' => self::LEVEL_LOW,
                'name' => '4',
                'color' => '<span class="priority_level" style="background: #dcbe1a;">'
            ],
        ];
    }
    public static function getValuesColor()
    {
        $arr = [];
        foreach (self::getArr() as $item) {
            $arr[$item['id']] = $item['color'].$item['name'].'</span>';
        }
        return $arr;
    }

}