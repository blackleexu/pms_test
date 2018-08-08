<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 16:34
 */

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
                        项目进度
                         <?php if(\module\project\manage\server\ProjectUserServer::getIsPm($this->project_id)):?>
                        <a data-href="<?php echo $this->genurl('project/dynamic/edit', ['project_id' => $project_id,'dy_type' => ProjectDynamicServer::DY_TYPE_PROJECT_PROGRESS]) ?>"
                             data-option-list-tabel-id="dy_block_cont_xiangmujingdu"
                           data-title="发布项目进度"
                           class="exter_c edit_link">发布</a>
                         <?php endif;?>
                    </div>
                    <section class="cd-timeline " id="dy_block_cont_xiangmujingdu">
                        <?php foreach ($dynamic_list_jindu as $item): ?>
                            <div class="cd-timeline-block">
                                <div class="cd-timeline-img cd-picture ">
                                    <img src="img/cd-icon-picture.svg" alt="Picture">
                                </div>

                                <div class="cd-timeline-content">
                                    <div class="cd-date"><?php echo $item['uid'] ? $item['uname'] : '系统' ?> <?php echo date('Y-m-d H:i:s', $item['time']) ?></div>
                                    <div class="cd-cont">
<pre>
<?php echo $item['content'] ?>
</pre>
                                        <?php if ($item['dy_type'] == ProjectDynamicServer::DY_TYPE_PROJECT_PROGRESS): ?>
                                            <?php $data = json_decode($item['data'], true); ?>
                                            <br>
                                             开发进度：<?php echo $data['dev_progress'] ?> %， 测试进度：<?php echo $data['test_progress'] ?> %
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach ?>

                    </section>

                </div>
                <div class="dy_block">
                    <div class="dy_block_tit page_tit">
                        疑难问题
                        <a data-href="<?php echo $this->genurl('project/dynamic/edit', ['project_id' => $project_id,'dy_type' => ProjectDynamicServer::DY_TYPE_QUESTION]) ?>"
                             data-option-list-tabel-id="dy_block_cont_yinanwenti"
                           data-title="发布疑难问题"
                           class="exter_c edit_link">发布</a>
                    </div>
                    <section class="cd-timeline  " id="dy_block_cont_yinanwenti">
                        <?php foreach ($dynamic_list_wenti as $item): ?>
                            <div class="cd-timeline-block">
                                <div class="cd-timeline-img cd-picture  ">
                                    <img src="img/cd-icon-picture.svg" alt="Picture">
                                </div>

                                <div class="cd-timeline-content">
                                    <div class="cd-date"><?php echo $item['uid'] ? $item['uname'] : '系统' ?> <?php echo date('Y-m-d H:i:s', $item['time']) ?></div>
                                    <div class="cd-cont">
<pre>
<?php echo $item['content'] ?>
</pre>

                                    </div>
                                </div>
                            </div>
                        <?php endforeach ?>

                    </section>

                </div>
                <div class="dy_block">
                    <div class="dy_block_tit page_tit">
                        产品规划
                        <?php if(\module\project\manage\server\ProjectUserServer::getIsPm($this->project_id)):?>
                        <a data-href="<?php echo $this->genurl('project/dynamic/edit', ['project_id' => $project_id,'dy_type' => ProjectDynamicServer::DY_TYPE_PRODUCT]) ?>"
                             data-option-list-tabel-id="dy_block_cont_chanpin"
                           data-title="发布产品规划"
                           class="exter_c edit_link">发布</a>
                        <?php endif; ?>
                    </div>
                    <section class="cd-timeline  " id="dy_block_cont_chanpin">
                        <?php foreach ($dynamic_list_chanpin as $item): ?>
                            <div class="cd-timeline-block">
                                <div class="cd-timeline-img cd-picture ">
                                    <img src="img/cd-icon-picture.svg" alt="Picture">
                                </div>

                                <div class="cd-timeline-content">
                                    <div class="cd-date"><?php echo $item['uid'] ? $item['uname'] : '系统' ?> <?php echo date('Y-m-d H:i:s', $item['time']) ?></div>
                                    <div class="cd-cont">
<pre>
<?php echo $item['content'] ?>
</pre>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach ?>

                    </section>

                </div>


            </div>

        </div>
    </div>
</div>
<script type="text/javascript">
    $('.dy_block .cd-timeline').height($(window).height() - 280)
</script>