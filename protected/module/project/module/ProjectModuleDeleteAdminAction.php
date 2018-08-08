<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/12
 * Time: 17:54
 */

namespace module\project\module;


use CC\action\checker\IParamsChecker;
use CC\action\DeleteAction;
use CC\db\base\select\ListModel;
use Exception;

class ProjectModuleDeleteAdminAction extends DeleteAction implements IParamsChecker
{
    protected function getCheckers()
    {
        return [$this];
    }

    protected function getTable()
    {
        return 'project_module';
    }

    /**
     * @param array $data
     * @param string $msg
     * @return bool
     * @throws Exception
     */
    public function onCheck($data, &$msg)
    {
        if($data){
            $re = ListModel::make('project_module')->addColumnsCondition(array('pid'=>$data['id']))->execute();
            if ($re){
                $msg = '删除失败';
                return false ;
            }
            else {
                $msg = '操作成功';
                return true;
            }
        }
        else{
            return false;
        }
    }
}