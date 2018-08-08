<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 16:34
 */

use CC\util\date\DateUtil;
use module\project\dynamic\server\ProjectDynamicServer;
use module\task\manage\enum\TaskStatusEnum;
use module\task\status\server\TaskStatusServer;

?>
<div class="project_detail_block">
    <style type="text/css">
        .spinner {
            font-size: 20px;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            box-shadow: inset 0 0 0 .1em rgba(58, 168, 237, .2);
        }
        .spinner i {
            position: absolute;
            clip: rect(0, 1em, 1em, .5em);
            width: 1em;
            height: 1em;
            transform: rotate(180deg);
        }

        .spinner i:after {
            position: absolute;
            clip: rect(0, 1em, 1em, .5em);
            width: 1em;
            height: 1em;
            content: '';
            border-radius: 50%;
            box-shadow: inset 0 0 0 .1em #3aa8ed;
        }

    </style>
    <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\index\widget\ProjectNavWidget()) ?>
    <div class="project_detail_cont">
        <div class="project_detail_head">
            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\dynamic\widget\ProjectDetailWidget($this->project_id)) ?>

            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\dynamic\widget\ProjectDynamicNavWidget($this->project_id)) ?>
        </div>

        <div class="project_detail_body clearfix">

            <div class="dy_block_w">

                <div class="dy_block">
                    <div class="dy_block_tit page_tit">
                        今日动态
                    </div>
                    <section class="cd-timeline " id="dy_block_cont_xiangmujingdu">
                            <?php foreach ($notice_arr as $ke => $value): ?>
                                <?php echo $value['today'][0]['uname']; ?>
                                <?php if ($value['today']) :?>
                                    <?php foreach ($value['today'] as $item) :;?>
                                        <?php if ($project_user_s[$ke]) { $project_user_s[$ke]['continue'] = 'today';}?>
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
                            <?php if ($project_user_s) :?>
                                <?php foreach ($project_user_s as $item) :?>
                                    <?php if (!(isset($item['continue']) && $item['continue'] == 'today')) :?>
                                        <?php echo $item['uname']?>
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
                            <?php endif?>
                    </section>
                </div>
                <div class="dy_block">
                    <div class="dy_block_tit page_tit">
                        昨日动态
                    </div>
                    <section class="cd-timeline " id="dy_block_cont_xiangmujingdu">
                            <?php foreach ($notice_arr as $ke => $value): ?>
                                <?php echo $value['yesterday'][0]['uname'];?>
                                <?php if ($value['yesterday']) :?>
                                    <?php foreach ($value['yesterday'] as $item) :;?>
                                        <?php if ($project_user_s[$ke]) {$project_user_s[$ke]['continue'] = 'yesterday';}?>
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
                            <?php if ($project_user_s) :?>
                                <?php foreach ($project_user_s as $item) :;?>
                                    <?php if (!(isset($item['continue']) && $item['continue'] == 'yesterday')) :?>
                                        <?php echo $item['uname']?>
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
                            <?php endif?>
                    </section>
                </div>

                <div class="dy_block">
                    <div class="dy_block_tit page_tit">
                        历史动态
                    </div>
                    <section class="cd-timeline  " id="dy_block_cont_yinanwenti">
                        <?php if ($notice_history) :?>
                            <?php foreach ($notice_history as $ke => $item): ?>
                                    <?php if ($item['time'] < DateUtil::getDayBeginTime(time())) :?>
                                        <div class="cd-timeline-block">
                                            <div class="cd-timeline-img cd-picture ">
                                                <img src="img/cd-icon-picture.svg" alt="Picture">
                                            </div>
                                            <div class="cd-timeline-content">
                                                <div class="cd-date"><?php echo $item['uname']?> <?php echo date('Y-m-d H:i:s', $item['time']) ?></div>
                                                <div class="cd-cont">
                                                    <?php echo $item['title']?><br>
                                                    <?php echo $item['content'] ?>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endif?>
                            <?php endforeach ?>
                        <?php endif?>
                    </section>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $('.dy_block .cd-timeline').height($(window).height() - 280)
</script>