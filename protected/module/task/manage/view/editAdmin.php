<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:25
 */
?>
<style type="text/css">
    #form_name{width: 400px;}
</style>

<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\FormWidget($this,$data), \CC\util\common\widget\panel\FormPanel::instance()) ?>

<script type="text/javascript">
    (function () {
        if($('#form_project_id').length){
            var options = [];
            $('#form_project_version_id option').each(function () {
                var $this = $(this);
                options.push({
                    id: $this.attr('value'),
                    project_id:$this.data('project_id'),
                    name:$this.text()
                });
            });
            $('#form_project_id').change(function () {
                var optionstr = '';
                for(var i in options){
                    if(options[i].project_id == $(this).val()){
                        optionstr += '<option data-project_id="'+options[i].project_id+'" value="'+options[i].id+'">'+options[i].name+'</option>'
                    }
                }
                $('#form_project_version_id').html(optionstr);
            }).change();
        }

    })();
</script>