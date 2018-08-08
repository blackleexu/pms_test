<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/3/2
 * Time: 16:09
 */

namespace module\project\manage\saveAfterHandler;


use CC\action\saveHandler\ISaveAfterHandler;
use CC\db\base\delete\DeleteModel;
use CC\db\base\insert\InsertModel;
use CC\db\base\select\ListModel;
use CC\db\base\update\UpdateModel;
use CC\util\arr\ArrayUtil;
use CRequest;

class ProjectUserSaveAfterHandler implements ISaveAfterHandler
{

    /**
     * @param array $data post数据和before处理过的数据
     * @param CRequest $request
     * @param bool $is_add
     * @param $action
     */
    public function onSaveAfter(&$data, CRequest $request, $is_add, $old_data, $action)
    {

        $uids = $request->getParams('uids');
        $uid_arr = ArrayUtil::explodeStr($uids);

        $origin = ListModel::make('project_user')->addColumnsCondition(array(
            'project_id' => $data['id']
        ))->addSelect('uid')->execute();

        foreach($origin as $ke => &$va) {
            $va = $va['uid'];
        }
        $action = count($origin) - count($uid_arr);

        $relt = [];
        if ($origin) {
            foreach ($origin as $k1 => $item) {
                if (!in_array($item, $uid_arr)) {
                    $relt['remove'][] = $item;
                }
            }
        }

        if ($uid_arr) {
            foreach ($uid_arr as $k2 => $value) {
                if (!in_array($value, $origin)) {
                    $relt['insert'][] = $value;
                }
            }
        }

        if ($relt['remove']) {
            foreach ($relt['remove'] as $items) {
                DeleteModel::make('project_user')->addColumnsCondition(array(
                    'project_id' => $data['id'], 'uid' => $items
                ))->execute();
            }
        }
        if ($relt['insert']) {
            foreach ($relt['insert'] as $values) {
                InsertModel::make('project_user')->addData(array(
                    'uid' => $values,
                    'project_id' => $data['id'],
                ))->execute();
            }
        }




        /*DeleteModel::make('project_user')->addColumnsCondition(array(
            'project_id' => $data['id'],
        ))->execute();*/
        /*foreach ($uid_arr as $uid) {
            InsertModel::make('project_user')->addData(array(
                'uid' => $uid,
                'project_id' => $data['id'],
            ))->execute();
        }*/


    }
}