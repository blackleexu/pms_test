<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 18:19
 */

use biz\Session;
use CC\util\common\widget\widget\WidgetBuilder;
use module\task\manage\enum\TaskStatusEnum;
use module\task\status\server\TaskOpServer;

?>
<div id="task_cont">
 <?php if(empty($list)):?>
 <div style="padding: 10px;">
     暂无待处理任务
 </div>
 <?php endif;?>
<?php foreach($list as $task_item):?>
    <div class="pc_item">
        <div class="pc_part_itit">
            <?php echo $task_item['name'] ?>
        </div>
        <div class="pc_part_ift clearfix">
            <span class="t1">
            状态：<?php echo TaskStatusEnum::getValueByIndex($task_item['status']) ?>
             <?php if($task_item['status'] == TaskStatusEnum::STARTING):?>
             &nbsp; &nbsp; 开始时间：<?php echo date('Y-m-d H:i',$task_item['start_time']) ?>
             <?php endif;?>
                <?php if($task_item['status'] == TaskStatusEnum::TESTING):?>
                &nbsp; &nbsp; 完成时间：<?php echo date('Y-m-d H:i',$task_item['start_time']) ?>
                <?php endif;?>
            </span>

            <span class="t2">

            <?php $buttons = TaskOpServer::getButtonForStatus($task_item); ?>
                <?php foreach($buttons as $button):?>

                <?php $button->setAttributes(array(
                        'data-reload_url' => $this->genurl('task/index/index'),
                        'data-option-list-tabel-id' => 'task_cont'
                    )) ?>
                <?php echo WidgetBuilder::build($button) ?>
                <?php endforeach?>

            </span>

        </div>
    </div>
<?php endforeach?>
</div>