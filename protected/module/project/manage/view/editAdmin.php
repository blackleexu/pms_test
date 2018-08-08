<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:25
 */
?>
<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\RetrunBackWidget('index')) ?>
<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\FormWidget($this,$data), \CC\util\common\widget\panel\FormPanel::instance()) ?>

