<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/17
 * Time: 14:49
 */

namespace module\notice\index\server;


use biz\Session;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\util\common\server\SessionAbs;
use module\task\manage\enum\TaskStatusEnum;

class NoticeBeginTransaionServer
{


    /**
     * @param $data //数据
     * @param $status //状态判断
     * @param $content //内容
     */
    public static function getDatas(array $data, $status, $content)
    {

        $pm_uid = [];
        $pm_uid_main = [];//登录id所负责的主要负责的项目
        $info = ItemModel::make('user')->addColumnsCondition(['id' => SessionAbs::getUserID()])->addSelect('id, name, user_type')->execute();
        if ($info['user_type'] == 1) {
            $pm_uid = ItemModel::make('project')->addColumnsCondition(['id' => $data['project_id']])->addSelect('pm_uid')->execute()['pm_uid'];//接收者id
            $is_main = ItemModel::make('project_user')->addColumnsCondition(array(
                'project_id' => $data['project_id'], 'uid' => SessionAbs::getUserID()
            ))->execute();
            if (isset($is_main) && $is_main['is_main'] == 0) { //判断是否是主要负责的项目 判断条件为否
                $main = ItemModel::make('project_user')->addColumnsCondition(array(//查询只要负责的项目
                    'is_main' => 1, 'uid' => SessionAbs::getUserID()
                ))->execute();
                $pm_uid_main = ItemModel::make('project')->addColumnsCondition(['id' => $main['project_id']])
                    ->select('pm_uid')->execute();//查询主要负责的项目经理id
            }
        }
        if ($info['user_type'] == 2 ) {//经理级别
            $pm_uid = ListModel::make('user')->addColumnsCondition(['user_type' => 3])->addSelect('id')->execute();
        }
        if ($info['user_type'] == 3) {//领导级别
            $pm_uid = ListModel::make('user')->addColumnsCondition(array(
                'user_type' => 3, 'id' => ['!=', SessionAbs::getUserID()]
            ))->addSelect('id')->execute();
        }
        self::makeNotice($data, $status, $pm_uid, $content, $pm_uid_main['pm_uid']);
    }

    /**
     * @param array $data
     * @param $status //状态
     * @param $aid //接受者id
     * @param $content //内容
     * @param $main //主要负责人的id  有 则代表需要重新发消息给主要负责经理， 无则代表已自动发送
     */
    public static function makeNotice(array $data, $status, $aid, $content, $main = '')
    {
        if ($status == TaskStatusEnum::STARTING) {
            $type = '开始任务';
            $content =  '任务名称：' . $data['name'] . '<br>说明：' . ($content?$content:'无');
        } if ($status == TaskStatusEnum::TESTING) {
            $type = '任务进入测试';
            $content =  '任务名称：' . $data['name'] . '<br>说明：' . ($content?$content:'无');
        } elseif ($status == TaskStatusEnum::DEV_FINISH) {
            $type = '完成任务';
            $content =  '任务名称：' . $data['name'] . '<br>说明：' . ($content?$content:'无');
        } elseif ($status == TaskStatusEnum::ACTIVED) {
            $type = '激活任务';
            $content =  '任务名称：' . $data['name'] . '<br>说明：' . ($content?$content:'无');
        } elseif ($status == TaskStatusEnum::CLOSED) {
            $type = '关闭任务';
            $content =  '任务名称：' . $data['name'] . '<br>说明：' . ($content?$content:'无');
        } elseif ($status == 'create') {
            $type = '新增项目进度' . '　' . $data['exp'] . '%';
            $content =  '项目名称：' . $data['name'] . ($content?$content:'无');
        } elseif ($status == 'dynamic') {
            $type = '新增' . explode(':', $content)[0];
            $content = '内容：' . explode(':', $content)[1];

        }

        if ($main) {
            InsertModel::make('notice')->addData(array(
                'sid' => SessionAbs::getUserID(), 'aid' => $main, 'title' => $type ,
                'content' => $content, 'time' => time()
            ))->execute();
        }


        if (is_array($aid)) {
            foreach ($aid as $item) {//循环发送领导
                InsertModel::make('notice')->addData(array(
                    'sid' => SessionAbs::getUserID(), 'aid' => $item['id'], 'title' => $type,
                    'content' => $content, 'time' => time()
                    ))->execute();
            }
        } else {
            InsertModel::make('notice')->addData(array(//发送给上级领导
                'sid' => SessionAbs::getUserID(), 'aid' => $aid, 'title' => $type ,
                'content' => $content, 'time' => time()
            ))->execute();
        }
        $project_user = ItemModel::make('project_user')->addColumnsCondition(array('uid' => Session::getUserID(),'is_main' => 1))->execute();
        if($project_user['project_id'] != $data['project_id']){
            InsertModel::make('notice')->addData(array(//添加一份成员动态信息
                'sid' => SessionAbs::getUserID(), 'project_id' => $project_user['project_id'], 'title' => $type,
                'content' => $content, 'time' => time()
            ))->execute();
        }
        InsertModel::make('notice')->addData(array(//添加一份成员动态信息
            'sid' => SessionAbs::getUserID(), 'project_id' => $data['project_id'], 'title' => $type,
            'content' => $content, 'time' => time()
        ))->execute();
        InsertModel::make('notice')->addData(array(//给自己发一条信息
            'sid' => SessionAbs::getUserID(), 'aid' => SessionAbs::getUserID(), 'title' => $type,
            'content' => $content, 'time' => time()
        ))->execute();

    }
}