<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">

    <title>管理系统</title>
    <script type="text/javascript">
        var baseUrl = '<?php echo $baseUrl ?>';
    </script>
    <?php echo \CC\util\common\server\AssetManager::instance()->getBaseCssJs() ?>
       <?php echo \CC\util\common\server\AssetManager::instance()->getCssJs(array(
           '/public/common/widget/module/core/login/css/login.css',
           '/public/common/widget/module/core/login/js/login.js',
           '/public/biz/login/css/login.css',
       )) ?>
</head>

<body>

<div class="main-content">
    <div class="main_c">
        <div class="form_w clearfix">

            <form action="" class="form_act" method="post">
                <div class="login_tit">
                    后台管理系统
                </div>
                <fieldset>
                    <div class="block clearfix">
                        <span class="block input-icon  ">
                            <input class="form-control req the-padding-left" value="<?php echo \CC\util\common\server\Cookie::get('core_login_account') ?>" data-name="账号" placeholder="账号" type="text" name="account" id="account" />
                            <i class="the-icon icon-user"></i>
                        </span>
                    </div>
                    <label class="block clearfix">
                    <span class="block input-icon ">
                        <input class="form-control req the-padding-left" data-name="密码" placeholder="密码" type="password" value="" name="pass" id="pass" />
                        <i class="the-icon icon-lock"></i>
                    </span>
                    </label>

                    <div class="space"></div>
                    <div class="clearfix">
                        <button type="submit" class="login_btn btn-danger btn-block">登录</button>
                    </div>
                    <div class="space-4"></div>
                </fieldset>
            </form>
        </div>
        <div class="copyright">
            &copy; <?php echo date('Y') ?>
        </div>
    </div>
</div>
</body>
</html>