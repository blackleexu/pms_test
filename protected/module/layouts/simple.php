<?php

use biz\Session;
use CC\util\common\server\AssetManager;
use CC\util\common\server\SessionAbs;
use module\basic\user\enum\UserTypeEnum;

?>
<!doctype html>
</html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>小步创想项目管理系统</title>

    <script type="text/javascript">
        var baseUrl = '<?php echo $baseUrl ?>';
        var baseUrlGroup = '<?php echo $baseUrl . '/' . CC::app()->url->getGroup() ?>';
    </script>
    <?php echo AssetManager::instance()->getAdminCssJs(); ?>
    <?php echo AssetManager::instance()->getCssJs([
        '/public/biz/admin/common/css/admin.css',
        '/public/biz/admin/common/js/admin.js',
        '/public/biz/admin/common/css/notice.css'
    ]); ?>


</head>
<body class="<?php echo $_GET['hasretract'] ? 'body_hasretract' : '' ?> body_wq">

<div class="main-container clearfix  ">
    <ul class="header_right">
        <li class="header_notice">
            <span class="header_notice_name">
                <span class="action___3Dj5c noticeButton___2ssrz ">
                    <span class="ant-badge">
                        <i class="iconfont icon-2-notice"></i>
                        <?php if (Session::getNoticeCount()) :?>
                        <sup data-show="true" class="ant-scroll-number notice_title ant-badge-count ant-badge-multiple-words">
                            <span class="ant-scroll-number-only">
                                <?php echo Session::getNoticeCount()?>
                            </span>
                        </sup>
                        <?php endif;?>
                    </span>
                </span>
                <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\notice\index\widget\NoticeViewWidget(SessionAbs::getUserID()))?>
            </span>


        </li>

        <li class="header_user">
            <span class="header_user_name">

                <?php echo SessionAbs::getName() ?>
                <?php //echo \CC\util\common\server\SessionAbs::getUserID() ?>
            </span>
            <div class="header_user_more">
                <span class="header_user_up"></span>


                <a href="<?php echo \CC::app()->url->genurl('basic/user/userinfo'); ?>"
                   class="top_user_switch top_user_switch_user_info">个人资料</a>
                <a href="<?php echo CC::app()->url->genurl('/core/login/logout') ?>" class="header_user_quit">退出</a>
            </div>
        </li>

    </ul>
    <div class="content">
        <?php echo $content; ?>
    </div>
</div>

<script type="text/javascript">
    $('.header_user_name').mousedown(function () {
        $('.header_user_more').toggle();
    });
    $('.header_user').mouseleave(function () {
        $('.header_user_more').hide();
    });

    $('body').click(function () {
        if (!$('.header_notice_up').hasClass('hid')) {
            $('.header_notice_up').addClass('hid')
        }
    })

</script>

</body>


</html>