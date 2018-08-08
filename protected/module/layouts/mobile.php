<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/3/10
 * Time: 16:43
 */
?>

<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\LayoutsWidget(
        $this->getPageTitle(),
        $content,
        include "leftnav.php",
        'mobile',
        [
            'common_cssJs' => [
                '/public/biz/wx/common/css/wx.css',
                '/public/biz/wx/common/js/wx.js',
                '/public/biz/wx/common/css/style.css?5',

            ]
        ]
)) ?>
