<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:22
 */

use module\project\dynamic\server\ProjectDynamicServer;
use module\project\version\server\ProjectVersionServer;
use module\task\manage\enum\TaskStatusEnum;
use module\task\status\server\TaskStatusServer;

?>

<div class="project_detail_block">

<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\index\widget\ProjectNavWidget()) ?>

<div class="page_module part_page_module page_project_module">
    <div class="page_tit">我的任务</div>
    <div class="project_item_w  clearfix">

    <?php foreach($list as $item):?>

    <div class="project_item">
        <?php $project_version = ProjectVersionServer::getNewestVersion($item['id']); ?>
        <a href="<?php echo $this->genurl('/task/manage/index',['project_id' => $item['id'],'project_version_id' => $project_version['id']]) ?>">
        <div class="project_item_in">

        <div class="tit">
            <img width="24" style="border-radius: 50%;margin-right: 10px;" src="<?php echo $item['icon'] ?>" alt="">
            <?php echo $item['name'] ?>
         </div>
        <div class="cont">

            <div class="item">
                <div class="term">最新版本：</div>
                <div class="det">
                    <?php echo $project_version['name'] ?>
                </div>
            </div>
            <div class="item">
                <div class="term">开发时间：</div>
                <div class="det">
                    <?php echo $project_version['dev_time'] ?>
                </div>
            </div>
            <div class="item">
                <div class="term">测试时间：</div>
                <div class="det">
                    <?php echo $project_version['test_time'] ?>
                </div>
            </div>
            <div class="item">
                <div class="term">发布时间：</div>
                <div class="det">
                    <?php echo $project_version['pub_time'] ?>
                </div>
            </div>
            <?php $progress = ProjectDynamicServer::getNewProgress($item['id']) ?>

            <div class="item">

                <div class="term">开发进度：</div>
                <div class="progress" style="width: 60%;display: inline-block;margin-bottom: 0;">
                    <!-- #ff1170,#ffa900,#294bdc-->
                    <?php $process = $progress['dev_progress'] ?>
                    <div class="progress-bar" style="width:<?php echo $process ?>%; ">
                    </div>
                    <div class="progress-value"><?php echo $process ?>%</div>
                </div>

            </div>
            <div class="item">

                <div class="term">测试进度：</div>
                <div class="progress" style="width: 60%;display: inline-block;margin-bottom: 0;">
                    <!-- #ff1170,#ffa900,#294bdc-->
                    <?php $process = $progress['test_progress'] ?>
                    <div class="progress-bar" style="width:<?php echo $process ?>%;  ">
                    </div>
                    <div class="progress-value"><?php echo $process ?>%</div>
                </div>
            </div>
         </div>
    </div>
        </a>
    </div>
     <?php endforeach?>

    </div>
</div>
<div class="page_module task_page_module part_page_module">
    <div class="page_tit">我的任务 <a class="exter_c" style="display: none;" href="<?php echo $this->genurl('task/manage/index',['for_user'=>'me']) ?>">全部任务</a></div>
    <div id="task_cont" class="page_cont task_cont clearfix" style="height: 250px;overflow:auto;" >

    </div>
</div>

<div class="page_module leave_msg_page_module part_page_module" style="display: none;">
    <div class="page_tit">意见箱
        <a class="exter_c edit_link" data-title="意见" data-reload_url="<?php echo $this->genurl('leaveMsg/index/index') ?>" data-option-list-tabel-id="lm_content_cont" data-href="<?php echo $this->genurl('leaveMsg/index/save') ?>" >我有意见</a>
    </div>
    <div class="page_cont task_cont clearfix">
        <div class="lm_content" style="height: 180px;overflow:auto;" >

            <div id="lm_content_cont">

            </div>
            <div class="lm_content_more">
                <a href="#" class="lm_content_more_btn">查看更多</a>
            </div>
        </div>


    </div>
</div>
</div>
<script type="text/javascript">
    (function () {
        var $body = $('body');
        $body.on('click','.task_op_btn',function () {
            var $this = $(this);
            pop.confirm('确认'+$this.text()+'？',function () {
                ajax_request($this.attr('href'),{},function () {
                    load_task_list();
                });
            });
            return false;
        });
        function load_task_list() {
            var task_list_url = '<?php echo $this->genurl('task/index/index') ?>';
            ajax_request(task_list_url,{},function (data) {
                $('.task_page_module .task_cont').html($(data).filter('#task_cont').html());
            },'html');
        }

        load_task_list();


        $body.on('click','.leave_msg_op_btn',function () {
            ajax_request('<?php echo $this->genurl('leaveMsg/index/save') ?>',{content:$('#lm_textarea').val()},function () {
                load_leave_msg_list();
                $('#lm_textarea').val('');
            });
            return false;
        });

        var leave_msg_list_url = '<?php echo $this->genurl('leaveMsg/index/index') ?>';
        var leave_msg_offset = 0;
        function load_leave_msg_list() {
            ajax_request(leave_msg_list_url,{__page:leave_msg_offset},function (data) {
                $('#lm_content_cont').append($(data).filter('#lm_content_cont').html());
            },'html');
        }
        $('.lm_content_more_btn').click(function () {
            leave_msg_offset ++;
            load_leave_msg_list();
        });

        $('.leave_msg_all_link').click(function () {
            pop.view({
                title:'匿名留言板',
                content:'<iframe style="height: 600px;width: 100%;" src="'+$(this).attr('href')+'"></iframe>'
            });
            return false;
        });
        load_leave_msg_list();
        $('.project_item_w').height($(window).height() - 150);
        $('.lm_content').height($(window).height() - 482);
    })();
</script>