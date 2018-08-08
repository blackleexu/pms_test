<?php
use CC\util\common\server\AssetManager;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" >
        <meta name="renderer" content="webkit">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>小步创想项目管理系统</title>

        <script type="text/javascript">
            var baseUrl = '<?php echo $baseUrl ?>';
            var baseUrlGroup = '<?php echo $baseUrl.'/'.CC::app()->url->getGroup() ?>';
        </script>
        <?php echo AssetManager::instance()->getAdminCssJs();?>
        <?php echo AssetManager::instance()->getCssJs([
            '/public/biz/admin/common/css/admin.css',
            '/public/biz/admin/common/js/admin.js',
        ]);?>

    </head>

    <body class="<?php echo $_GET['hasretract'] ? 'body_hasretract' : '' ?> body_wq">

        <div class="main-container clearfix  " >
            <div class="header">
                <div class="header_left">
                    <a href="" class="header_logo"  >项目管理系统</a></div>
                <ul class="header_right">


                    <li class="header_user">
                        <span class="header_user_name">


                            <?php echo \CC\util\common\server\SessionAbs::getName() ?>
                        </span>
                        <div class="header_user_more">
                            <span class="header_user_up"></span>

                            <a href="<?php echo \CC::app()->url->genurl('basic/user/userinfo'); ?>" class="top_user_switch top_user_switch_user_info">个人资料</a>
                            <a href="<?php echo CC::app()->url->genurl('/core/login/logout') ?>" class="header_user_quit">退出</a>
                        </div>
                    </li>

                </ul>
            </div>
            <div class="sidebar">
                <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\LeftNavWidget(include 'leftnav.php',null,['has_home_nav' => false] )); ?>
            </div>
            <div class="main-content">
<!--                <div class="breadcrumbs" >-->
<!--                    <ul class="breadcrumb">-->
<!--                        <li>-->
<!--                            <a href="--><?php //echo CC::app()->url->genurl('/core/index/index'); ?><!--">首页</a>-->
<!--                        </li>-->
<!--                        --><?php //foreach ($options['breadcrumbs'] as $breadcrumb): ?>
<!--                            <li>-->
<!--                                <a href="--><?php //echo $breadcrumb['url'];?><!--">--><?php //echo $breadcrumb['name'];?><!--</a>-->
<!--                            </li>-->
<!--                        --><?php //endforeach;?>
<!--                    </ul>-->
<!--                </div>-->
                <div class="content">
                    <?php echo $content; ?>
                </div>

            </div>
        </div>

        <script type="text/javascript">
            $('.header_user_name').mousedown(function(){
                $('.header_user_more').toggle();
            });
            $('.header_user').mouseleave(function(){
                $('.header_user_more').hide();
            });
        </script>

    </body>


</html>