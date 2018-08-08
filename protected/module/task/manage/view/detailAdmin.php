<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/8
 * Time: 11:22
 */

use CC\util\common\widget\widget\WidgetBuilder;
use module\project\module\server\ProjectModuleServer;
use module\task\status\server\TaskOpServer;

?>
<style type="text/css">

}
</style>
<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>项目名称：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo $task['project_name'] ?>
    </div>
</div>
<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>版本：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo $task['project_version_name'] ?>
    </div>
</div>
<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>模块：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo ProjectModuleServer::getAllModule($task['project_id'])[$task['project_module_id']] ?>
    </div>
</div>
<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>任务名称：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo $task['name'] ?>
    </div>
</div>

<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>任务描述：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo $task['content'] ?>
    </div>
</div>

<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>创建人：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo $task['create_uname'] ?>
    </div>
</div>

<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>指派给：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo $task['dev_uname'] ?>
    </div>
</div>


<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>创建时间：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo date('Y-m-d H:i:s',$task['create_time']) ?>
    </div>
</div>
<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>预估时间：</span></label>
    <div class="data-group data-group-form_name">
        <?php echo date('Y-m-d H:i',$task['estimate_start_time']) ?> -
        <?php echo date('m-d H:i',$task['estimate_end_time']) ?>
        ( <?php echo $task['estimate_time'] ?> 天 )
    </div>
</div>
<div class="row-group   row-group-form_name  clearfix">
    <label class="data-label"><span>任务进度：</span></label>
    <div class="data-group data-group-form_name">
        <section  class="cd-timeline">
            <?php foreach($task_op_list as $task_op):?>
            <div class="cd-timeline-block">
                <span style="color:#000; position: absolute; left: -50px;"><?php echo $task_op['exp']; ?>%</span>
          		<div class="cd-timeline-img cd-picture ">
           		</div>
          		<div class="cd-timeline-content">
                    <div class="cd-date">
                        <?php echo date('Y-m-d H:i:s',$task_op['time']) ?>
                        
                    </div>
                    <pre><?php echo $task_op['content'];?></pre>
           		</div>
          	</div>

            <?php endforeach?>

        </section>
    </div>
</div>

