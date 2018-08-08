<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:22
 */
?>

<?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->start() ?>

<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\ListTableWidget($this,$list),\CC\util\common\widget\panel\ListTablePanel::instance()) ?>
<?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->end() ?>

