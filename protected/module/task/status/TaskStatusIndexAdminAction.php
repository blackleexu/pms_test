<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/7
 * Time: 12:13
 */

namespace module\task\status;


use CC\db\base\update\UpdateModel;
use CRequest;
use module\task\manage\enum\TaskStatusEnum;
use module\task\status\server\TaskStatusServer;

class TaskStatusIndexAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        $to_status = $request->getParams('to_status');
        $content = $request->getParams('content');
        $id = $request->getParams('id');
        if($request->hasPost()){
            TaskStatusServer::instance($id,$to_status,$content)->toStatus();
            return new \CJsonData();
        }
        return new \CRenderData([
            'id' => $id,
        ],'',false);
    }
}