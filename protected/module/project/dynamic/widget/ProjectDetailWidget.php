<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/29
 * Time: 10:33
 */

namespace module\project\dynamic\widget;


use CC\db\base\select\ItemModel;
use CC\util\common\widget\widget\Widget;
use module\project\manage\server\ProjectUserServer;

class ProjectDetailWidget extends Widget
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
        $project = ItemModel::make('project')->addId($this->project_id)->execute();
        return [
            'project' => $project,
            'project_users' => ProjectUserServer::getUserListByProjectid($this->project_id,false),
            'project_pm' => ItemModel::make('user')->addId($project['pm_uid'])->execute(),
        ];
    }
}