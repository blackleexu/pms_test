<?php
/**
 * Created by PhpStorm.
 * User: jesse
 * Date: 2018/4/18
 * Time: 10:21
 */

namespace module\task\child\date;


use CC\util\date\DateUtil;

class Date
{

    public static function dateFormat($timeStamp, $formatStr = 'Y-m-d H:i')
    {
        if (!empty($timeStamp)){
            return date($formatStr,$timeStamp);
        }
    }

    /**
     * 相对时间格式
     * @param $time
     * @return string
     */
    public static function relativeTime($time)
    {
        if (!$time)
            return '';
        $now = time();
        $nowHour = date('H',$now);
        $today_time = DateUtil::getDayBeginTime(time());
        if ($time + 60 > $now){
            return '1分钟之内';
        }
        elseif ($time + 3600 > $now){ //一小时
            $mins = intval(($now-$time)/60);
            return $mins.'分钟之前';
        }
        elseif ($time > $today_time){ //一天
            $hours = intval(($now-$time)/3600);
            return $hours. '小时之前';
        }
        elseif (($time > $today_time - 86400)   ) {
            return '昨天';
        }
        else{
            $week = (int)date('w');
            if (($time + ($week-1)*86400 + $nowHour*3600) > $now){ //本周
                return '周'. mb_substr( "日一二三四五六",date("w", $time),1,"utf-8" );
            }
            elseif (($time + ($week+6)*86400 + $nowHour*3600) > $now){ //上周
                return '上周';
            }
            else{
                return '很久没更新了';
            }
        }
    }
}