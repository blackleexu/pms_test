<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/2
 * Time: 15:56
 */

namespace module\project\dynamic;


use CC\action\ListAction;
use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\filter\SelectFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use Closure;
use CRequest;
use module\project\dynamic\server\ProjectDynamicServer;
use module\project\manage\server\ProjectUserServer;
use module\project\version\server\ProjectVersionServer;
use module\task\manage\enum\TaskStatusEnum;

class ProjectDynamicIndexAdminAction extends \CAction
{
    public $project_id;

    public function execute(CRequest $request)
    {
        $dynamic_list_jindu = ListModel::make('dynamic')->addColumnsCondition([
            't.project_id' => $this->project_id,
            'dy_type' => ProjectDynamicServer::DY_TYPE_PROJECT_PROGRESS,
        ])->leftJoin('user', 'u', 't.uid = u.id')
            ->select('t.*,u.name uname')
            ->order('t.id desc')->execute();
        $dynamic_list_wenti = ListModel::make('dynamic')->addColumnsCondition([
            't.project_id' => $this->project_id,
            'dy_type' => ProjectDynamicServer::DY_TYPE_QUESTION,
        ])->leftJoin('user', 'u', 't.uid = u.id')
            ->select('t.*,u.name uname')
            ->order('t.id desc')->execute();
        $dynamic_list_chanpin = ListModel::make('dynamic')->addColumnsCondition([
            't.project_id' => $this->project_id,
            'dy_type' => ProjectDynamicServer::DY_TYPE_PRODUCT,
        ])->leftJoin('user', 'u', 't.uid = u.id')
            ->select('t.*,u.name uname')
            ->order('t.id desc')->execute();
        return new \CRenderData(
            [
                'dynamic_list_jindu' => $dynamic_list_jindu,
                'dynamic_list_wenti' => $dynamic_list_wenti,
                'dynamic_list_chanpin' => $dynamic_list_chanpin,
                'project_id' => $this->project_id,
            ]
        );
    }
}