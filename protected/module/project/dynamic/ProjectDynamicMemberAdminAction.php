<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/19
 * Time: 11:47
 */

namespace module\project\dynamic;


use CC\action\checker\TimeRangeChecker;
use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\util\common\widget\listColumn\TimeColumnValueSetter;
use CC\util\date\DateUtil;
use CRequest;
use module\basic\user\server\UserServer;
use module\project\dynamic\server\ProjectDynamicServer;
use module\project\manage\enum\DutyTypeEnum;

class ProjectDynamicMemberAdminAction extends \CAction
{
    public $project_id;

    /**
     * @param CRequest $request
     * @return \CRenderData
     */
    public function execute(CRequest $request)
    {
        $project_id = $request->getParams('project_id');

        $notice_list = ListModel::make('notice')->addColumnsCondition(array(
            'project_id' => $project_id, 'aid' => 0, 'time' => ['>=', DateUtil::getDayBeginTime(time()-86400)]
        ))->leftjoin('user', 'u', 't.sid=u.id')->select('t.*,u.name uname')->execute();
        $notice_arr = [];
        if ($notice_list) {
            foreach ($notice_list as $item) {
                if ($item['time'] >= DateUtil::getDayBeginTime(time())) {
                    $notice_arr[$item['sid']]['today'][] = $item;
                }
                if ($item['time'] < DateUtil::getDayBeginTime(time()) && $item['time'] >= DateUtil::getDayBeginTime(time())-86400) {
                    $notice_arr[$item['sid']]['yesterday'][] = $item;
                }
            }
        }

        $project_user_arr = ListModel::make('project_user')->addColumnsCondition(array(
            'project_id' => $project_id,
            'is_main' => 1,
            'u.dept_id' => UserServer::YANFA_DEPT_ID,
        ))->leftjoin('user', 'u', 't.uid=u.id')->select('u.name uname,u.id')->execute();
        $project_user_s = [];
        foreach ($project_user_arr as $val) {
            $project_user_s[$val['id']] = $val;
        }

        $notice_history = ListModel::make('notice')->addColumnsCondition(array(
            'project_id' => $project_id, 'aid' => 0, 'time' => ['<=', DateUtil::getDayBeginTime(time())-86400]
        ))->leftjoin('user', 'u', 't.sid=u.id')->select('t.*,u.name uname')->limit('20')->execute();

        return new \CRenderData(
            [
                'notice_arr' => $notice_arr,
                'project_user_s' => $project_user_s,
                'notice_history' => $notice_history
            ]
        );
    }
}