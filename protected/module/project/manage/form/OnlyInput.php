<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/13
 * Time: 15:45
 */

namespace module\project\manage\form;


use CC\util\common\widget\form\BaseInput;

class OnlyInput extends BaseInput
{
    private $classNames = array();

    protected function onCreateInputInternal()
    {
        if($this->getEditIsRead()){
            if(!$this->getIsAdd()){
                return $this->getValue().$this->getHiddenInput();
            }
        }
        return sprintf('<input type="%s" name="%s" id="%s" value="%s" class="%s" %s  readonly/>',
            $this->getType(),
            $this->getName(),
            $this->getId(),
            $this->getValue(),
            implode(' ',$this->getClassNames()),
            $this->buildAttributes()
        );// TODO: Implement onCreateInputInternal() method.
    }

    public function addClassnames($classnames)
    {
        $this->classNames = array_merge($this->classNames,explode(' ',$classnames));
        return $this;
    }


    private function getType()
    {
        return 'text';
    }

    private function getClassNames()
    {
        return $this->classNames;
    }


}