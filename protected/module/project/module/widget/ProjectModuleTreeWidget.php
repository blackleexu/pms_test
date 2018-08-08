<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/2
 * Time: 16:45
 */

namespace module\project\module\widget;


use CC\db\base\select\ListModel;
use CC\util\common\widget\widget\Widget;

class ProjectModuleTreeWidget extends Widget
{

    protected $project_id;

    /**
     * ProjectDetailWidget constructor.
     * @param $project_id
     */
    public function __construct($project_id)
    {
        $this->project_id = $project_id;
    }
    protected function onBuild()
    {
        $project_module_list = ListModel::make('project_module')->addColumnsCondition(array(
            'project_id' => $this->project_id,
        ))->execute();
        return [
            'project_module_list' => $project_module_list,
            'project_id' => $this->project_id,
        ];
    }
}