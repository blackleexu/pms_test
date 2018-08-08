<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/2
 * Time: 16:46
 */
?>
<div class="project_detail_module_tree">

    <ul class="project_module_tree_ul">
        <?php $get = $_GET;unset($get['project_module_id']); ?>
        <li class="pdmt_tit"><a href="<?php echo CC::app()->url->genurl('',$get) ?>">全部</a>
            <?php if(\module\project\manage\server\ProjectUserServer::getIsPm($this->project_id)):?>
                <a class="extr" href="<?php echo CC::app()->url->genurl('project/module/index',['project_id' => $project_id,]) ?>">模块管理</a>
            <?php endif; ?>
        </li>
        <?php foreach($project_module_list as $item):
            if ($item['pid'] != 0){
                continue;
            }
            $cur_project_module_id = $_GET['project_module_id'];
            ?>
        <li class="<?php echo $cur_project_module_id == $item['id']?'active':'' ?>">
            <?php
            $is_show = false;
            $cur_item = null;
            foreach($project_module_list as $items){
                if($cur_project_module_id == $items['id']){
                    $cur_item = $items;break;
                }
            }
            if( $cur_item['pid'] == $item['id']){
                $is_show = true;
            }
?>

            <div class="mt_tit">
                <span class="iconfont <?php echo $is_show?'icon-jian':'icon-jia' ?> mt_jia_jian"></span>
                <?php $params = $_GET; $params['project_module_id'] = $item['id'];?>
                <a href="<?php echo CC::app()->url->genurl('',$params) ?>"><?php echo $item['name'] ?></a>
            </div>
            <div class="mt_cont" style="<?php echo $is_show?'':'display: none;' ?>">
                <ul>
                    <?php foreach($project_module_list as $item1):
                        if ($item1['pid'] != $item['id']){
                            continue;
                        }
                        ?>

                    <li class="<?php echo $cur_project_module_id == $item1['id']?'active':'' ?>">
                        <div class="mt_tit">
                            <?php $params = $_GET; $params['project_module_id'] = $item1['id'];?>
                            <a href="<?php echo CC::app()->url->genurl('',$params) ?>"><?php echo $item1['name'] ?></a>
                        </div>

                    </li>
                    <?php endforeach?>

                </ul>
            </div>
        </li>
         <?php endforeach?>

    </ul>
</div>
<script type="text/javascript">
    $('.mt_jia_jian').click(function () {
        if($(this).hasClass('icon-jia')){
            $(this).removeClass('icon-jia').addClass('icon-jian');
            $(this).closest('.mt_tit').next().show();
        }else{
            $(this).removeClass('icon-jian').addClass('icon-jia');
            $(this).closest('.mt_tit').next().hide();
        }
        return false;
    });
</script>
