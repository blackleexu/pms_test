<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/3
 * Time: 18:29
 */

namespace module\project\module\server;


use CC\util\db\tree\TreeJsData;

class ProjectModuleTreeJsData extends TreeJsData
{

    protected function getTable()
    {
        return 'project_module';
    }

}