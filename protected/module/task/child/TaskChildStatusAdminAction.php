<?php
/**
 * Created by PhpStorm.
 * User: jesse
 * Date: 2018/4/16
 * Time: 10:27
 */

namespace module\task\child;

use CC\db\base\update\UpdateModel;
use module\task\child\status\ChildStatus;

class TaskChildStatusAdminAction extends \CAction
{
    public function execute(\CRequest $request)
    {
        $id       = $request->getParams('id');
        $toStatus = $request->getParams('toStatus');
        $exp      = $request->getParams('exp');
        $childModel = new ChildStatus($id,$toStatus,$exp);
        if ($childModel->updateStatus()){
            return new \CJsonData(['ok' => true]);
        }
        return new \CJsonData(['ok' => false]);
    }
}