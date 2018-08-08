<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 12:25
 */

namespace module\task\status\server;


use biz\Session;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ItemModel;
use CC\db\base\update\UpdateModel;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\buttons\EditAjaxButtonWidget;
use CC\util\common\widget\widget\buttons\OperateButtonWidget;
use CC\util\common\widget\widget\buttons\SimpleParamsBuilder;
use CC\util\common\widget\widget\buttons\ViewButtonWidget;
use module\project\manage\server\ProjectUserServer;
use module\task\manage\enum\TaskStatusEnum;

class TaskOpServer
{


    public static function addRecord($task_id, $task_status,$content)
    {

        $content = self::getOptypContent($task_status, $content);
        $exp = 0;
        if ($task_status == TaskStatusEnum::TESTING){
            $exp = 100;
        }
        else if ($task_status == TaskStatusEnum::ACTIVED) {
            $exp = 99;
        }
        InsertModel::make('task_op')->addData([
            'task_id' => $task_id,
            'uid' => Session::getUserID(),
            'op_type' => $task_status,
            'content' => $content,
            'exp'     => $exp,
            'time' => time(),
        ])->execute();
        self::updateCurProgress($task_id,$content);
    }

    public static function updateCurProgress($task_id,$content)
    {
        $exp = 0;
        $re = ItemModel::make('task_op')
            ->addColumnsCondition(array('task_id'=>$task_id))
            ->order('id desc')
            ->execute();
        if ($re){
            $exp = $re['exp'];
        }
        $result = UpdateModel::make('task')->addData(array(
            'cur_progress' => strip_tags($content),
            'cur_progress_time' => time(),
            'cur_progress_percent' => $exp,
        ))->addId($task_id)->execute();
    }
    public static function getOptypContent($task_status,$content)
    {
        $str = Session::getName().' 修改任务状态为：'.TaskStatusEnum::getValueByIndex($task_status).($content?'<br>备注：'.$content:'');
        return $str;
    }

    /**
     * @param $data
     * @return ButtonWidget[]
     */
    public static function getButtonForStatus($data)
    {
        $buttons = [];
        if ($data['is_child'] == 1){
            $buttons[] = (new ViewButtonWidget('子任务','task/child/index',new SimpleParamsBuilder(['pid' => 'id']),['option-width'=>800, 'zdy_closefn'=>'manage_index_refresh']))->setAttributes(['data-zdy_closefn' => 'duty_closefn']);
        }
        if($data['status'] == TaskStatusEnum::NO_START && $data['dev_uid'] == Session::getUserID()){
            $buttons[] = (new EditAjaxButtonWidget('开始','task/status/index',['to_status' => TaskStatusEnum::STARTING,'id' => $data['id']]))->setAttributes(['data-zdy_closefn' => 'duty_closefn']);
        }
        if( $data['status'] == TaskStatusEnum::STARTING && $data['dev_uid'] == Session::getUserID()){
            $buttons[] = new EditAjaxButtonWidget('进入测试','task/status/index',['to_status' => TaskStatusEnum::TESTING,'id' => $data['id']]);
        }
        if(($data['status'] == TaskStatusEnum::TESTING || $data['status'] == TaskStatusEnum::ACTIVED) && $data['dev_uid'] == Session::getUserID()){
            $buttons[] = new EditAjaxButtonWidget('已完成','task/status/index',['to_status' => TaskStatusEnum::DEV_FINISH,'id' => $data['id']]);
        }
        $is_pm = ProjectUserServer::getIsPm($data['project_id']);
        if($data['status'] == TaskStatusEnum::DEV_FINISH && ($data['create_uid'] == Session::getUserID() || $is_pm)){
            $buttons[] = new EditAjaxButtonWidget('激活','task/status/index',['to_status' => TaskStatusEnum::ACTIVED,'id' => $data['id']]);
            $buttons[] = new EditAjaxButtonWidget('关闭','task/status/index',['to_status' => TaskStatusEnum::CLOSED,'id' => $data['id']]);
        }
        if($data['dev_uid'] == Session::getUserID() && $data['status'] != TaskStatusEnum::CLOSED ) {
            $buttons[] = new EditAjaxButtonWidget('添加进度', 'task/status/addop', new SimpleParamsBuilder(['task_id' => 'id']));
        }
        return $buttons;
    }

    public static function _addRecord($task_id,$tip ,$content, $exp)
    {
        $data['content'] = Session::getName().' '.$tip.' <br>备注: ' . $content;
        $data['uid'] = Session::getUserID();
        $data['op_type'] = '0';
        $data['time'] = time();
        $data['task_id'] = $task_id;
        $data['exp'] = $exp;
        InsertModel::make('task_op')->addData($data)->execute();
    }
}