<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 12:24
 */

namespace module\task\status\server;


use biz\Session;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ItemModel;
use CC\db\base\update\UpdateModel;
use module\notice\index\server\NoticeBeginTransaionServer;
use module\project\dynamic\server\ProjectDynamicServer;
use module\task\manage\enum\TaskStatusEnum;

class TaskStatusServer
{
    protected $id;
    protected $status;
    protected $task;
    protected $content;

    /**
     * TaskStatusServer constructor.
     * @param $id
     * @param $status
     * @param $content
     */
    public function __construct($id, $status, $content)
    {
        $this->id = $id;
        $this->status = $status;
        $this->content = $content;
    }


    public static function instance($id,$to_status,$content)
    {
        $obj = new self($id,$to_status,$content);
        return $obj;
    }
    public function toStatus()
    {
        $this->task = ItemModel::make('task')->addColumnsCondition(array('id' => $this->id))->execute();
        $to_status = $this->status;
        TaskOpServer::addRecord($this->id,$to_status,$this->content);
        if($to_status == TaskStatusEnum::STARTING){
            $this->updateStatus('start_time');
            NoticeBeginTransaionServer::getDatas($this->task, $to_status, $this->content);
        }
        if($to_status == TaskStatusEnum::TESTING){
            $transaction = \CModel::model()->beginTransaction();
            $this->updateStatus();
            NoticeBeginTransaionServer::getDatas($this->task, $to_status, $this->content);
            $transaction->commit();
        }
        if($to_status == TaskStatusEnum::DEV_FINISH){
            $this->updateStatus('dev_finish_time');
            NoticeBeginTransaionServer::getDatas($this->task, $to_status, $this->content);
        }
        if($to_status == TaskStatusEnum::ACTIVED){
            $transaction = \CModel::model()->beginTransaction();
            $this->updateStatus('dev_confirm_time');
            NoticeBeginTransaionServer::getDatas($this->task, $to_status, $this->content);
            $transaction->commit();
        }
        if($to_status == TaskStatusEnum::CLOSED){
            $transaction = \CModel::model()->beginTransaction();
            $this->updateStatus('dev_confirm_time');
            NoticeBeginTransaionServer::getDatas($this->task, $to_status, $this->content);
            $transaction->commit();
        }
     }

    protected function updateStatus($time_field = null)
    {
        $data = [
            'status' => $this->status,
        ];
        if($time_field){
            $data[$time_field] = time();
        }

        UpdateModel::make('task')->addColumnsCondition(array(
            'id' => $this->id,
        ))->addData($data)->execute();


    }

    public static function getRealDay($data)
    {
        if($data['status'] != TaskStatusEnum::CLOSED){
            if($data['start_time']){
                return date('m-d H:i~',$data['start_time']);
            }
            return '';
        }
        $day = (int)(($data['dev_confirm_time'] - $data['start_time']) / 86400) + 1;
        return date('m-d H:i~',$data['start_time']).date('m-d H:i',$data['dev_confirm_time']).'<span class="'.($data['estimate_time'] < $day?'red':'').'"> ('.$day .'天)</span>';
    }
    public static function getProgress($task)
    {
        $progress = $task['status'];
        if($task['status'] == TaskStatusEnum::STARTING){
            //$progress = ((time() - $task['start_time'])/86400)/$task['estimate_time'];
        }
        if($task['status'] == TaskStatusEnum::TESTING){
            $progress = 99;
        }

         return [
            'progress' => $progress
        ];
    }

}