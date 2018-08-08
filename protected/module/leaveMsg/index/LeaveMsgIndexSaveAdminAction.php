<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/8
 * Time: 15:39
 */

namespace module\leaveMsg\index;


use CC\db\base\insert\InsertModel;
use CRequest;

class LeaveMsgIndexSaveAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        if($request->hasPost()){
            $content = $request->getParams('content');
            if(!$content){
                throw new \CErrorException('内容不能为空');
            }
            if(mb_strlen($content,'utf-8') > 200){
                throw new \CErrorException('内容最长200个');
            }
            InsertModel::make('leave_msg')->addData(array(
                'content' => $content,
                'time' => time(),
            ))->execute();
            return new \CJsonData();
        }

        return new \CRenderData([],'',false);
    }
}