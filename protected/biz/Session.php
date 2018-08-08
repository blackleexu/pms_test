<?php
namespace biz;
use CC\db\base\select\ListModel;
use CC\util\common\server\SessionAbs;

/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2016/7/11
 * Time: 21:09
 */
class Session extends SessionAbs
{
    public static function getUserType()
    {
        return self::get('user_type');
    }

    public static function setUserType($val)
    {
        self::set('user_type',$val);
    }
    public static function getNoticeCount()
    {
        return count(ListModel::make('notice')->addColumnsCondition(array(
            'aid' => self::getUserID(), 'is_empty' => 0, 'is_see' => 0
        ))->execute());
    }
}