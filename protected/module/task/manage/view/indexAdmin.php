<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:22
 */

use CC\util\date\DateUtil;
use module\task\manage\enum\TaskStatusEnum;
use module\task\status\server\TaskStatusServer;

?>
<style type="text/css">
    .cd-timeline-block {
        position: relative;
        left: 9px !important;
        width: 230px;
    }
    .project_detail_table {
        margin-left: 270px;
    }
    .page_tit{
        width: 220px !important;
    }
</style>
<div class="project_detail_block">
    <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\index\widget\ProjectNavWidget()) ?>
    <div class="project_detail_cont">
        <?php if($this->project_id):?>
        <div class="project_detail_head">
            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\dynamic\widget\ProjectDetailWidget($this->project_id)) ?>
            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\dynamic\widget\ProjectDynamicNavWidget($this->project_id)) ?>
        </div>
        <?php endif;?>
        <style type="text/css">
        </style>
        <div class="project_detail_body <?php echo $this->project_id?'':'project_detail_body_home' ?> clearfix">
            <div class="project_detail_body_filter">
                <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\FilterWidget($this), \CC\util\common\widget\panel\ListSearchPanel::instance()) ?>
                 <?php if($this->project_id):?>
                <div class="add_task_btn">
                    <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\buttons\EditAjaxButtonWidget('添加任务', 'edit', ['project_id' => $this->project_id]), \CC\util\common\widget\panel\ListBtnPanel::instance()) ?>
                </div>
                 <?php endif;?>
            </div>
            <?php if($this->project_id):?>
            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\module\widget\ProjectModuleTreeWidget($this->project_id)) ?>
            <?php endif;?>
            <?php if(!$this->project_id):?>
            <div class="dy_block_w" style="float:left;width: 260px;overflow:auto;">
                <div class="dy_block">
                    <div class="dy_block_tit page_tit">
                        成员今日动态
                      </div>
                    <section class="cd-timeline " id="dy_block_cont_xiangmujingdu" style="height: 488px;width: 250px">
                        <?php foreach ($notice_index_arr as $ke => $value): ?>
                            <div style="height: 30px;line-height: 30px;"><?php echo $value[0]['uname']; ?></div>
                            <?php if ($value) :?>
                            <?php foreach ($value as $item) :;?>
                                <?php if ($notice_user_arr[$ke]) { $notice_user_arr[$ke]['continue'] = 'today';}?>
                                <div class="cd-timeline-block">
                                    <div class="cd-timeline-img cd-picture ">
                                        <img src="img/cd-icon-picture.svg" alt="Picture">
                                    </div>
                                    <div class="cd-timeline-content">
                                        <div class="cd-date"> <?php echo date('Y-m-d H:i:s', $item['time']) ?></div>
                                        <div class="cd-cont">
                                            <?php echo $item['title']?><br>
                                            <?php echo $item['content'] ?>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach?>
                            <?php endif?>
                        <?php endforeach ?>

                        <?php foreach ($notice_user_arr as $item) :;?>
                            <?php if (!(isset($item['continue']) && $item['continue'] == 'today')) :?>
                                <div style="height: 30px;line-height: 30px;"><?php echo $item['name']?></div>
                                <div class="cd-timeline-block">
                                    <div class="cd-timeline-img cd-picture ">
                                        <img src="img/cd-icon-picture.svg" alt="Picture">
                                    </div>
                                    <div class="cd-timeline-content">
                                        <div class="cd-date"> 无 </div>
                                        <div class="cd-cont"></div>
                                    </div>
                                </div>
                            <?php endif?>
                        <?php endforeach?>
                    </section>
                </div>
            </div>
                
             <?php endif;?>
            <div class="project_detail_table">
                <?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->start() ?>

                <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\ListTableWidget($this, $list, $page,['is_show_page_num' => true]), \CC\util\common\widget\panel\ListTablePanel::instance()) ?>
                <?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->end() ?>

            </div>
        </div>


    </div>

</div>




<div class="task_process_list" style="float: left;width: 50%;display: none;">
    <div style="padding-left: 40px;font-size:28px; margin-bottom: 20px; ">任务进度</div>
    <?php foreach ($list as $task_item): ?>
        <div class="item" style="padding: 0 40px;">

            <h3 class="progress-title"><?php echo $task_item['name'] ?></h3>
            <div class="progress" style="display: none;">
                <!-- #ff1170,#ffa900,#294bdc-->
                <?php $process = TaskStatusServer::getProgress($task_item) ?>
                <div class="progress-bar"
                     style="width:<?php echo $process['progress'] ?>%; background:#97c513;">
                    <div class="progress-value"><?php echo $process['progress'] ?>%</div>
                </div>
            </div>

            <ul class="step_progressbar clearfix">
                <?php foreach (TaskStatusEnum::getValues() as $status => $value): ?>
                    <li class="<?php echo $status <= $task_item['status'] ? 'active' : '' ?>">
                        <span class="num"><?php echo $status ?></span>
                        <span class="txt"><?php echo $value ?></span>
                    </li>
                <?php endforeach ?>

            </ul>

        </div>
    <?php endforeach ?>


</div>
<script>
    function manage_index_refresh() {
        reload_element('.project_detail_table','',true);
    }
</script>