<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:22
 */
?>

<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\FilterWidget($this), \CC\util\common\widget\panel\ListSearchPanel::instance()) ?>
<?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->start() ?>
<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\buttons\ButtonWidget('新建','edit'),\CC\util\common\widget\panel\ListBtnPanel::instance()) ?>

<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\ListTableWidget($this,$list,$page),\CC\util\common\widget\panel\ListTablePanel::instance()) ?>
<?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->end() ?>

