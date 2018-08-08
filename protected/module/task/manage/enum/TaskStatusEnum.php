<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/6
 * Time: 17:09
 */

namespace module\task\manage\enum;


use CC\util\db\Enum;

class TaskStatusEnum extends Enum
{
    const NO_START = 0;
    const STARTING = 1;
    const TESTING  = 2;
    const DEV_FINISH  = 3;
    const ACTIVED  = 4;
    const CLOSED   = 5;
    protected static function getArr()
    {
        return [
            [
                'id' => self::NO_START,
                'name' => '未开始',
                'color' => '<span style="color: #a6a6a6;">'
            ],
            [
                'id' => self::STARTING,
                'name' => '进行中',
                'color' => '<span style="color: #cc3134;">'
            ],
            [
                'id' => self::TESTING,
                'name' => '测试中',
                'color' => '<span style="color: #b54c80;">'
            ],
            [
                'id' => self::DEV_FINISH,
                'name' => '已完成',
                'color' => '<span style="color: #41b45a;">'
            ],
            [
                  'id' => self::ACTIVED,
                  'name' => '已激活',
                  'color' => '<span style="color: #d67848;">'
              ],

            [
                'id' => self::CLOSED,
                'name' => '已关闭',
                'color' => '<span style="color: #c0c0c0;">'
            ],
        ];
    }
    protected function initAddDatas()
    {
        $this->addForList(self::getArr(),'id','name');
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