<?php
use CC\util\common\widget\panel\FormPanel;
use CC\util\common\widget\widget\FormWidget;
use CC\util\common\widget\widget\WidgetBuilder;
?>

<?php echo WidgetBuilder::build(new FormWidget($this,$data), FormPanel::instance()) ?>
