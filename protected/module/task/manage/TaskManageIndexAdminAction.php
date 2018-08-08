<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/2
 * Time: 14:55
 */

namespace module\task\manage;



use biz\Session;
use CC\action\ListAction;
use CC\action\listHandler\AdditionDataListBeforeHandler;
use CC\db\base\core\condition\EqualCondition;
use CC\db\base\core\condition\EqualInCondition;
use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CC\util\arr\ArrayUtil;
use CC\util\common\server\SessionAbs;
use CC\util\common\widget\filter\IFilter;
use CC\util\common\widget\filter\SelectFilter;
use CC\util\common\widget\listColumn\Column;
use CC\util\common\widget\listColumn\ITableViewCreator;
use CC\util\common\widget\listColumn\SimpleColumnValueSetterWrapper;
use CC\util\common\widget\listColumn\SplitColumnValueSetter;
use CC\util\common\widget\listColumn\title\SortColumnTitle;
use CC\util\common\widget\widget\ArrayDataWidget;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\buttons\EditAjaxButtonWidget;
use CC\util\common\widget\widget\buttons\SimpleParamsBuilder;
use CC\util\common\widget\widget\buttons\ViewButtonWidget;
use CC\util\date\DateUtil;
use CC\util\string\StringUtil;
use Closure;
use CRequest;
use module\basic\user\enum\UserTypeEnum;
use module\basic\user\server\UserServer;
use module\project\manage\server\ProjectServer;
use module\project\manage\server\ProjectUserServer;
use module\project\module\server\ProjectModuleServer;
use module\project\version\server\ProjectVersionServer;
use module\task\child\date\Date;
use module\task\manage\condition\TaskStatusCondition;
use module\task\manage\enum\QuickFilterEnum;
use module\task\manage\enum\TaskPriorityLevelEnum;
use module\task\manage\enum\TaskStatusEnum;
use module\task\status\server\TaskOpServer;
use module\task\status\server\TaskStatusServer;

class TaskManageIndexAdminAction extends ListAction implements ITableViewCreator
{
    public $project_id;
    protected function getTable()
    {
        return 'task';
    }

    protected function getSearchCondition()
    {
        if(StringUtil::isEmpty($_GET['quick'])){
            $_GET['quick'] = QuickFilterEnum::QUICK_NO_CLOSED;
        }

        $this->dbCondition->leftJoin('user', 'u1', 't.create_uid = u1.id')
            ->leftJoin('user', 'u2', 't.dev_uid = u2.id')
            ->select('t.*,u1.name create_uname,u2.name dev_uname
           ')->addConditions([
               new EqualCondition('project_version_id'),
            ])->order('t.id desc');


        $project_module_id = $this->request->getParams('project_module_id');
        if($project_module_id){
            $list = ListModel::make('project_module')->addColumnsCondition(['pid' => $project_module_id])->execute();
            $project_module_id_arr = array_merge([$project_module_id],ArrayUtil::arrayColumn($list,'id'));
            $this->dbCondition->addInCondition('project_module_id',$project_module_id_arr);
        }

        if($this->project_id){
            $this->dbCondition->addColumnsCondition(array(
                'project_id' => $this->project_id,
            ));
        }else{
            if(!UserTypeEnum::isLeader()){
                $this->dbCondition->addOrMultiColumnsCondtion(
                    [
                        'dev_uid' => Session::getUserID(),
                    ],
                    [
                        'create_uid' => Session::getUserID(),
                    ]
                );
            }
//            $this->dbCondition->addColumnsCondition(array(
//                ''
//            ));

        }

        $quick = $this->request->getParams('quick');
        if($quick == QuickFilterEnum::QUICK_TO_ME){
            $this->dbCondition->addColumnsCondition(['dev_uid' => Session::getUserID()]);
        }else if($quick == QuickFilterEnum::QUICK_ME_CREATED){
            $this->dbCondition->addColumnsCondition(['create_uid' => Session::getUserID()]);
        }else if($quick == QuickFilterEnum::QUICK_NO_CLOSED){
            $this->dbCondition->addConditions(array(
                new TaskStatusCondition(),
            ));
        }else if(!StringUtil::isEmpty($quick) && $quick != QuickFilterEnum::QUICK_ALL){
            $this->dbCondition->addColumnsCondition(['t.status' => $quick]);
        }


