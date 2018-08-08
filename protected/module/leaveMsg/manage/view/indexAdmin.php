<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 18:19
 */


?>
<style type="text/css">
    body.body_wq,body.body_wq .content{background: #fff;}
    .header{display: none;}
</style>
 <?php if(empty($list)):?>
 <div style="padding-bottom: 10px;">
     暂无留言
 </div>
 <?php endif;?>
<div style="padding: 20px;">

<?php foreach($list as $leave_msg_item):?>
    <div class="pc_item">
        <div class="pc_part_idesc">
            <?php echo $leave_msg_item['content'] ?>
        </div>
        <div class="pc_part_ift">
           <div class="t3"><?php echo date('Y-m-d H:i:s',$leave_msg_item['time']) ?></div>
        </div>
    </div>
    <?php endforeach?>
</div>

