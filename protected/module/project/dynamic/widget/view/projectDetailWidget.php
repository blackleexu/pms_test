<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/29
 * Time: 10:33
 */

use module\basic\user\server\UserServer;
use module\project\version\server\ProjectVersionServer;

?>
<div class="project_detail_intro">


<div class="pdi_cont">
    <?php $project_version = ProjectVersionServer::getNewestVersion($project['id']); ?>
    <div class="pdi_item" style="width: 100%;">
        <div class="pdi_term">
            项目经理：
        </div>
        <div class="pdi_detail">
            <?php echo $project_pm['name'] ?>
            <span class="dpi_d_t1">
                <a href="#" data-href="<?php echo CC::app()->url->genurl('/task/manage/dutys') ?>" class="view_link" style="color: #0E8BFD" data-title="成员详情"><span class="btn_text">成员详情</span></a>
                <a  style="margin-left: 50px;" href="<?php echo CC::app()->url->genurl('project/user/sort',['project_id' => $project['id']]) ?>">设为默认</a>
                <?php //echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\buttons\ViewButtonWidget('成员详情', 'dutys')) ?>
            </span>
        </div>

    </div>
    <div></div>
    <div class="pdi_item">
        <div class="pdi_term">最新版本：</div>
        <div class="pdi_detail"><?php echo $project_version['name'] ?></div>
    </div>
    <div class="pdi_item">
        <div class="pdi_term">开发时间：</div>
        <div class="pdi_detail"><?php echo $project_version['dev_time'] ?></div>
    </div>
    <div class="pdi_item">
        <div class="pdi_term">测试时间：</div>
        <div class="pdi_detail"><?php echo $project_version['test_time'] ?></div>
    </div>
    <div class="pdi_item">
        <div class="pdi_term">发布时间：</div>
        <div class="pdi_detail"><?php echo $project_version['pub_time'] ?></div>
    </div>


</div>
</div>
