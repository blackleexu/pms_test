<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/29
 * Time: 10:29
 */

namespace module\project\dynamic\widget;


use CC\util\common\widget\widget\SubTabWidget;
use module\project\manage\server\ProjectUserServer;

class ProjectDynamicNavWidget extends SubTabWidget
{

    protected $project_id;

    /**
     * ProjectDetailWidget constructor.
     * @param $project_id
     */
    public function __construct($project_id)
    {
        parent::__construct('');
        $this->project_id = $project_id;
    }


    /**
     * @return array(
     *      array(
     *          'name' => 'title',
     *          'action_str' => 'user/index',
     *          'params' => array(),
     *          'actives' => array(
     *              array('action_str'=>'','params' => [])
     *          )
     *      )
     * )
     */
    protected function getActions()
    {
        $arr = [
            [
                'name' => '任务管理',
                'action_str' => '/task/manage/index',
                'params' => [
                    'project_id' => $this->project_id,
                ],
            ],
            [
                'name' => '项目动态',
                'action_str' => '/project/dynamic/index',
                'params' => [
                    'project_id' => $this->project_id,
                ],
            ],
            [
                'name' => '成员动态',
                'action_str' => '/project/dynamic/member',
                'params' => [
                    'project_id' => $this->project_id,
                ],
            ],

        ];
        if(ProjectUserServer::getIsPm($this->project_id)){
            $arr[] = [
                            'name' => '版本管理',
                            'action_str' => '/project/version/index',
                            'params' => [
                                'project_id' => $this->project_id,
                            ],
                        ];
        }
        return $arr;
    }
}