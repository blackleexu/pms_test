<?php
/**
 * Created by PhpStorm.
 * User: jesse
 * Date: 2018/4/16
 * Time: 10:37
 */

namespace module\task\child\status;


use biz\Session;
use CC\db\base\select\ItemModel;
use CC\db\base\update\UpdateModel;
use module\task\manage\enum\TaskStatusEnum;

class ChildStatus
{
    private $task_id = null;
    private $toStatus = null;
    private $exp = null;
    private $item = null;
    private $table = 'task';

    public function __construct( $task_id, $toStatus, $exp)
    {
        $this->task_id  = $task_id;
        $this->toStatus = $toStatus;
        $this->exp = $exp;
        $this->item     = ItemModel::make($this->table)->addColumnsCondition(array('id'=>$task_id))->execute();
    }

    public function check()
    {

        if (!$this->item || ($this->item['dev_uid'] != Session::getUserID())){
            return false;
        }
        return true;
    }

    public function updateStatus()
    {
        if ($this->check()){
            $data = array('status'=>$this->toStatus);
            if ($this->toStatus == TaskStatusEnum::TESTING) {
                $data['dev_finish_time'] = time();
                $data['cur_progress'] = '完成';
            }
            elseif ($this->toStatus == TaskStatusEnum::STARTING){
                $data['start_time'] = time();
                $data['cur_progress'] = '开始';
            }
            UpdateModel::make($this->table)->addData($data,$this->task_id)->execute();
            $this->updateParetenTask();
            return true;
        }
        return false;
    }

    public function updateParetenTask()
    {
        $pid = $this->item['pid'];
        $pItem = ItemModel::make($this->table)->addColumnsCondition(array('id'=>$pid))->execute();
        $data= array(
            'cur_progress_time' => time(),
        );
        if ($pItem['status'] == TaskStatusEnum::NO_START){
            $data['status'] = TaskStatusEnum::STARTING;
        }
        if ($this->toStatus == TaskStatusEnum::STARTING){
            $data['start_time'] = time();
            $str = Session::getName().' 开始子任务: <br>备注：'.$this->item['name'];
        }
        elseif ($this->toStatus == TaskStatusEnum::TESTING){
            $str = Session::getName().' 完成子任务: <br>备注：'.$this->item['name'];
            $data['cur_progress_percent'] = $this->exp;
        }

        $data['cur_progress'] = strip_tags($str);
        UpdateModel::make('task')->addData($data)->addId($pid)->execute();
    }
}