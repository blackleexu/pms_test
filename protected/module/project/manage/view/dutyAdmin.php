<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/13
 * Time: 12:09
 */

use module\project\manage\enum\DutyTypeEnum;

?>
<style type="text/css">
    .col-div{
        padding: 20px 30px;
        position: relative;
    }
    .col-span1{
        position: absolute;
        left: 35%;
    }
    .col-span2{
        position: absolute;
        left: 70%;
    }
    .col-span1 .tree_input{
        width: 105px;
    }
    .col-span2 .tree_input{
        width: 38px;
    }

</style>
<?php //pr($data)?>
<?php // pr(\CC\action\module\basic\dept\enum\DeptEnum::getValues())?>
<?php //echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\FormWidget($this, $data))?>

<?php //echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\RetrunBackWidget('index', ['完成']))?>


<?php foreach ($data['uids'] as $key => $item) :;?>
    <div class="col-div">
        <!--php,an,ios,ceshi,yanfafuz,ceshifuze,qianduan -->
        <span><?php echo  $item['uname']?></span>
        <span class="col-span1" >
             <select class="col-select" name="pro_func" data_uid="<?php echo $item['uid']?>">
                 <option value="0" <?php if ($item['is_main'] == 0) :?> selected <?php endif?> disabled>请选择职能</option>
                 <?php foreach (DutyTypeEnum::getValues() as $key => $value) :?>
                     <option value="<?php echo $key?>" <?php if ($key == $item['pro_func']) :?> selected <?php endif?>>
                         <?php echo $value;?>
                     </option>
                 <?php endforeach?>
            </select>
        </span>
        <span class="col-span2" >
             <select class="col-select" name="is_main" data_uid="<?php echo $item['uid']?>">
                 <?php foreach (\module\project\manage\enum\IsmainTypeEnum::getValues() as $key => $value) :?>
                     <option value="<?php echo $key?>" <?php if ($key == $item['is_main']) :?> selected <?php endif?>>
                         <?php echo $value;?>
                     </option>
                 <?php endforeach?>
            </select>
        </span>
    </div>
<?php endforeach?>

<script>
    function duty_closefn() {
        reload_element('.list-table-panel','',true);
    }
    $('select.col-select').change(function () {
        var that = $(this);
        var uid = that.attr('data_uid');
        var val = that.val();
        var key = that.attr('name');
        var pro_id = <?php echo $data['id']?>;
        $.ajax({
            url : '<?php echo \CC::app()->url->genurl('project/manage/dataupdate') ?>',
            data: {
                uid : uid,
                val : val,
                key : key,
                pro_id : pro_id
            },
            type: 'post',
            success: function (msg) {
                if (msg.ok) {
                    if (key = 'pro_func') {
                        that.parent('span').find('span').html(that.find('option:selected').html());
                    } else if (key = 'is_main') {
                        that.parent('span').find('span').html(that.find('option:selected').html());
                    }

                }
            }
        })
    })

</script>

