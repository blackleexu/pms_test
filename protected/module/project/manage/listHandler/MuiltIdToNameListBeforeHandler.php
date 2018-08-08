<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/13
 * Time: 9:49
 */

namespace module\project\manage\listHandler;


use CC\action\listHandler\IListBeforeHandler;
use CC\db\base\select\ItemModel;
use CC\db\base\select\ListModel;
use CRequest;

class MuiltIdToNameListBeforeHandler implements IListBeforeHandler
{
    private $field;
    private $table;
    private $map = [];

    /**
     * MuiltIdToNameListBeforeHandler constructor.
     * @param $table
     * @param $field
     * @param array $arr key//新命名的字段 , value//关联字段
     */
    public function __construct($table, $field, array $map )
    {
        $this->table = $table;
        $this->field = $field;
        $this->map   = $map;
    }


    public function onListBefore(&$list, CRequest $request, $action)
    {

        foreach ($list as $key => $item) {
            $id_arr =[];
            if (!empty(trim($item[$this->field]))) {
                $id_arr = explode(',', $item[$this->field]);
                foreach ($id_arr as $value) {
                    $relt = ItemModel::make($this->table)->addColumnsCondition(['id' => $value])->addSelect(array_values($this->map)[0].',dept_id')->execute();
                    $list[$key][array_keys($this->map)[0]][$relt['dept_id']][] = $relt[array_values($this->map)[0]];
                }
            }
        }
    }
}