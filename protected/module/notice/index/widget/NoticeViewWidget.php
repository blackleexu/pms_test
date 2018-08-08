<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16
 * Time: 18:32
 */

namespace module\notice\index\widget;


use CC\db\base\select\ListModel;
use CC\util\common\server\SessionAbs;
use CC\util\common\widget\widget\Widget;
use module\notice\index\server\SendNoticeInfo;

class NoticeViewWidget extends Widget
{

    protected $session_id;
    public function __construct($session_id)
    {
        $this->session_id = $session_id;
    }

    protected function onBuild()
    {
        $notice = ListModel::make('notice')->addColumnsCondition(array(
            'is_empty' => 0, 'aid' => $this->session_id, 'project_id' => 0
        ))->order('id desc' )->execute();

        return array(
            'notice' => SendNoticeInfo::getUserName($notice)
        );// TODO: Implement onBuild() method.
    }
}