        $s_sort = $this->request->getParams('s_sort');
        if($s_sort){
            $sort_arr = explode('__',$s_sort);
            $this->dbCondition->order($sort_arr[0].' '.$sort_arr[1]);
        }
        $this->dbCondition->addColumnsCondition(array('pid'=> 0));
    }

    /**
     * @return array
     */
    protected function onExecute()
    {

        if(!$this->project_id){
            $notice_index_list = [];
            $notice_index_arr = [];
            $notice_user_arr = [];


            if (UserTypeEnum::isLeader()) {//领导视野
                $notice_index_list = ListModel::make('notice')->addColumnsCondition(array(
                    'project_id' => array('!=' => 0), 'aid' => 0, 'time' => ['>=', DateUtil::getDayBeginTime(time())],
                ))->leftjoin('user', 'u', 't.sid=u.id')->select('t.*,u.name uname')->execute();//查询出所有今日动态
                foreach ($notice_index_list as $item) {
                    $notice_index_arr[$item['sid']][] = $item;
                }


                $notice_user = ListModel::make('user')->addColumnsCondition(array(
                    'dept_id' => UserServer::YANFA_DEPT_ID,
                ))->addSelect('id,name')->execute();

                foreach ($notice_user as $item) {
                    $notice_user_arr[$item['id']] = $item;
                }
            } elseif (UserTypeEnum::isMnager()) {//经理视野
                $project = ItemModel::make('project')->addColumnsCondition(array(
                    'pm_uid' => SessionAbs::getUserID()
                ))->execute();
                $notice_index_list = ListModel::make('notice')->addColumnsCondition(array(
                    'project_id' => $project['id'], 'aid' => 0, 'time' => ['>=', DateUtil::getDayBeginTime(time())]
                ))->leftjoin('user', 'u', 't.sid=u.id')->select('t.*,u.name uname')->execute();//查询出所有今日动态
                foreach ($notice_index_list as $item) {
                    $notice_index_arr[$item['sid']][] = $item;
                }

                $notice_manage_list = ListModel::make('project')->addColumnsCondition(array(
                    'pm_uid' => SessionAbs::getUserID(), 'p.is_main' => 1
                ))->leftJoin('project_user', 'p', 'p.project_id=t.id')->addSelect('P.uid')->execute();


                foreach ($notice_manage_list as $key1 => $item) {
                    $notice_manage_arr[$item['uid']][] = $item;
                }
                $notice_manage_arr1 = [];
                foreach ($notice_manage_arr as $key1 => $item) {
                    foreach ($notice_index_arr as $key2 => $value) {
                        if ($key2 = $key1) {
                            $notice_manage_arr1[$key1] = $notice_index_arr[$key2];
                            continue;
                        }
                    }
                }
                $notice_index_arr = $notice_manage_arr1;


                $notice_user = ListModel::make('project_user')->addColumnsCondition(array(
                    'project_id' => $project['id'], 'is_main' => 1,
                    'u.dept_id' => UserServer::YANFA_DEPT_ID,
                ))->leftJoin('user', 'u', 'u.id=t.uid')->addSelect('u.id,u.name')->execute();

                foreach ($notice_user as $item) {
                    $notice_user_arr[$item['id']] = $item;
                }
            } elseif (UserTypeEnum::isDev()) {//员工视野
                $notice_myself_list = ListModel::make('notice')->addColumnsCondition(array(
                    'sid' => SessionAbs::getUserID(), 't.aid' => 0, 'time' => ['>=', DateUtil::getDayBeginTime(time())]
                ))->leftJoin('user', 'u', 'u.id=t.sid')->addSelect('t.*,u.name uname')->execute();

                foreach ($notice_myself_list as $item) {
                    $notice_index_arr[$item['sid']][] = $item;
                }
            }

        }
        return [
            'notice_index_arr' => $notice_index_arr,//有的相关数据数组
            'notice_user_arr' => $notice_user_arr //所有数据组员数组
        ];
    }

    /**
     * @return  Column[]
     */
    public function createListColumns(array $list)
    {

        $cloumns = [
            new Column(new SortColumnTitle('ID','id'),'id'),
            new Column('任务名称','name',function($data){
                return '<a class="view_link det_link" data-title="详情" data-href="'.$this->genurl('detail',['id'=>$data['id']]).'">'.$data['name'].'</a>';
            }),
            new Column(new SortColumnTitle('优先级','priority_level'),'priority_level',new SimpleColumnValueSetterWrapper('priority_level',TaskPriorityLevelEnum::getValuesColor())),
            new Column(new SortColumnTitle('创建人','create_uid'),'create_uname'),
            new Column(new SortColumnTitle('指派给','dev_uid'),'dev_uname',function($data){
                if (Session::getUserID() == $data['dev_uid']){
                    return  "<span style='color:red;'>{$data['dev_uname']}</span>";
                }
                return $data['dev_uname'];
            }),

            new Column(new SortColumnTitle('状态','status'),'status',
                function ($data) {
                    if ($data['status'] != TaskStatusEnum::STARTING){
                      return TaskStatusEnum::getValuesColor()[$data['status']];
                    }
                    return TaskStatusEnum::getValuesColor()[$data['status']] . "( {$data['cur_progress_percent']}% )";
                }
            ),
            new Column('最新进度','cur_progress',new SplitColumnValueSetter('cur_progress')),
            new Column('最近更新时间','cur_progress_time',function ($data) {
                return Date::relativeTime($data['cur_progress_time']);
            }),
            new Column('预计时间','estimate_time',function($data){
                return $data['estimate_time'].'天';
            }),
            new Column('实际时间','estimate_time',function($data){
                return TaskStatusServer::getRealDay($data);
            }),
        ];
        if(!$this->project_id){
            $cloumns[]  = new Column(new SortColumnTitle('项目名称','project_id'),'project_id',new SimpleColumnValueSetterWrapper('project_id',ProjectServer::getAllProject()));
        }
        return $cloumns;
    }


    /**
     * @return IFilter[]
     */
    public function createListFilters()
    {
        return [
            (new SelectFilter('quick','',QuickFilterEnum::getValues()))->setIsMultiple(false)->setAddDefault(false),
        ];
    }

    /**
     * @return  ButtonWidget[] | Closure[] | false
     */
    public function createOperateButtons(array $list)
    {

        return [
            function ($data) {
                $buttons = [];
                if($this->project_id && (ProjectUserServer::getIsPm($this->project_id) || $data['create_uid'] == Session::getUserID())){
                    $buttons[] = new EditAjaxButtonWidget('编辑', 'edit', ['project_id' => $this->project_id]);
                }
                $buttons = array_merge($buttons,TaskOpServer::getButtonForStatus($data));
                return new ArrayDataWidget($buttons);
            },
        ];
    }
}
