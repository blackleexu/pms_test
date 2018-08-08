<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 18:19
 */


?>
<div id="lm_content_cont">
 <?php if(empty($list)):?>

 <?php endif;?>
<?php foreach($list as $leave_msg_item):?>
    <div class="pc_item">
        <div class="pc_part_ift">
           <div class="t3"><?php echo date('Y-m-d H:i:s',$leave_msg_item['time']) ?></div>
        </div>
        <div class="pc_part_idesc">
            <?php echo $leave_msg_item['content'] ?>
        </div>
    </div>
    <?php endforeach?>
</div>
