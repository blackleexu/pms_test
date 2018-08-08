<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/8
 * Time: 17:01
 */

namespace module\project\index\widget;


use biz\Session;
use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;
use CC\util\common\widget\widget\TabWidget;
use module\basic\user\enum\UserTypeEnum;
use module\project\manage\server\ProjectUserServer;

class ProjectNavWidget extends TabWidget
{

    /**
     * @return array(
     *      array(
     *          'name' => 'title',
     *          'action_str' => 'user/index',
     *          'params' => array(),
     *          'actives' => array(
     *              array('action_str'=>'','params' => [])
     *          )
     *      )
     * )
     */
    protected function getActions()
    {
        $arr = [];
        $str = '我的任务';
        if(UserTypeEnum::isLeader()){
            $str = '全部任务';
        }
        if(!UserTypeEnum::isProduct() && !UserTypeEnum::isTest()){
            $arr[] = [
                'name' => $str,
                'action_str' => 'task/manage/index',
                'params' => ['project_id' => ''],
            ];
        }
        $list = ProjectUserServer::getProjectListSort();
        foreach ($list as $item) {
            $arr[] = [
                'name' => $item['name'],
                'action_str' => 'task/manage/index',
                'params' => ['project_id' => $item['id']],
                'actives' => [
                    ['action_str' =>'project/dynamic/index', 'params' => ['project_id' => $item['id']]],
                    ['action_str' =>'project/version/index', 'params' => ['project_id' => $item['id']]],
                    ['action_str' =>'project/dynamic/member', 'params' => ['project_id' => $item['id']]],
                ],
            ];
        }
        return $arr;
    }
}