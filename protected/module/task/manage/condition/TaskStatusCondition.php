<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/4/8
 * Time: 14:26
 */

namespace module\task\manage\condition;


use CC\db\base\core\CDbConditionTrait;
use CC\db\base\core\condition\ICondition;
use CC\util\string\StringUtil;
use module\task\manage\enum\QuickFilterEnum;
use module\task\manage\enum\TaskStatusEnum;

class TaskStatusCondition implements ICondition
{

    /**
     * @param CDbConditionTrait $dbCondition
     * @param \CRequest $request
     */
    public function onBuild($dbCondition, \CRequest $request)
    {
        $quick = $request->getParams('quick');
        if(!StringUtil::isEmpty($quick)){
            if($quick == QuickFilterEnum::QUICK_NO_CLOSED){
                $values = array_keys(TaskStatusEnum::getValues());
                foreach ($values as $i => $value) {
                    if($value == TaskStatusEnum::CLOSED){
                        unset($values[$i]);
                    }
                }

                $dbCondition->addInCondition('t.status', $values);
            }
        }
    }
}